# Hướng Dẫn: Redux Toolkit trong LabsFlowWebCMS

---

## Kiến Trúc Redux

```
src/store/
├── index.js           # configureStore — KHÔNG sửa
├── rootReducer.js     # Tổng hợp mọi slice — CÓ THỂ thêm reducer mới
└── layout.js          # layoutSlice — UI state toàn cục

src/pages/app/[feature]/
└── store.js           # Slice riêng cho từng feature app

src/pages/auth/common/
└── store.js           # Auth slice
```

---

## Cách Thêm Redux State Mới

### 1. Tạo Slice (`src/pages/app/[feature]/store.js`)

```js
import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

export const myFeatureSlice = createSlice({
  name: "myFeature",
  initialState: {
    items: [],
    isOpenModal: false,
    editItem: {},
    editModal: false,
    isLoading: null,
  },
  reducers: {
    // Toggle modal
    toggleAddModal: (state, action) => {
      state.isOpenModal = action.payload;
    },
    toggleEditModal: (state, action) => {
      state.editModal = action.payload;
    },
    // CRUD actions
    addItem: (state, action) => {
      state.items.unshift(action.payload);
      toast.success("Thêm mới thành công!", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      toast.warning("Đã xóa thành công!", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    },
    updateItem: (state, action) => {
      state.editItem = action.payload;
      state.editModal = !state.editModal;
      const index = state.items.findIndex(item => item.id === action.payload.id);
      state.items.splice(index, 1, action.payload);
    },
  },
});

export const {
  toggleAddModal,
  toggleEditModal,
  addItem,
  removeItem,
  updateItem,
} = myFeatureSlice.actions;

export default myFeatureSlice.reducer;
```

### 2. Đăng Ký Reducer vào `src/store/rootReducer.js`

```js
import layout from "./layout";
import todo from "../pages/app/todo/store";
import email from "../pages/app/email/store";
import chat from "../pages/app/chat/store";
import project from "../pages/app/projects/store";
import kanban from "../pages/app/kanban/store";
import calendar from "../pages/app/calender/store";
import auth from "../pages/auth/common/store";
// THÊM IMPORT MỚI:
import myFeature from "../pages/app/[feature-name]/store";

const rootReducer = {
  layout,
  todo,
  email,
  chat,
  project,
  kanban,
  calendar,
  auth,
  myFeature, // THÊM VÀO ĐÂY
};
export default rootReducer;
```

---

## Sử Dụng Redux State Trong Component

```jsx
import { useSelector, useDispatch } from "react-redux";
import { addItem, removeItem, toggleAddModal } from "./store";

const MyPage = () => {
  const dispatch = useDispatch();
  const { items, isOpenModal, editItem } = useSelector(
    (state) => state.myFeature
  );

  const handleAdd = (data) => {
    dispatch(addItem({ id: uuidv4(), ...data }));
    dispatch(toggleAddModal(false));
  };

  const handleDelete = (id) => {
    dispatch(removeItem(id));
  };

  return (
    <div>
      <button onClick={() => dispatch(toggleAddModal(true))}>Thêm</button>
      {/* ... */}
    </div>
  );
};
```

---

## Layout Hooks — Sử Dụng Redux Layout State

Không dùng `useSelector` trực tiếp cho layout state. Dùng custom hooks:

```jsx
import useDarkMode from "@/hooks/useDarkMode";
import useSidebar from "@/hooks/useSidebar";
import useMobileMenu from "@/hooks/useMobileMenu";
import useWidth from "@/hooks/useWidth";

const MyComponent = () => {
  const [isDark, setDarkMode] = useDarkMode();
  const [collapsed, setCollapsed] = useSidebar();
  const [mobileMenu, setMobileMenu] = useMobileMenu();
  const { width, breakpoints } = useWidth();

  // Kiểm tra responsive
  if (width < breakpoints.md) {
    // mobile view
  }
};
```

---

## Các Reducers Đã Có Trong `layout.js`

| Action | Mô tả |
|--------|-------|
| `handleDarkMode(bool)` | Bật/tắt dark mode |
| `handleSidebarCollapsed(bool)` | Thu/mở sidebar |
| `handleCustomizer(bool)` | Bật/tắt panel customizer |
| `handleSemiDarkMode(bool)` | Bật/tắt semi dark mode |
| `handleRtl(bool)` | Chuyển RTL/LTR |
| `handleSkin(string)` | Đổi skin (default/bordered) |
| `handleContentWidth(string)` | Đổi content width (full/boxed) |
| `handleType(string)` | Đổi layout type (vertical/horizontal) |
| `handleMenuHidden(bool)` | Ẩn/hiện menu |
| `handleNavBarType(string)` | Đổi navbar type (sticky/floating/static/hidden) |
| `handleFooterType(string)` | Đổi footer type (static/sticky/hidden) |
| `handleMobileMenu(bool)` | Bật/tắt mobile menu |
| `handleMonoChrome(bool)` | Bật/tắt monochrome mode |
