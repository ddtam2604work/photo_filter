/**
 * server/src/core/mail/mail.service.js
 * Dịch vụ gửi email thông báo và xác nhận mang thương hiệu PhotoFlow qua Nodemailer SMTP
 */
import nodemailer from "nodemailer";
import { getContactInquiryEmailTemplate } from "./templates/contact-inquiry.template.js";

export class MailService {
  static transporter = null;

  static getTransporter() {
    if (!this.transporter) {
      const host = process.env.SMTP_HOST || "smtp.gmail.com";
      const port = parseInt(process.env.SMTP_PORT || "465", 10);
      const isSecure = port === 465 || process.env.SMTP_SECURE === "true";
      const user = process.env.SMTP_USER || "cskh.spintx@gmail.com";
      const pass = (process.env.SMTP_PASS || "wckv eqqi yaln salt").replace(/\s+/g, "");

      this.transporter = nodemailer.createTransport({
        host,
        port,
        secure: isSecure,
        auth: {
          user,
          pass,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });
    }
    return this.transporter;
  }

  static async sendMail(options) {
    try {
      const transporter = this.getTransporter();
      const fromName = process.env.MAIL_FROM_NAME || "PhotoFlow - Nền tảng giao ảnh trực tuyến";
      const fromAddress = process.env.MAIL_FROM_ADDRESS || process.env.SMTP_USER || "cskh.spintx@gmail.com";

      const mailOptions = {
        from: `"${fromName}" <${fromAddress}>`,
        to: options.to,
        subject: options.subject,
        html: options.html,
      };

      const info = await transporter.sendMail(mailOptions);
      console.log(`[MailService] ✅ Email đã gửi thành công tới ${options.to}. MessageId: ${info.messageId}`);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error(`[MailService] ❌ Lỗi khi gửi email đến ${options.to}:`, error.message);
      return { success: false, error: error.message };
    }
  }

  /**
   * Tự động gửi email xác nhận tới khách hàng và thông báo tới Admin
   */
  static async sendContactConfirmation(data) {
    const html = getContactInquiryEmailTemplate(data);
    const results = [];

    // 1. Gửi email xác nhận tiếp nhận cho khách hàng
    if (data.email) {
      const clientMail = await this.sendMail({
        to: data.email,
        subject: `[PHOTOFLOW] Cảm ơn bạn đã liên hệ - ${data.fullName || "Quý khách"}`,
        html,
      });
      results.push(clientMail);
    }

    // 2. Gửi email thông báo cho Admin PhotoFlow
    const adminEmail = process.env.MAIL_RECEIVER_ADMIN || "cskh.spintx@gmail.com";
    if (adminEmail && adminEmail !== data.email) {
      const adminMail = await this.sendMail({
        to: adminEmail,
        subject: `[PHOTOFLOW ADMIN] Có yêu cầu tư vấn mới từ ${data.fullName || "Khách hàng"}`,
        html,
      });
      results.push(adminMail);
    }

    return results;
  }
}
