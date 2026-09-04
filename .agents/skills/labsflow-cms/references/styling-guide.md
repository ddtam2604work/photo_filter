# Hướng Dẫn: Styling & Tailwind CSS trong LabsFlowWebCMS

---

## Bảng Màu Dự Án (Tailwind Config)

Dự án sử dụng các màu tùy chỉnh sau (từ `tailwind.config.cjs`):

| Token | Dùng cho |
|-------|----------|
| `primary-{50-900}` | Màu chính của ứng dụng |
| `secondary-{50-900}` | Màu phụ |
| `success-{50-900}` | Thành công, trạng thái tốt |
| `danger-{50-900}` | Lỗi, nguy hiểm |
| `warning-{50-900}` | Cảnh báo |
| `info-{50-900}` | Thông tin |
| `black-{500}` | Màu đen |
| `gray-{500}` | Màu xám |
| `slate-{50-900}` | Màu chủ đạo nền/chữ |

---

## Quy Tắc Dark Mode

LUÔN đi kèm `dark:` variant:

```
✅ ĐÚNG:
bg-white dark:bg-slate-800
text-slate-900 dark:text-white
text-slate-600 dark:text-slate-300
border-slate-200 dark:border-slate-700
bg-slate-100 dark:bg-slate-900

❌ SAI:
bg-white          (thiếu dark mode)
text-slate-900    (thiếu dark mode)
```

### Bảng Dark Mode Chuẩn

| Thành phần | Light | Dark |
|------------|-------|------|
| Card/Panel nền | `bg-white` | `dark:bg-slate-800` |
| Trang nền | `bg-slate-100` | `dark:bg-slate-900` |
| Chữ chính | `text-slate-900` | `dark:text-white` |
| Chữ phụ | `text-slate-600` | `dark:text-slate-300` |
| Chữ mờ | `text-slate-500` | `dark:text-slate-400` |
| Border | `border-slate-200` | `dark:border-slate-700` |
| Input nền | `bg-white` | `dark:bg-slate-900` |
| Hover nền | `hover:bg-slate-100` | `dark:hover:bg-slate-700` |

---

## Quy Tắc RTL/LTR

Thay vì dùng `ml-`, `mr-`, `left-`, `right-` thẳng, phải dùng prefix `ltr:` / `rtl:`:

```
✅ ĐÚNG:
ltr:ml-2 rtl:mr-2
ltr:mr-4 rtl:ml-4
ltr:left-0 rtl:right-0
ltr:pl-4 rtl:pr-4
ltr:text-left rtl:text-right
ltr:ml-[248px] rtl:mr-[248px]   (sidebar offset)

❌ SAI:
ml-2          (chỉ cho LTR)
mr-4          (chỉ cho LTR)
left-0        (chỉ cho LTR)
```

---

## Typography

Dự án dùng font mặc định từ Tailwind. Áp dụng font size chuẩn:

```
text-xs      → 12px
text-sm      → 14px
text-base    → 16px
text-lg      → 18px
text-xl      → 20px
text-2xl     → 24px
text-3xl     → 30px
```

### Heading Chuẩn
```jsx
{/* Page title */}
<h4 className="font-medium lg:text-2xl text-xl capitalize text-slate-900 dark:text-white">
  Tiêu Đề Trang
</h4>

{/* Section title */}
<h5 className="font-medium text-lg text-slate-900 dark:text-white">
  Tiêu Đề Section
</h5>

{/* Label */}
<p className="text-sm text-slate-600 dark:text-slate-300">
  Mô tả ngắn
</p>
```

---

## Layout & Spacing Chuẩn

### Grid Layout
```jsx
{/* 3 cột responsive */}
<div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">

{/* 4 cột responsive */}
<div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">

{/* 2 cột responsive */}
<div className="grid md:grid-cols-2 grid-cols-1 gap-5">
```

### Flex Layout
```jsx
{/* Header với justify between */}
<div className="flex flex-wrap justify-between items-center mb-4">

{/* Nút nhóm */}
<div className="md:flex md:space-x-4 md:justify-end items-center rtl:space-x-reverse">
```

---

## Button Classes Chuẩn

```jsx
// Dark button
className="btn-dark"
// hoặc
className="bg-slate-900 dark:bg-slate-700 text-white"

// Primary button  
className="btn-primary"
// hoặc
className="bg-primary-500 text-white"

// Outline button
className="btn-outline-dark"
className="btn-outline-primary"

// Danger button
className="btn-danger"
className="bg-danger-500 text-white"

// Success button
className="btn-success"
className="bg-success-500 text-white"

// Size modifiers
className="btn-sm"    // small
className="btn-md"    // medium (default)
className="btn-lg"    // large
```

---

## Responsive Breakpoints

```
sm  → 640px
md  → 768px
lg  → 1024px
xl  → 1280px
2xl → 1536px
```

Dùng trong code:
```jsx
const { width, breakpoints } = useWidth();
// breakpoints: { sm: 640, md: 768, lg: 1024, xl: 1280, '2xl': 1536 }

if (width < breakpoints.md) {
  // mobile
}
```

---

## SCSS

Khi cần style tùy chỉnh không có sẵn trong Tailwind:
- Thêm vào `src/assets/scss/components/` cho component styles
- Thêm vào `src/assets/scss/utility/` cho utility classes
- Thêm vào `src/assets/scss/layout/` cho layout styles
- Import trong `src/assets/scss/app.scss`
