---
name: project-memory
description: Ghi nhớ cấu trúc dự án vĩnh viễn, ngăn ngừa agent quên codebase giữa các phiên làm việc.
---

# Project Memory Skill

## Khi nào sử dụng:

- Khi người dùng yêu cầu "quét dự án", "nhớ cấu trúc", hoặc bắt đầu phiên làm việc mới.

## Quy trình hoạt động bắt buộc:

1. **Khởi tạo (Nếu chưa có bộ nhớ):**
   - Đọc toàn bộ cây thư mục và các file cấu hình chính (package.json, tsconfig, v.v.).
   - Tạo thư mục `.agents/memory/` và ghi lại:
     - `architecture.md`: Cấu trúc thư mục chuẩn và trách nhiệm của từng folder.
     - `tech-stack.md`: Thư viện, framework, quy chuẩn code.
     - `current-state.md`: Trạng thái các tính năng đã hoàn thành.

2. **Trước khi thực hiện bất kỳ tác vụ nào (Pre-task):**
   - BẮT BUỘC đọc file `.agents/memory/architecture.md` để đảm bảo đặt file đúng chỗ.
   - Không được tự ý quét lại toàn bộ mã nguồn nếu file bộ nhớ đã tồn tại.

3. **Sau khi hoàn thành tác vụ (Post-task):**
   - Cập nhật các thay đổi mới (file vừa thêm/sửa, logic mới) vào `.agents/memory/current-state.md`.
