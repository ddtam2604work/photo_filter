import ApiRequestManager from "./apiRequestManagerClient";
import forceLogout from "./forceLogout";

/**
 * Adapter gọi API đơn lẻ, tương thích chuẩn của dự án LabsFlow
 * @param {Object} requestOptions { apiUrl, method, data, signal }
 * @param {Object} configOptions { showOverlay }
 */
const callApi = async (requestOptions, configOptions = { showOverlay: false }) => {
  const { apiUrl, method = "GET", data, signal } = requestOptions;
  const { showOverlay = false } = configOptions;

  const res = await ApiRequestManager.sendRequests({
    apiList: [
      {
        key: "single_request",
        apiUrl,
        method,
        data,
        signal,
      },
    ],
    parallel: false,
    showOverlay,
    stopOnError: true,
  });

  const singleResult = res.results?.[0];
  if (singleResult?.status === "error") {
    if (singleResult.error?.response?.status === 401) {
      forceLogout();
    }
    throw singleResult.error;
  }

  return singleResult?.data;
};

// Helper methods tiện lợi
callApi.get = (url, params = {}, options = { showOverlay: false }) =>
  callApi({ apiUrl: url, method: "GET", data: params, signal: options.signal }, options);

callApi.post = (url, data = {}, options = { showOverlay: true }) =>
  callApi({ apiUrl: url, method: "POST", data, signal: options.signal }, options);

callApi.put = (url, data = {}, options = { showOverlay: true }) =>
  callApi({ apiUrl: url, method: "PUT", data, signal: options.signal }, options);

callApi.delete = (url, data = {}, options = { showOverlay: true }) =>
  callApi({ apiUrl: url, method: "DELETE", data, signal: options.signal }, options);

export default callApi;
