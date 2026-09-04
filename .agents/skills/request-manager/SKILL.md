---
name: request-manager
description: >
  Skill hướng dẫn sử dụng ApiRequestManager trong dự án LabsFlowWebCMS (JS/React/Vite).
  Kích hoạt khi người dùng yêu cầu: thêm API mới, viết api core, gọi API trong component/hook,
  batch request, cancel request, xử lý lỗi 401, overlay loading, sequential/parallel requests,
  dataFactory, hoặc bất kỳ tác vụ nào liên quan đến tầng API của dự án.
---

# Skill: ApiRequestManager — Hướng dẫn đầy đủ cho Agent

## 1. Tổng quan kiến trúc tầng API

```
src/api/
├── configs/
│   ├── ApiRequestManager.js       ← Lõi: class static quản lý queue, scheduler, overlay
│   ├── apiRequestManagerClient.js ← Khởi tạo configure() một lần, export singleton
│   ├── callApi.js                 ← Adapter đơn-request; tương thích React Query
│   ├── forceLogout.js             ← Xử lý 401 (refreshToken hết hạn) → logout + redirect
│   └── index.js                   ← Re-export tất cả configs
└── core/
    ├── authApi.js                 ← Auth: login, register, profile, OTP...
    ├── roleApi.js                 ← Vai trò: CRUD, phân trang, trạng thái
    ├── accountApi.js              ← Tài khoản: tạo, chi tiết, cập nhật, đổi mật khẩu
    └── index.js                   ← Re-export tất cả core APIs
```

Luồng gọi chuẩn:
  Component/Hook → src/api/core/*.js → callApi() → ApiRequestManager.sendRequests() → axios

## 2. callApi — Cách dùng chuẩn

callApi là adapter duy nhất để gọi API đơn lẻ trong src/api/core/*.js. KHÔNG dùng axios trực tiếp.

### 2.1. Cú pháp helper nhanh (khuyến nghị)

```js
import callApi from '../configs/callApi'

// GET với query params
callApi.get('/api/v1/vai-tro/danh-sach', { trang: 1, so_luong: 20 }, { showOverlay: false })

// POST với body
callApi.post('/api/v1/vai-tro/tao-moi', { ma_vai_tro: 'admin' }, { showOverlay: true })

// PUT
callApi.put('/api/tai-khoan/cap-nhat/123', { ho_ten: 'Tên mới' }, { showOverlay: true })

// DELETE
callApi.delete('/api/tai-khoan/xoa/123', {}, { showOverlay: true })
```

### 2.2. Cú pháp object đầy đủ

```js
callApi({ apiUrl: '/api/v1/user', method: 'POST', data: { name: 'A' } }, { showOverlay: true })
```

### 2.3. Quy tắc gán showOverlay

| Loại API | showOverlay |
|---|---|
| Query (get-paging, get-all, get-detail, danh-sach) | false |
| Mutation (tao-moi, cap-nhat, xoa, trang-thai, doi-mat-khau) | true |
| Auth (dang-nhap, dang-ky) | true |

### 2.4. Hợp đồng resolve/reject

- resolve: trả về response.data (envelope {message, errorCode, data, statusCode})
- reject(Error): chỉ khi lỗi thật — network, timeout, 401, cancel
- HTTP 200 nhưng errorCode <= 0: vẫn resolve; component tự kiểm tra
- 401: forceLogout() tự động được gọi trước khi reject

## 3. Cấu trúc file api/core chuẩn

```js
// src/api/core/tenDomainApi.js
import callApi from '../configs/callApi'

/**
 * Mô tả ngắn gọn
 * @param {{ tham_so_1: string }} data
 */
export const tenHamApi = (data) =>
  callApi.post('/api/v1/duong-dan', data, { showOverlay: true })

/**
 * Lấy danh sách phân trang
 * @param {{ trang?: number, so_luong?: number, tim_kiem?: string }} [params={}]
 */
export const getDanhSachApi = (params = {}) =>
  callApi.get('/api/v1/duong-dan/danh-sach', {
    trang: params.trang || 1,
    so_luong: params.so_luong || 20,
    tim_kiem: params.tim_kiem || ''
  }, { showOverlay: false })
```

Quy tắc bắt buộc:
1. Luôn có JSDoc mô tả tham số
2. Dùng callApi.get/post/put/delete — không import ApiRequestManager vào core files
3. showOverlay: false cho query, showOverlay: true cho mutation
4. Export đúng tên và đăng ký vào src/api/core/index.js

## 4. Đăng ký API mới vào index

```js
// src/api/core/index.js — thêm dòng export mới
export * from './authApi'
export * from './roleApi'
export * from './accountApi'
export * from './tenDomainMoiApi'  // ← thêm
```

## 5. Dùng trong React Query hooks

### useMutation

```js
import { useMutation } from '@tanstack/react-query'
import { tenHamApi } from '@/api'

export const useTenHamMutation = () => {
  return useMutation({
    mutationFn: (data) => tenHamApi(data),
    onSuccess: (response) => {
      if (response?.errorCode <= 0) {
        toast.error(response?.message || 'Thao tác thất bại.')
        return
      }
      toast.success('Thao tác thành công!')
    },
    onError: (error) => {
      toast.error(error?.message || 'Lỗi không xác định.')
    }
  })
}
```

### useQuery

```js
import { useQuery } from '@tanstack/react-query'
import { getDanhSachApi } from '@/api'

