# Hướng Dẫn: Thêm Trang Mới Vào LabsFlowWebCMS

Đây là checklist đầy đủ khi thêm một trang mới vào dự án.

---

## Trường Hợp 1: Trang App (có Redux Store riêng)

Đặt trong `src/pages/app/[feature-name]/`

### Checklist

- [ ] **1. Tạo thư mục feature**
  ```
  src/pages/app/[feature-name]/
  ├── index.jsx         # Entry point của feature
  ├── store.js          # Redux slice riêng
  └── [Component].jsx   # Sub-components
  ```

- [ ] **2. Tạo Redux slice (`store.js`)**
  ```js
  import { createSlice } from "@reduxjs/toolkit";
  import { toast } from "react-toastify";

  export const myFeatureSlice = createSlice({
    name: "myFeature",
    initialState: {
      items: [],
      isOpenModal: false,
      editItem: {},
    },
    reducers: {
      toggleModal: (state, action) => { state.isOpenModal = action.payload; },
      addItem: (state, action) => {
        state.items.unshift(action.payload);
        toast.success("Thêm mới thành công!");
      },
      removeItem: (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
        toast.warning("Đã xóa thành công!");
      },
    },
  });
  export const { toggleModal, addItem, removeItem } = myFeatureSlice.actions;
  export default myFeatureSlice.reducer;
  ```

- [ ] **3. Đăng ký reducer vào `src/store/rootReducer.js`**
  ```js
  import myFeature from "../pages/app/[feature-name]/store";
  
  const rootReducer = {
    // ... reducers hiện có ...
    myFeature,  // <-- thêm vào đây
  };
  ```

- [ ] **4. Khai báo route trong `src/App.jsx`**
  ```js
  // Import lazy (đặt cùng nhóm "app page")
  const MyFeaturePage = lazy(() => import("./pages/app/[feature-name]"));

  // Khai báo Route bên trong <Route path="/*" element={<Layout />}>
  <Route path="my-feature" element={<MyFeaturePage />} />
  ```

- [ ] **5. Thêm vào menu sidebar (`src/constant/data.js`)**
  ```js
  // Thêm vào mảng menuItems
  {
    title: "Tên Menu",
    icon: "heroicons-outline:[icon-name]",
    link: "my-feature",    // Không có slash đầu
    isHide: true,
  },
  ```

---

## Trường Hợp 2: Trang Utility (không có Redux riêng)

Đặt trong `src/pages/utility/[feature-name].jsx` (hoặc `src/pages/utility/[feature-name]/index.jsx` nếu cần nhiều file).

### Checklist

- [ ] **1. Tạo file trang**
  ```
  src/pages/utility/my-page.jsx
  ```

- [ ] **2. Khai báo route trong `src/App.jsx`**
  ```js
  const MyPage = lazy(() => import("./pages/utility/my-page"));

  // Trong <Route path="/*" element={<Layout />}>
  <Route path="my-page" element={<MyPage />} />
  ```

- [ ] **3. Cập nhật menu nếu cần (`src/constant/data.js`)**

---

## Trường Hợp 3: Trang Auth (ngoài Layout)

Đặt trong `src/pages/auth/[auth-page].jsx`.

### Checklist

- [ ] **1. Tạo file trang**
- [ ] **2. Khai báo route NGOÀI `<Route path="/*" element={<Layout />}>`**
  ```js
  const MyAuthPage = lazy(() => import("./pages/auth/my-auth-page"));

  // Đặt NGOÀI <Route path="/*">
  <Route
    path="/my-auth-page"
    element={
      <Suspense fallback={<Loading />}>
        <MyAuthPage />
      </Suspense>
    }
  />
  ```

---

## Template Trang Chuẩn

```jsx
import React from "react";
// Import từ ui components
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const MyNewPage = () => {
  return (
    <div>
      {/* Page header */}
      <div className="flex flex-wrap justify-between items-center mb-4">
        <h4 className="font-medium lg:text-2xl text-xl capitalize text-slate-900 dark:text-white inline-block ltr:pr-4 rtl:pl-4">
          Tên Trang
        </h4>
        <div className="md:flex md:space-x-4 md:justify-end items-center rtl:space-x-reverse">
          <Button
            icon="heroicons-outline:plus"
            text="Thêm Mới"
            className="btn-dark dark:bg-slate-800 h-min text-sm font-normal"
          />
        </div>
      </div>

      {/* Page content */}
      <Card>
        <div className="p-6">
          {/* Nội dung trang */}
        </div>
      </Card>
    </div>
  );
};

export default MyNewPage;
```
