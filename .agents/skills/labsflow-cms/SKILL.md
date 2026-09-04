---
name: labsflow-cms
description: >-
  Skill chuyên biệt cho dự án LabsFlowWebCMS-base (React 18 + Vite + Tailwind CSS v3 + Redux Toolkit).
  Kích hoạt skill này khi người dùng yêu cầu: tạo trang mới, thêm tính năng, xây dựng component,
  thêm route, quản lý Redux state, hoặc bất kỳ thao tác phát triển nào trong dự án LabsFlowWebCMS.
  Cung cấp hướng dẫn step-by-step tuân thủ nghiêm ngặt cấu trúc thư mục, convention và tech stack của dự án.
---

# LabsFlowWebCMS — Development Skill

Skill này hướng dẫn agent thực hiện mọi tác vụ phát triển trong dự án **LabsFlowWebCMS-base** theo đúng chuẩn kiến trúc, convention và tech stack đã thiết lập.

> Luôn đọc file references khi cần chi tiết chuyên sâu. Không bao giờ tự ý thay đổi code ngoài phạm vi yêu cầu.

---

## Cấu Trúc Thư Mục Thực Tế

```
e:/LabsFlowWebCMS-base/
├── public/
├── src/
│   ├── App.jsx                    # Route definitions + React.lazy code splitting
│   ├── main.jsx                   # Entry point (Redux Provider + BrowserRouter)
│   ├── assets/
│   │   ├── images/                # SVG, avatar, logo, hình ảnh tĩnh
│   │   └── scss/
│   │       ├── app.scss           # Import entry point cho toàn bộ SCSS
│   │       ├── components/        # SCSS cho UI components
│   │       ├── layout/            # SCSS cho layout
│   │       └── utility/           # SCSS utility classes
│   ├── components/
│   │   ├── Loading.jsx            # Fallback loading component (dùng cho Suspense)
│   │   ├── ui/                    # Atomic UI Components — PHẢI dùng khi có sẵn
│   │   │   ├── Accordion.jsx
│   │   │   ├── Alert.jsx
│   │   │   ├── Badge.jsx
│   │   │   ├── Breadcrumbs.jsx
│   │   │   ├── Button.jsx         # Props: text, icon, iconPosition, className, onClick, link, div, isLoading, disabled
│   │   │   ├── Card.jsx
│   │   │   ├── Carousel.jsx
│   │   │   ├── Checkbox.jsx
│   │   │   ├── Dropdown.jsx
│   │   │   ├── Fileinput.jsx
│   │   │   ├── FormGroup.jsx
│   │   │   ├── Icon.jsx           # Wrapper của @iconify/react
│   │   │   ├── Image.jsx
│   │   │   ├── InputGroup.jsx
│   │   │   ├── Modal.jsx          # Props: activeModal, onClose, title, className, children, footerContent
│   │   │   ├── Pagination.jsx
│   │   │   ├── ProgressBar/
│   │   │   ├── Radio.jsx
│   │   │   ├── Select.jsx
│   │   │   ├── Split-dropdown.jsx
│   │   │   ├── Switch.jsx
│   │   │   ├── Textarea.jsx
│   │   │   ├── Textinput.jsx      # Props: name, label, type, placeholder, register, error
│   │   │   └── Tooltip.jsx
│   │   ├── partials/              # Layout/Compound components
│   │   │   ├── SelectMonth.jsx
│   │   │   ├── Table/
│   │   │   ├── footer/
│   │   │   ├── header/
│   │   │   ├── settings/
│   │   │   ├── sidebar/
│   │   │   └── widget/
│   │   └── skeleton/              # Loading skeleton components (Grid, Table...)
│   ├── configs/
│   │   └── themeConfig.js         # KHÔNG tự ý sửa — cấu hình theme mặc định
│   ├── constant/
│   │   ├── data.js                # menuItems[] — cập nhật khi thêm route mới có menu
│   │   ├── table-data.js          # Mock data cho bảng
│   │   └── appex-chart.js         # Data cho ApexCharts
│   ├── hooks/                     # Custom hooks bọc Redux state layout
│   │   ├── useDarkMode.js         → [isDark, setDarkMode]
│   │   ├── useSidebar.js          → [collapsed, setCollapsed]
│   │   ├── useMobileMenu.js       → [mobileMenu, setMobileMenu]
│   │   ├── useWidth.js            → { width, breakpoints }
│   │   ├── useContentWidth.js     → [contentWidth, setContentWidth]
│   │   ├── useMenulayout.js       → [menuType, setMenuType]
│   │   ├── useMenuHidden.js       → [menuHidden, setMenuHidden]
│   │   ├── useNavbarType.js       → [navbarType, setNavbarType]
│   │   ├── useFooterType.js       → [footerType, setFooterType]
│   │   ├── useRtl.js              → [isRtl, setIsRtl]
│   │   ├── useSemiDark.js         → [semiDark, setSemiDark]
│   │   ├── useMonoChrome.js       → [isMonochrome, setMonochrome]
│   │   └── useSkin.js             → [skin, setSkin]
│   ├── layout/
│   │   └── Layout.jsx             # Master layout (Header + Sidebar + Footer + Outlet)
│   ├── pages/
│   │   ├── 404.jsx
│   │   ├── changelog.jsx
│   │   ├── icons.jsx
│   │   ├── app/                   # Feature apps có Redux store riêng
│   │   │   ├── calender/          # store.js + components
│   │   │   ├── chat/              # store.js + components
│   │   │   ├── email/             # store.js + components
│   │   │   ├── kanban/            # store.js + components
│   │   │   ├── projects/          # store.js, index.jsx, ProjectGrid.jsx, ProjectList.jsx
│   │   │   │                      # AddProject.jsx, EditProject.jsx, project-details.jsx
│   │   │   └── todo/              # store.js + components
│   │   ├── auth/
│   │   │   ├── common/store.js    # Auth Redux slice
│   │   │   ├── login.jsx, login2.jsx, login3.jsx
│   │   │   ├── register.jsx, register2.jsx, register3.jsx
│   │   │   ├── forgot-password.jsx...
│   │   │   └── lock-screen.jsx...
│   │   ├── chart/
│   │   ├── components/
│   │   ├── dashboard/             # index.jsx, ecommerce.jsx, crm.jsx, project.jsx, banking.jsx
│   │   ├── forms/
│   │   ├── map/
│   │   ├── table/
│   │   ├── utility/               # invoice, pricing, profile, settings, faq, blog...
│   │   └── widget/
│   └── store/
│       ├── index.js               # configureStore setup
│       ├── rootReducer.js         # Thêm reducer mới vào đây
│       └── layout.js              # layoutSlice — quản lý UI state toàn cục
├── tailwind.config.cjs            # KHÔNG tự ý sửa
├── vite.config.js                 # KHÔNG tự ý sửa (alias @ -> src/)
├── package.json                   # KHÔNG tự ý sửa
└── postcss.config.cjs             # KHÔNG tự ý sửa
```

