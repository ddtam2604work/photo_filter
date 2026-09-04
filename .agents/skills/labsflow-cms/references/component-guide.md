# Hướng Dẫn: Xây Dựng & Sử Dụng UI Components

---

## Danh Sách UI Components Sẵn Có

Tất cả nằm trong `src/components/ui/`. PHẢI dùng những component này thay vì viết HTML thô.

### Button
```jsx
import Button from "@/components/ui/Button";

// Button thường
<Button text="Lưu" className="btn-dark" onClick={handleSave} />

// Button với icon
<Button icon="heroicons-outline:plus" text="Thêm" className="btn-primary" />

// Button icon bên phải
<Button icon="heroicons-outline:arrow-right" text="Tiếp" iconPosition="right" className="btn-dark" />

// Button loading
<Button text="Đang lưu" isLoading={true} className="btn-dark" />

// Button disabled
<Button text="Không khả dụng" disabled={true} className="btn-dark" />

// Button dạng Link
<Button text="Xem chi tiết" link="/my-page" className="btn-outline-primary" />
```

### Textinput (dùng với react-hook-form)
```jsx
import Textinput from "@/components/ui/Textinput";

<Textinput
  name="email"
  label="Email"
  type="email"
  placeholder="Nhập email..."
  register={register}
  error={errors.email}
/>
```

### Modal (Controlled — dùng với Redux state)
```jsx
import Modal from "@/components/ui/Modal";

// Controlled modal (dùng activeModal từ Redux)
<Modal
  activeModal={isOpenModal}
  onClose={() => dispatch(toggleModal(false))}
  title="Tiêu Đề Modal"
  className="max-w-xl"
  footerContent={
    <div className="flex space-x-3">
      <Button text="Hủy" className="btn-outline-dark" onClick={() => dispatch(toggleModal(false))} />
      <Button text="Lưu" className="btn-dark" type="submit" />
    </div>
  }
>
  {/* Nội dung modal */}
</Modal>

// Uncontrolled modal (tự quản lý state)
<Modal uncontrol label="Mở Modal" title="Tiêu Đề" className="max-w-lg">
  {/* Nội dung */}
</Modal>
```

### Card
```jsx
import Card from "@/components/ui/Card";

<Card title="Tiêu Đề Card" noborder>
  {/* Nội dung */}
</Card>
```

### Icon
```jsx
import Icon from "@/components/ui/Icon";

// Sử dụng icon từ Iconify
<Icon icon="heroicons-outline:home" />
<Icon icon="heroicons-outline:pencil-square" />
<Icon icon="heroicons-outline:trash" />
<Icon icon="bi:check-lg" />
```

### Badge
```jsx
import Badge from "@/components/ui/Badge";

<Badge label="Active" className="bg-success-500 text-white" />
```

### Alert
```jsx
import Alert from "@/components/ui/Alert";

<Alert label="Cảnh báo" className="alert-warning" />
```

### Select (React Select)
```jsx
import Select from "@/components/ui/Select";

<Select
  label="Chọn danh mục"
  options={[
    { value: "option1", label: "Tùy chọn 1" },
    { value: "option2", label: "Tùy chọn 2" },
  ]}
  onChange={(selected) => setValue("category", selected)}
/>
```

### Checkbox
```jsx
import Checkbox from "@/components/ui/Checkbox";

<Checkbox
  label="Đồng ý điều khoản"
  name="agree"
  register={register}
/>
```

---

## Xây Dựng Component Mới

Khi cần component không có sẵn trong `src/components/ui/`:

### Vị Trí File
- **UI Component tái sử dụng** → `src/components/ui/MyComponent.jsx`
- **Component chỉ dùng trong 1 feature** → `src/pages/app/[feature]/MyComponent.jsx`
- **Layout Component** → `src/components/partials/[area]/MyComponent.jsx`

### Template Component Chuẩn
```jsx
import React from "react";
// Imports

const MyComponent = ({ 
  prop1,
  prop2,
  className = "",
}) => {
  return (
    <div className={`bg-white dark:bg-slate-800 rounded-md ${className}`}>
      {/* Component content */}
    </div>
  );
};

export default MyComponent;
```

### Quy Tắc Khi Viết Component
1. Luôn hỗ trợ `dark:` variant cho mọi class màu sắc
2. Luôn dùng `ltr:` / `rtl:` cho margin/padding/position
3. Dùng `@/` alias cho mọi import
4. Không hard-code màu — dùng bảng màu Tailwind của dự án
