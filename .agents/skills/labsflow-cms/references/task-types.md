# Phân Loại Task & Quy Trình Xử Lý

---

## Bảng Phân Loại Task

| Loại Task | Mô Tả | Quy Trình | File Cần Sửa |
|-----------|--------|-----------|--------------|
| **Thêm trang app** | Tạo feature mới với Redux store riêng | Đọc add-new-page.md (TH1) | `pages/app/[feature]/index.jsx`, `pages/app/[feature]/store.js`, `store/rootReducer.js`, `App.jsx`, `constant/data.js` |
| **Thêm trang utility** | Tạo trang thông tin/tiện ích không cần Redux | Đọc add-new-page.md (TH2) | `pages/utility/[name].jsx`, `App.jsx`, `constant/data.js` |
| **Thêm trang auth** | Tạo trang xác thực ngoài Layout | Đọc add-new-page.md (TH3) | `pages/auth/[name].jsx`, `App.jsx` |
| **Tạo UI component** | Component tái sử dụng | Đọc component-guide.md | `components/ui/[Name].jsx` |
| **Thêm Redux slice** | Quản lý state cho feature | Đọc redux-guide.md | `pages/app/[feature]/store.js`, `store/rootReducer.js` |
| **Styling** | Thêm/sửa style | Đọc styling-guide.md | Tailwind classes hoặc `assets/scss/` |
| **Thêm menu item** | Cập nhật sidebar navigation | — | `constant/data.js` |
| **Sửa form** | Thêm/sửa form validation | Đọc component-guide.md | File page tương ứng |

---

## Quy Trình Chung

```
1. Đọc yêu cầu → xác định loại task
2. Đọc file liên quan hiện có → hiểu pattern
3. Thực hiện đúng thứ tự (slice → rootReducer → page → route → menu)
4. Kiểm tra dark mode & RTL classes
5. Không để lại console.log
```

---

## Thứ Tự Thực Hiện Khi Thêm Feature App Đầy Đủ

```
1. src/pages/app/[feature]/store.js          ← tạo Redux slice
2. src/store/rootReducer.js                  ← đăng ký reducer
3. src/pages/app/[feature]/index.jsx         ← tạo trang chính
4. src/pages/app/[feature]/[Component].jsx   ← tạo sub-components
5. src/App.jsx                               ← khai báo route (lazy import)
6. src/constant/data.js                      ← thêm menu item (nếu cần)
```

---

## Các Pattern Phổ Biến

### Pattern: Trang Có Danh Sách + CRUD Modal

Xem reference trong `src/pages/app/projects/`:
- `index.jsx` — page entry với danh sách và toggle modal
- `store.js` — Redux slice với CRUD actions
- `AddProject.jsx` — Modal form thêm mới
- `EditProject.jsx` — Modal form chỉnh sửa
- `ProjectGrid.jsx` — Grid view item
- `ProjectList.jsx` — List view item

### Pattern: Dashboard Card Stats

Xem `src/pages/dashboard/index.jsx`

### Pattern: Form Validation

Xem `src/pages/forms/form-validation/`
