# Quy trình khởi tạo bộ nhớ dự án (Init Scan)

Tài liệu này hướng dẫn Agent các bước quét mã nguồn lần đầu tiên để tạo bộ nhớ vĩnh viễn trong thư mục `.agents/memory/`.

## Các bước thực hiện bắt buộc:

### Bước 1: Quét cấu hình và cây thư mục

1. Kiểm tra các file khai báo cấu hình cốt lõi ở thư mục gốc:
   - Quản lý gói/ngôn ngữ: `package.json`, `tsconfig.json`, `pyproject.toml`, `Cargo.toml`, v.v.
   - Quản lý môi trường/công cụ: `.env.example`, `vite.config.*`, `webpack.config.*`, `Makefile`.
2. Duyệt qua cây thư mục cấp 1 và cấp 2 để nhận diện vai trò của từng folder (bỏ qua `node_modules`, `.git`, `dist`, `build`).

### Bước 2: Tạo thư mục lưu trữ

Tạo thư mục `.agents/memory/` nếu chưa tồn tại.

### Bước 3: Sinh 3 file bộ nhớ chuẩn

#### 1. `.agents/memory/architecture.md`

Ghi lại sơ đồ thư mục và nguyên tắc vị trí file:

```markdown
# Kiến trúc thư mục dự án

## Sơ đồ cấu trúc:

[Liệt kê cây thư mục cấp 1 & 2 kèm mô tả ngắn]

## Trách nhiệm các thư mục:

- `src/...`: Trách nhiệm cụ thể.
- `...`: Trách nhiệm cụ thể.

## Quy ước bắt buộc khi tạo code mới:

- File mới phải được đặt đúng thư mục tương ứng.
- Không tạo file rải rác ngoài thư mục root.
```
