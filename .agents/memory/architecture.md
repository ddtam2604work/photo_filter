# Kiến Trúc Dự Án PhotoFlow (LabsFlowWebCMS)

Tài liệu quy chuẩn cấu trúc thư mục vĩnh viễn cho dự án PhotoFlow, tuân thủ nguyên tắc `LabsFlowWebCMS-base`.

```
e:/photo_filter/
├── .agents/
│   ├── memory/                     # Bộ nhớ dự án vĩnh viễn
│   │   ├── architecture.md         # Tài liệu cấu trúc thư mục (file này)
│   │   ├── tech-stack.md           # Công nghệ, thư viện, quy chuẩn code
│   │   └── current-state.md        # Trạng thái các tính năng hiện tại
│   └── skills/                     # Các custom skills (labsflow-cms, request-manager, seo-sge, ...)
├── public/                         # Tài nguyên tĩnh công khai (favicon, banner.jpg, ảnh tư liệu)
│   ├── banner.jpg                  # Nền lá gân xuyên sáng cho Hero section
│   └── images/                     # Ảnh bộ sưu tập & banner cưới chất lượng cao
├── server/                         # Tầng máy chủ NestJS / Express BFF (theo chuẩn E:\SpintX\Source)
│   ├── server.js                   # Server entry point chạy tại port 6521
│   └── src/
│       ├── app.module.js           # Root AppModule
│       └── modules/
│           └── album/              # AlbumModule, AlbumController, AlbumService cung cấp API
├── src/
│   ├── App.jsx                     # Route definitions + React.lazy code splitting
│   ├── main.jsx                    # Entry point (Redux Provider, BrowserRouter, dark mode init)
│   ├── api/                        # Tầng API theo chuẩn request-manager skill
│   │   ├── configs/                # ApiRequestManager, callApi, forceLogout
│   │   └── core/                   # albumApi (các domain API cụ thể)
│   ├── assets/
│   │   ├── images/                 # Ảnh tĩnh nội bộ
│   │   └── scss/
│   │       └── app.scss            # SCSS entry point tích hợp Tailwind directives
│   ├── components/
│   │   ├── Loading.jsx             # Fallback loading component cho Suspense
│   │   ├── partials/               # Compound layout components
│   │   │   ├── header/Navbar.jsx   # Thanh điều hướng PhotoFlow, logo, user icon, dark mode toggle
│   │   │   └── footer/Footer.jsx   # Chân trang Spinrix với địa chỉ, links, mạng xã hội
│   │   └── ui/                     # 28 Atomic UI Components dùng chung (bảo toàn 100% mã nguồn)
│   │       ├── Accordion.jsx
│   │       ├── Alert.jsx
│   │       ├── Avatar.jsx
│   │       ├── Badge.jsx
│   │       ├── Breadcrumb.jsx
│   │       ├── Button.jsx
│   │       ├── Card.jsx
│   │       ├── Checkbox.jsx
│   │       ├── Drawer.jsx
│   │       ├── Dropdown.jsx
│   │       ├── Fileinput.jsx
│   │       ├── FormGroup.jsx
│   │       ├── Icon.jsx
│   │       ├── InputGroup.jsx
│   │       ├── Modal.jsx
│   │       ├── Pagination.jsx
│   │       ├── Progress.jsx
│   │       ├── Radio.jsx
│   │       ├── Select.jsx
│   │       ├── Skeleton.jsx
│   │       ├── Switch.jsx
│   │       ├── Tab.jsx
│   │       ├── Table.jsx
│   │       ├── Textarea.jsx
│   │       ├── Textinput.jsx
│   │       ├── Toast.jsx
│   │       ├── Tooltip.jsx
│   │       └── index.js
│   ├── constant/
│   │   ├── data.js                 # Dữ liệu tĩnh menu, footer, brand info
│   │   ├── themeColors.js          # Bảng mã màu Tailwind & theme
│   │   └── themeFonts.js           # Định nghĩa fonts chữ
│   ├── hooks/
│   │   └── useDarkMode.js          # Custom hook quản lý Dark / Light mode
│   ├── pages/
│   │   ├── Home.jsx                # Màn hình Landing Page chính (Hero, Workflow, Gallery, Banner)
│   │   └── Album.jsx               # Màn hình Danh sách Album 20 items (Banner, Toolbar, Grid/List, Modal)
│   └── store/
│       ├── index.js                # Cấu hình Redux store
│       ├── layout.js               # Redux slice quản lý layout & dark mode
│       └── rootReducer.js          # Tổng hợp reducers
├── index.html                      # HTML entry point tối ưu SEO & Schema JSON-LD
├── package.json                    # Dependencies & build scripts
├── postcss.config.cjs              # Cấu hình PostCSS (Tailwind + Autoprefixer)
├── tailwind.config.cjs             # Cấu hình Tailwind CSS v3 JIT mode
└── vite.config.js                  # Cấu hình Vite với alias @ trỏ về src/
```