---

## Quy Trình Thực Hiện Task

### Bước 1 — Xác Định Loại Task
Đọc yêu cầu và xác định loại task: tạo trang, tạo component, thêm Redux state, hay styling.

### Bước 2 — Đọc Code Liên Quan
Trước khi code, luôn đọc file liên quan để hiểu pattern hiện tại của module:
- Nếu thêm trang app mới → đọc `src/pages/app/projects/` làm reference
- Nếu thêm component → đọc file component tương tự trong `src/components/ui/`
- Nếu thêm Redux slice → đọc `src/store/layout.js` và `src/pages/app/projects/store.js`

### Bước 3 — Thực Hiện Theo Đúng Thứ Tự
Xem chi tiết trong references theo từng loại task.

### Bước 4 — Kiểm Tra
- Không để lại `console.log` hoặc lỗi cú pháp
- Đảm bảo dark mode classes đầy đủ
- Đảm bảo RTL classes đầy đủ khi dùng margin/padding/positioning

---

## Quy Tắc Bắt Buộc

| Quy tắc | Mô tả |
|---------|-------|
| **Strict Scope** | Chỉ sửa file được chỉ định. Không tự ý refactor code ngoài phạm vi |
| **Path Alias** | Luôn dùng `@/` thay relative path dài (`../../`) |
| **UI Components** | Phải dùng `@/components/ui/*` khi có component sẵn. Không viết thẻ HTML thô thay thế |
| **Dark Mode** | Mọi class màu nền/chữ/border phải có biến thể `dark:` |
| **RTL Support** | Canh lề dùng `ltr:` / `rtl:` prefix thay vì `ml-`, `mr-`, `left-`, `right-` thẳng |
| **Toast Notifications** | Dùng `react-toastify` cho mọi action CRUD (thêm/sửa/xóa) |
| **Form Validation** | Dùng `react-hook-form` + `yup` + `@hookform/resolvers/yup` |
| **No Config Changes** | Không sửa `vite.config.js`, `tailwind.config.cjs`, `package.json`, `themeConfig.js` trừ khi được yêu cầu |

---

## Tham Khảo Chi Tiết

- [Hướng dẫn thêm trang mới](./references/add-new-page.md)
- [Hướng dẫn component UI](./references/component-guide.md)
- [Hướng dẫn Redux Toolkit](./references/redux-guide.md)
- [Hướng dẫn Styling & Tailwind](./references/styling-guide.md)
