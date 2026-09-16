/**
 * server/src/app.module.js
 * Root module quản lý các services và controllers của hệ thống PhotoFlow Backend / BFF
 */
import { AlbumService } from "./modules/album/album.service.js";
import { AlbumController } from "./modules/album/album.controller.js";
import { MailService } from "./core/mail/mail.service.js";
import { notifyContactSubmitted } from "./core/services/telegramService.js";

export class AppModule {
  constructor() {
    this.albumService = new AlbumService();
    this.albumController = new AlbumController(this.albumService);
  }

  registerRoutes(app) {
    // Health check endpoint
    app.get("/api/health", (req, res) => {
      res.json({
        status: "ok",
        framework: "NestJS / Express BFF",
        service: "PhotoFlow Backend Server",
        timestamp: new Date().toISOString(),
      });
    });

    // Album endpoints (tương thích 100% với src/api/core/albumApi.js của request-manager)
    app.get("/api/v1/albums/featured", (req, res) => this.albumController.getFeatured(req, res));
    app.get("/api/v1/albums/danh-sach", (req, res) => this.albumController.getList(req, res));
    app.post("/api/v1/albums/tao-moi", (req, res) => this.albumController.create(req, res));

    // Contact endpoint với luồng gửi Email & Thông báo Telegram thương hiệu PhotoFlow
    app.post("/api/v1/contact/submit", async (req, res) => {
      const {
        fullName = "Quý khách",
        phoneNumber = "",
        phoneCountryCode = "+84",
        email = "",
        consultationContent = "",
        studioName = "",
      } = req.body || {};

      const ticketId = `PTF-${Math.floor(100000 + Math.random() * 900000)}`;
      const phoneFull = `${phoneCountryCode} ${phoneNumber}`.trim();

      const normalizedData = {
        fullName: fullName.trim() || "Quý khách",
        phone: phoneFull,
        phoneNumber: phoneNumber.trim(),
        phoneCountryCode,
        email: email.trim(),
        studioName: studioName.trim(),
        consultationContent: consultationContent.trim(),
        content: consultationContent.trim(),
        ticketId,
        createdAt: new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" }),
      };

      console.log(`[Contact Submission] 📩 Nhận form từ ${normalizedData.fullName} (${normalizedData.phone}) - ${normalizedData.email}`);

      // 1. Gửi Webhook Google Sheet (nếu có cấu hình)
      const googleSheetUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;
      if (googleSheetUrl) {
        fetch(googleSheetUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "CONTACT_INQUIRY",
            ticketId,
            fullName: normalizedData.fullName,
            phone: normalizedData.phone,
            email: normalizedData.email,
            studio: normalizedData.studioName,
            consultingContent: normalizedData.consultationContent,
            brand: "PhotoFlow",
            createdAt: new Date().toISOString(),
          }),
        }).catch((err) => console.warn(`[GoogleSheet] ⚠️ Lỗi Webhook: ${err.message}`));
      }

      // 2. Gửi Email thông báo & Bắn Telegram song song
      Promise.allSettled([
        MailService.sendContactConfirmation(normalizedData),
        notifyContactSubmitted(normalizedData),
      ]).then((results) => {
        console.log(`[Contact Notification] ✅ Hoàn tất gửi Email & Telegram cho ticket ${ticketId}`);
      }).catch((err) => {
        console.error(`[Contact Notification] ⚠️ Có lỗi khi gửi thông báo: ${err.message}`);
      });

      // 3. Phản hồi cho Frontend tức thì
      res.json({
        statusCode: 200,
        errorCode: 1,
        message: `Cảm ơn ${normalizedData.fullName}! Yêu cầu tư vấn của bạn đã được tiếp nhận thành công. PhotoFlow sẽ liên hệ lại với bạn sớm nhất.`,
        data: {
          success: true,
          ticketId,
          submittedAt: new Date().toISOString(),
        },
      });
    });
  }
}
