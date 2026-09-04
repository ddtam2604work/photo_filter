import ApiRequestManager from "./ApiRequestManager";

// Khởi tạo cấu hình mặc định một lần cho toàn bộ ứng dụng
ApiRequestManager.configure({
  baseURL: import.meta.env.VITE_API_URL || "",
  defaultHeaders: {
    "Accept": "application/json",
  },
});

export default ApiRequestManager;
