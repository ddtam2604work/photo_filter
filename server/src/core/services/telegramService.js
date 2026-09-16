/**
 * server/src/core/services/telegramService.js
 * Dịch vụ gửi thông báo tức thì lên nhóm Telegram nội bộ qua Telegram Bot API
 */

const getBotToken = () =>
  process.env.TELEGRAM_BOT_TOKEN || "8432463277:AAH--3xKCShzjPM9NGyVH5Gt6_Q7PMJtriI";
const getChatId = () =>
  process.env.TELEGRAM_CHAT_ID || "8535452278";

/**
 * Escape các ký tự HTML đặc biệt để chống lỗi cú pháp Telegram Bot
 */
const escapeHtml = (text) => {
  if (!text) return "";
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
};

/**
 * Chuẩn hóa số điện thoại dạng xxxx xxx xxx
 */
const formatPhoneTelegram = (rawPhone) => {
  if (!rawPhone) return "Chưa cung cấp";
  const str = String(rawPhone).trim();
  const normalized = str.startsWith("+84") ? "0" + str.slice(3).trim() : str;
  const digits = normalized.replace(/\D/g, "").slice(0, 10);
  if (digits.length === 10) {
    return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`;
  }
  if (digits.length > 4) {
    if (digits.length <= 7) return `${digits.slice(0, 4)} ${digits.slice(4)}`;
    return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`;
  }
  return normalized || "Chưa cung cấp";
};

/**
 * Gửi tin nhắn thô lên Telegram Bot API
 */
export const sendTelegramRaw = async (messageText) => {
  try {
    const botToken = getBotToken();
    const chatId = getChatId();

    if (!botToken || !chatId) {
      console.warn("[Telegram] ⚠️ Chưa cấu hình TELEGRAM_BOT_TOKEN hoặc TELEGRAM_CHAT_ID");
      return { ok: false, error: "Telegram chưa được cấu hình" };
    }

    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: messageText,
        parse_mode: "HTML",
      }),
    });

    const result = await response.json();
    if (!result.ok) {
      console.error("[Telegram] ❌ Telegram API từ chối gửi:", result.description);
    } else {
      console.log("[Telegram] ✅ Gửi thông báo Telegram thành công!");
    }
    return result;
  } catch (error) {
    console.error("[Telegram] ❌ Lỗi mạng hoặc lỗi kết nối Telegram:", error.message);
    return { ok: false, error: error.message };
  }
};

/**
 * Tự động gửi thông báo khi có khách gửi Form Liên hệ với tiêu đề PhotoFlow
 */
export const notifyContactSubmitted = async (data) => {
  const timeStr = new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" });
  const fullName = escapeHtml(data.fullName || "Chưa rõ");
  const phone = escapeHtml(formatPhoneTelegram(data.phoneNumber || data.phone));
  const email = escapeHtml(data.email || "Chưa cung cấp");
  const studio = escapeHtml(data.studioName || data.studio || "Chưa cung cấp");
  const content = escapeHtml(data.consultationContent || data.message || "Không có");
  const ticketId = escapeHtml(data.ticketId || "");

  const message =
    `📩 <b>[PHOTOFLOW] CÓ LIÊN HỆ MỚI TỪ WEBSITE</b>\n` +
    `━━━━━━━━━━━━━━━━━━━━\n` +
    (ticketId ? `• <b>Mã yêu cầu:</b> <code>${ticketId}</code>\n` : "") +
    `• <b>Họ và tên:</b> ${fullName}\n` +
    `• <b>Số điện thoại:</b> <code>${phone}</code>\n` +
    `• <b>Email:</b> ${email}\n` +
    `• <b>Studio:</b> ${studio}\n` +
    `• <b>Nội dung tư vấn:</b> ${content}\n` +
    `━━━━━━━━━━━━━━━━━━━━\n` +
    `⏰ <i>Thời gian: ${timeStr}</i>`;

  return await sendTelegramRaw(message);
};
