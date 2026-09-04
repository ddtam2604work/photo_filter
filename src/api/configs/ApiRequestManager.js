import forceLogout from "./forceLogout";

/**
 * Native HTTP client tương thích với axios API contract
 */
const createHttpClient = ({ baseURL = "", defaultHeaders = {} }) => {
  return async ({ url, method = "GET", params, data, signal }) => {
    let fullUrl = url.startsWith("http") ? url : `${baseURL || ""}${url}`;
    if (params) {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([k, v]) => {
        if (v !== undefined && v !== null) searchParams.append(k, String(v));
      });
      const qs = searchParams.toString();
      if (qs) {
        fullUrl += (fullUrl.includes("?") ? "&" : "?") + qs;
      }
    }

    const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
    const headers = {
      ...defaultHeaders,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    const fetchOptions = {
      method,
      headers,
      signal,
    };

    if (data && method !== "GET") {
      fetchOptions.body = JSON.stringify(data);
    }

    const response = await fetch(fullUrl, fetchOptions);
    let responseData = null;
    try {
      responseData = await response.json();
    } catch {
      responseData = null;
    }

    if (!response.ok) {
      const err = new Error(responseData?.message || response.statusText || "Request failed");
      err.response = { status: response.status, data: responseData };
      err.statusCode = response.status;
      throw err;
    }

    return {
      status: response.status,
      data: responseData,
    };
  };
};

/**
 * ApiRequestManager — Quản lý tập trung Request Queue, Scheduler và Loading Overlay
 */
class ApiRequestManager {
  static baseURL = "";
  static defaultHeaders = {
    "Content-Type": "application/json",
  };
  static activeRequestCount = 0;
  static overlayListeners = new Set();

  static configure({ baseURL = "", defaultHeaders = {} } = {}) {
    this.baseURL = baseURL;
    this.defaultHeaders = { ...this.defaultHeaders, ...defaultHeaders };
  }

  static subscribeOverlay(callback) {
    this.overlayListeners.add(callback);
    return () => this.overlayListeners.delete(callback);
  }

  static notifyOverlay() {
    const isLoading = this.activeRequestCount > 0;
    this.overlayListeners.forEach((listener) => listener(isLoading));
  }

  /**
   * Thực thi danh sách API
   */
  static async sendRequests({
    apiList = [],
    parallel = true,
    showOverlay = false,
    stopOnError = true,
  } = {}) {
    if (showOverlay) {
      this.activeRequestCount++;
      this.notifyOverlay();
    }

    const results = [];
    const httpClient = createHttpClient({
      baseURL: this.baseURL,
      defaultHeaders: this.defaultHeaders,
    });

    try {
      if (parallel) {
        const promises = apiList.map(async (item) => {
          try {
            const dataPayload = item.dataFactory ? item.dataFactory() : item.data;
            const res = await httpClient({
              url: item.apiUrl,
              method: item.method || "GET",
              params: item.method === "GET" ? dataPayload : undefined,
              data: item.method !== "GET" ? dataPayload : undefined,
              signal: item.signal,
            });

            if (item.successCallBack) item.successCallBack(res.data);
            return { key: item.key, data: res.data, status: "success" };
          } catch (error) {
            if (error.response?.status === 401) {
              forceLogout();
            }
            if (item.errorCallBack) item.errorCallBack(error);
            if (stopOnError) throw error;
            return { key: item.key, error, status: "error" };
          }
        });

        const batchResults = await Promise.all(promises);
        results.push(...batchResults);
      } else {
        // Tuần tự
        for (const item of apiList) {
          try {
            const dataPayload = item.dataFactory ? item.dataFactory() : item.data;
            const res = await httpClient({
              url: item.apiUrl,
              method: item.method || "GET",
              params: item.method === "GET" ? dataPayload : undefined,
              data: item.method !== "GET" ? dataPayload : undefined,
              signal: item.signal,
            });

            if (item.successCallBack) item.successCallBack(res.data);
            results.push({ key: item.key, data: res.data, status: "success" });
          } catch (error) {
            if (error.response?.status === 401) {
              forceLogout();
            }
            if (item.errorCallBack) item.errorCallBack(error);
            results.push({ key: item.key, error, status: "error" });
            if (stopOnError) throw error;
          }
        }
      }

      return { results };
    } finally {
      if (showOverlay) {
        this.activeRequestCount = Math.max(0, this.activeRequestCount - 1);
        this.notifyOverlay();
      }
    }
  }
}

export default ApiRequestManager;
