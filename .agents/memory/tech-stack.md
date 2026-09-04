# Công Nghệ & Quy Chuẩn Kỹ Thuật (Tech Stack)

## 1. Công nghệ chính

- **Core Framework Frontend:** React 18 (JSX, ES Modules)
- **Server Framework:** NestJS / Express BFF (theo kiến trúc chuẩn của `E:\SpintX\Source`) phục vụ API endpoints & static assets
- **Build Tool:** Vite 3.x
- **Styling:** Tailwind CSS v3 (JIT mode, `darkMode: "class"`) + SCSS (`src/assets/scss/app.scss`)
- **State Management:** Redux Toolkit (`@reduxjs/toolkit`, `react-redux`)
- **Routing:** `react-router-dom` v6 (Lazy Loading + Suspense)
- **UI Components:** 28 Atomic Components tại `src/components/ui/` (Tuân thủ nguyên tắc không sửa code bên trong, chỉ truyền props)
- **Notifications:** `react-toastify`
- **Tầng API:** `ApiRequestManager` singleton client, `callApi` adapter kết nối tới NestJS API Server (`http://localhost:6531/api`) theo chuẩn `/request-manager` skill
- **Tối ưu tìm kiếm:** Chuẩn On-Page Technical SEO và SGE Hook theo `/seo-sge-master` skill

## 2. Quy ước bắt buộc (Strict Rules)

1. **Path Alias:** Luôn dùng `@/` thay cho relative path dài.
2. **Bảo tồn mã nguồn UI:** Tuyệt đối không thay đổi mã nguồn trong `src/components/ui/`.
3. **Dark Mode:** Mọi thành phần hiển thị đều hỗ trợ class `dark:`.
4. **Chuẩn SGE:** Thẻ `<h1>` đi kèm đoạn Atomic Answer trực diện 40–60 từ.
5. **API Layer:** Không gọi axios trực tiếp trong component; luôn thông qua `callApi` trong `src/api/core/*.js`.
