// src/api/core/contactApi.js
import callApi from "../configs/callApi";

/**
 * Gửi thông tin biểu mẫu liên hệ và yêu cầu tư vấn giải pháp từ khách hàng
 * @param {{
 *   fullName: string,
 *   phoneCountryCode: string,
 *   phoneNumber: string,
 *   email: string,
 *   studioName?: string,
 *   consultationContent: string
 * }} data - Dữ liệu biểu mẫu liên hệ
 */
export const submitContactInquiryApi = (data) =>
  callApi.post("/api/v1/contact/submit", data, { showOverlay: true });
