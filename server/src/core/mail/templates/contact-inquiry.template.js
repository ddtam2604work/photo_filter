/**
 * server/src/core/mail/templates/contact-inquiry.template.js
 * Template email phản hồi khách hàng gửi liên hệ mang thương hiệu PhotoFlow
 */

export const getContactInquiryEmailTemplate = (data) => {
  const {
    fullName = "Quý khách",
    phone = "",
    email = "",
    studioName = "",
    content = "",
    ticketId = "",
    createdAt = new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" }),
  } = data;

  const currentYear = new Date().getFullYear();

  return `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>[PHOTOFLOW] Xác nhận tiếp nhận thông tin liên hệ</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; color: #1e293b;">
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8fafc; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); border: 1px solid #e2e8f0;">
          
          <!-- Header Banner với tông màu vàng đồng sang trọng của PhotoFlow -->
          <tr>
            <td style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); padding: 32px 28px; text-align: center; border-bottom: 3px solid #a67c37;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center">
                    <div style="display: inline-block; padding: 6px 14px; background: rgba(166, 124, 55, 0.15); border: 1px solid #a67c37; border-radius: 9999px; margin-bottom: 12px;">
                      <span style="color: #fde68a; font-size: 11px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase;">PHOTOFLOW PLATFORM</span>
                    </div>
                    <h1 style="color: #ffffff; font-size: 24px; font-weight: 800; margin: 0 0 6px 0; letter-spacing: -0.5px;">PhotoFlow</h1>
                    <p style="color: #cbd5e1; font-size: 13px; margin: 0; font-weight: 400;">Nền tảng giao ảnh trực tuyến dành cho Photographer &amp; Studio</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Nội dung chính -->
          <tr>
            <td style="padding: 32px 28px;">
              <h2 style="font-size: 18px; font-weight: 700; color: #0f172a; margin: 0 0 16px 0;">
                Kính gửi ${fullName},
              </h2>

              <p style="font-size: 14px; line-height: 1.65; color: #475569; margin: 0 0 20px 0;">
                Cảm ơn bạn đã quan tâm và để lại thông tin liên hệ tại hệ thống <strong>PhotoFlow</strong>. Yêu cầu tư vấn của bạn đã được ghi nhận thành công và chuyển đến chuyên viên hỗ trợ.
              </p>

              ${
                ticketId
                  ? `<div style="background-color: #fefce8; border: 1px solid #fef08a; border-radius: 10px; padding: 12px 16px; margin-bottom: 20px;">
                      <span style="font-size: 12px; color: #854d0e; font-weight: 600;">Mã yêu cầu (Ticket ID):</span>
                      <span style="font-family: monospace; font-size: 14px; font-weight: 700; color: #a16207; margin-left: 6px;">${ticketId}</span>
                    </div>`
                  : ""
              }

              <!-- Khung tóm tắt thông tin đã gửi -->
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 16px 20px;">
                    <div style="font-size: 13px; font-weight: 700; text-transform: uppercase; color: #0f172a; margin-bottom: 12px; letter-spacing: 0.5px;">
                      Thông tin yêu cầu đã gửi:
                    </div>
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="font-size: 13px; line-height: 1.7; color: #334155;">
                      <tr>
                        <td style="padding: 4px 0; width: 130px; font-weight: 600; color: #64748b;">Họ và tên:</td>
                        <td style="padding: 4px 0; font-weight: 600; color: #0f172a;">${fullName}</td>
                      </tr>
                      ${
                        phone
                          ? `<tr>
                        <td style="padding: 4px 0; font-weight: 600; color: #64748b;">Số điện thoại:</td>
                        <td style="padding: 4px 0; color: #0f172a; font-weight: 600;">${phone}</td>
                      </tr>`
                          : ""
                      }
                      ${
                        email
                          ? `<tr>
                        <td style="padding: 4px 0; font-weight: 600; color: #64748b;">Email liên hệ:</td>
                        <td style="padding: 4px 0; color: #2563eb;">${email}</td>
                      </tr>`
                          : ""
                      }
                      ${
                        studioName
                          ? `<tr>
                        <td style="padding: 4px 0; font-weight: 600; color: #64748b;">Tên Studio:</td>
                        <td style="padding: 4px 0; color: #0f172a; font-weight: 600;">${studioName}</td>
                      </tr>`
                          : ""
                      }
                      ${
                        content
                          ? `<tr>
                        <td style="padding: 4px 0; font-weight: 600; color: #64748b; vertical-align: top;">Nội dung tư vấn:</td>
                        <td style="padding: 4px 0; color: #0f172a; line-height: 1.5;">${content}</td>
                      </tr>`
                          : ""
                      }
                      <tr>
                        <td style="padding: 4px 0; font-weight: 600; color: #64748b;">Thời gian gửi:</td>
                        <td style="padding: 4px 0; color: #64748b;">${createdAt}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <p style="font-size: 14px; line-height: 1.65; color: #475569; margin: 0 0 24px 0;">
                Đội ngũ <strong>PhotoFlow</strong> sẽ chủ động liên hệ lại với bạn qua số điện thoại hoặc email trong vòng 24 giờ làm việc để giải đáp bài toán vận hành và demo trực tiếp các tính năng.
              </p>

              <!-- Chữ ký -->
              <div style="border-top: 1px solid #e2e8f0; padding-top: 20px;">
                <p style="font-size: 13px; color: #64748b; margin: 0 0 4px 0;">Trân trọng,</p>
                <p style="font-size: 14px; font-weight: 800; color: #0f172a; margin: 0; letter-spacing: 0.5px;">
                  ĐỘI NGŨ PHOTOFLOW
                </p>
                <p style="font-size: 12px; color: #94a3b8; margin: 2px 0 0 0;">
                  Hotline: 0901 666 360 | Email: Giaiphapvanhanh.VOS360@gmail.com
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #0f172a; padding: 20px 28px; text-align: center;">
              <p style="color: #94a3b8; font-size: 12px; margin: 0 0 4px 0;">
                &copy; ${currentYear} PhotoFlow. All rights reserved.
              </p>
              <p style="color: #64748b; font-size: 11px; margin: 0;">
                1 Đ.số 1, Khu Tây Sông Hậu, Long Xuyên, An Giang, Việt Nam
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
};
