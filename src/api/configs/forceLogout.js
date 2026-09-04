/**
 * Xử lý 401 khi refreshToken hết hạn hoặc phiên đăng nhập không hợp lệ
 */
const forceLogout = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    // Chuyển hướng hoặc reset session nếu cần
  }
};

export default forceLogout;
