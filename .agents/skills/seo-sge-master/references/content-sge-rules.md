# Bộ quy tắc viết nội dung chuẩn SGE (AI Overview) & E-E-A-T

Khi tạo nội dung trang, agent phải áp dụng bộ tiêu chí này để kích hoạt khả năng trích dẫn của Google AI:

### 1. Cấu trúc Atomic Answer (Trọng tâm trích dẫn)

- Đặt ngay dưới thẻ `<h1>`.
- Độ dài: Đúng 40–60 từ.
- Ngữ pháp: Câu khẳng định dứt khoát, định nghĩa trực diện vấn đề, không vòng vo để AI bắt trọn đoạn trích (featured snippet).

### 2. Định dạng tiêu đề theo hành vi tìm kiếm bằng giọng nói

- **H2:** Bắt buộc mô phỏng dạng câu hỏi tự nhiên của người dùng (Ví dụ: `## Làm thế nào để...`, `## Tại sao nên...`, `## Quy trình chuẩn gồm những bước nào?`).
- **H3, H4:** Đóng vai trò giải quyết các luận điểm con trực thuộc H2.

### 3. Mật độ sự thật (Fact-Density) & Trực quan hóa

- **Chu kỳ 150 từ:** Cứ mỗi 150 chữ cần có ít nhất một số liệu cụ thể, mốc thời gian, nghiên cứu hoặc bằng chứng thực tế.
- **Cấu trúc bảng & danh sách:** Mọi trang bài viết/tính năng phải có tối thiểu:
  - 1 bảng so sánh (Markdown table) đa tiêu chí.
  - 2 danh sách dạng bullet points để thuật toán quét dữ liệu nhanh.

### 4. Thể hiện yếu tố trải nghiệm (E trong E-E-A-T)

Sử dụng văn phong người thật có trải nghiệm thực chiến:

- _"Theo quan sát thực tế trong quá trình triển khai..."_
- _"Chúng tôi đã kiểm thử và nhận thấy rằng..."_

### 5. Khối FAQ Schema ở cuối bài

Kết thúc trang với 3–5 câu hỏi thường gặp nhất (FAQ). Bổ sung đoạn JSON-LD tương ứng:

```json
{
  "@context": "[https://schema.org](https://schema.org)",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Câu hỏi thường gặp 1?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Câu trả lời ngắn gọn, trực diện..."
      }
    }
  ]
}
```