export const useDanhSachQuery = (params) => {
  return useQuery({
    queryKey: ['ten-domain', 'danh-sach', params],
    queryFn: () => getDanhSachApi(params),
    select: (response) => response?.data
  })
}
```

## 6. sendRequests() trực tiếp (Nâng cao — batch nhiều API)

Chỉ dùng khi cần: nhiều API song song với overlay dùng chung, hoặc tuần tự với dataFactory.

```js
import ApiRequestManager from '@/api/configs/apiRequestManagerClient'

// Song song
const batchResult = await ApiRequestManager.sendRequests({
  apiList: [
    { key: 'customers', apiUrl: '/customer/get-paging', method: 'POST', data: { page: 1 } },
    { key: 'categories', apiUrl: '/category/get-all', method: 'POST', data: {} }
  ],
  parallel: true,
  showOverlay: true
})

const customersResult = batchResult.results.find(r => r.key === 'customers')
```

### 6.1. Tuần tự với dataFactory

```js
let generatedId

await ApiRequestManager.sendRequests({
  apiList: [
    {
      key: 'step-1',
      apiUrl: '/api/step-1',
      method: 'POST',
      data: { ... },
      successCallBack: (data) => {
        generatedId = data?.data?.id
      }
    },
    {
      key: 'step-2',
      apiUrl: '/api/step-2',
      method: 'POST',
      // dataFactory chạy SAU KHI step-1 đã await xong (vì parallel: false)
      dataFactory: () => {
        if (!generatedId) throw new Error('Thiếu dữ liệu từ bước 1.')
        return { id: generatedId }
      }
    }
  ],
  parallel: false,    // BẮT BUỘC false khi dùng dataFactory phụ thuộc nhau
  stopOnError: true,
  showOverlay: true
})
```

### 6.2. Xử lý 401 khi dùng sendRequests() trực tiếp

```js
import forceLogout from '@/api/configs/forceLogout'

{
  errorCallBack: (error) => {
    if (error.statusCode === 401) {
      forceLogout()
      return
    }
    toast.error(error.message)
  }
}
```

## 7. Cancel request với AbortController

```js
import { useRef, useEffect } from 'react'

const abortRef = useRef(null)

useEffect(() => {
  abortRef.current = new AbortController()

  callApi({
    apiUrl: '/api/v1/data',
    method: 'GET',
    signal: abortRef.current.signal
  }, { showOverlay: false })

  return () => abortRef.current?.abort()
}, [])

// Trong onError: bỏ qua lỗi cancel
onError: (error) => {
  if (error.isCanceled) return
  toast.error(error.message)
}
```

## 8. Xử lý các loại lỗi

| Trường hợp | Hành vi |
|---|---|
| HTTP 200 + errorCode <= 0 | resolve — component tự kiểm tra |
| Network / timeout | reject(Error) |
| HTTP 401 | forceLogout() tự động + reject(Error) |
| AbortController.abort() | reject với error.isCanceled === true |
| Lỗi trong successCallBack | Cô lập, không ảnh hưởng scheduler |

## 9. Những gì KHÔNG thuộc phạm vi ApiRequestManager

- Không cache / dedupe (dùng React Query useQuery)
- Không retry tự động khi lỗi mạng
- Không priority queue giữa các batch
- Không dependency graph phức tạp (dataFactory chỉ hỗ trợ chuỗi tuyến tính)
- Không tự refresh access token — 401 = refreshToken hết hạn = logout ngay

## 10. Checklist khi thêm module API mới

- [ ] Tạo file src/api/core/tenDomainApi.js
- [ ] Import callApi từ '../configs/callApi'
- [ ] Viết JSDoc đầy đủ cho từng hàm
- [ ] showOverlay: false cho query, showOverlay: true cho mutation
- [ ] Đăng ký export vào src/api/core/index.js
- [ ] KHÔNG sửa ApiRequestManager.js, apiRequestManagerClient.js, callApi.js

## 11. Ví dụ thực tế từ codebase

### authApi.js
```js
export const loginApi = (data) =>
  callApi.post('/api/v1/public/xac-thuc/dang-nhap', data, { showOverlay: true })

export const getMeProfileApi = () =>
  callApi.post('/api/v1/xac-thuc/profile/me', {}, { showOverlay: false })

export const sendOtpForgotPasswordApi = (data) =>
  callApi.post('/api/v1/public/quen-mat-khau/gui-otp', data, { showOverlay: true })
```

### roleApi.js
```js
export const createRoleApi = (data) =>
  callApi.post('/api/v1/vai-tro/tao-moi', data, { showOverlay: true })

export const getRolesPagingApi = (params = {}) =>
  callApi.get('/api/v1/vai-tro/danh-sach', {
    trang: params.trang || 1,
    so_luong: params.so_luong || 20,
    tim_kiem: params.tim_kiem || ''
  }, { showOverlay: false })

export const deleteRoleApi = (roleId) =>
  callApi.post(`/api/vai-tro/xoa/${roleId}`, {}, { showOverlay: true })
```

### accountApi.js
```js
export const createAccountApi = (data) =>
  callApi.post('/api/tai-khoan/tao-moi', data, { showOverlay: true })

export const getAccountDetailApi = (accountId) =>
  callApi.get(`/api/tai-khoan/${accountId}`, {}, { showOverlay: false })

export const changeAccountPasswordApi = (accountId, data) =>
  callApi.post(`/api/tai-khoan/doi-mat-khau/${accountId}`, data, { showOverlay: true })
```
