# Trạng Thái Tính Năng Hiện Tại (Current State)

## 1. Tính năng đã hoàn thành
- [x] Di chuyển và chuẩn hóa 28 UI components vào `src/components/ui/` mà không làm thay đổi một dòng code nào trong các file UI.
- [x] Thiết lập cấu trúc dự án chuẩn LabsFlowWebCMS: `package.json`, `vite.config.js`, `tailwind.config.cjs`, `postcss.config.cjs`, `index.html`.
- [x] Tích hợp Redux store và `layout` slice quản lý Dark Mode và layout state.
- [x] Tích hợp hệ thống Custom Hook `useDarkMode`.
- [x] Xây dựng tầng API chuẩn theo skill `/request-manager`: `ApiRequestManager`, `apiRequestManagerClient`, `callApi`, `forceLogout`, `albumApi`.
- [x] Xây dựng Navbar PhotoFlow hoàn chỉnh với Dark Mode toggle và User button.
- [x] Tái hiện giao diện Landing Page 1:1 theo thiết kế mẫu:
  - **Header & Navbar:** Thiết kế floating pill capsule hiện đại (Hình 3) với logo SpintX PhotoFlow, active link 'Trang chủ' dạng pill màu tím nhạt, biểu tượng lưới 9 chấm, và nút Dark Mode toggle.
  - **Menu Người Dùng (Hình 1):** Khi nhấn vào icon user trên header sẽ hiển thị popup card mềm mại với 3 mục chức năng mang icon tròn vàng đồng ('Đăng kí', 'Hồ sơ cá nhân', 'Đến trang Quản lý') và nút 'Đăng xuất' bo tròn viền đỏ.
  - **Nền Hero Banner (Hình 2):** Sử dụng trực tiếp `public/banner.jpg` (họa tiết lá gân xuyên sáng) làm nền cho Hero section với lớp phủ ánh sáng tự nhiên và hai nút CTA vàng đồng sang trọng.
  - **Showcase Carousel Section:** H2 + mô tả + bộ 3 thẻ ảnh cưới chất lượng cao với nút chuyển ảnh và preview modal.
  - **Masonry Gallery Section:** H2 "Tạo Album ảnh nhanh chóng" + bố cục lưới nghệ thuật 4 cột tái hiện chính xác các ảnh cưới (Dinh thự cổ điển, Studio váy bồng, Hoàng hôn ngược sáng, Tầng thượng bế cô dâu, Xe mui trần cổ điển, Cô dâu bờ biển hoàng hôn).
  - **Banner Quản Lý Album Thông Minh:** Ảnh nền cặp đôi cùng chú ngựa trong rừng thông sương mờ + Card chữ + Nút "Bắt đầu ngay" nổi bật.
- [x] Xây dựng trang Album (`/album`) chuẩn 1:1 theo thiết kế mẫu:
  - **Action điều hướng Header:** Click vào 'Album' trên Navbar điều hướng mượt mà đến `/album`, click 'Trang chủ' quay về `/`.
  - **Banner Dải Film 35mm Lệch Phải & Nền Làm Mờ:** Tái cấu trúc bố cục banner thành dạng 2 cột: Cột trái chứa thông tin tiêu đề H1 'Album', badge 35mm film, Breadcrumb 'Trang chủ > Album' và SGE hook; Cột phải đặt dải cuộn film 35mm âm bản với độ xoay thích hợp (-5°) cùng 4 khung ảnh thật có lỗ đục răng cưa và thông số cổ điển. Phía dưới toàn bộ banner được bổ sung hình nền làm mờ bokeh mềm mại và lớp chuyển sắc tạo chiều sâu điện ảnh.
  - **Thanh công cụ Lọc & Tìm kiếm:** Nút 'Bộ lọc' danh mục, cụm chuyển đổi Grid [::] / List [=], ô tìm kiếm thời gian thực Textinput.
  - **Lưới 20 Album:** Tái hiện 5 hàng x 4 cột album ảnh cưới (`Lễ cưới Thắng + Ngân`, `Lễ dạm ngõ`, `Minh & My`, `Lễ vu quy Ái Vân`) với đầy đủ ngày tạo, số lượng bình luận, và tương tác thả tim tăng số lượt thích kèm toast thông báo.
  - **Lightbox Modal:** Xem ảnh phóng to chi tiết với nút CTA 'Mở toàn bộ ảnh'.
  - **Chân trang SpintX:** Logo SpintX, địa chỉ Bình Dương, danh mục liên kết và mạng xã hội YouTube, Facebook.
  - **Tối ưu SEO SGE:** Thẻ H1, Atomic Answer Hook 40–60 từ, thẻ Head title, lazy-loading ảnh.
  - **Tầng API chuẩn request-manager:** Gọi `getAlbumListApi` qua `ApiRequestManager` với fallback mock data 20 items.
- [x] Nâng cấp dải film Banner trang Album thành **Hiệu ứng Cuộn Film Tự Động Tuần Hoàn 10 Khung Hình (Automatic Continuous 35mm Film Reel Marquee)**:
  - **10 Khung Hình Cưới Thật:** Trích xuất 10 ảnh cưới siêu nét thật từ kho ảnh (`banner_bride_shoulder.jpg`, `banner_couple_embrace.jpg`, `wedding_laughing_bride.jpg`, `gallery_beach.jpg`, `carousel_1.jpg`, `carousel_2.jpg`, `gallery_lift.jpg`, `wedding_horse_mist.jpg`, `gallery_car.jpg`, `carousel_3.jpg`).
  - **Tự Động Cuộn Liên Tục Không Cần Nhấn:** Áp dụng công nghệ CSS GPU Marquee 60fps với `@keyframes filmReelScroll` và cơ chế nhân đôi mảng 10 frames (`[...FILM_REEL_FRAMES, ...FILM_REEL_FRAMES]`) chạy tuần hoàn vô tận từ `0%` đến `-50%` một cách mượt mà, không giật, không khựng, không cần người dùng phải bấm nút hay click chuột.
  - **Dừng Thông Minh Khi Rê Chuột (Hover to Pause):** Tự động tạm dừng êm ái khi người dùng rê chuột lên dải phim để chiêm ngưỡng chi tiết hoặc nhấp vào bất kỳ bức ảnh nào để mở modal phóng to Lightbox.
  - **Chuẩn Dáng Film Âm Bản 35mm:** Mỗi khung hình được trang bị 5 lỗ đục răng cưa trên/dưới đồng bộ, thông số phim vàng đồng `PHOTOFLOW 35MM`, `SAFETY FILM`, `ISO 400`, `KODAK PORTRA 400` và mã khung `01A` đến `10A`.
  - **Bố Cục Tinh Tế & Chuyên Nghiệp:** Loại bỏ hoàn toàn badge `35MM FILM ARCHIVE • 10 FRAMES` và các đoạn văn bản thừa theo yêu cầu người dùng để cột trái cực kỳ tối giản, thanh lịch (chỉ giữ Tiêu đề H1 'Album' và Breadcrumb 'Trang chủ > Album'); giữ đoạn mô tả ở chế độ ẩn `sr-only` nhằm bảo toàn ngữ nghĩa SEO theo `/seo-sge-master`; thu gọn khoảng cách phía trên (`pt-16 sm:pt-20` và `pt-4 sm:pt-6 lg:pt-8`) giúp banner gắn kết tự nhiên dưới Navbar; dải film được kéo dịch chuyển nhẹ về phía bên phải (`lg:translate-x-8 xl:translate-x-12`) tạo bố cục thoáng đãng, sang trọng và chuẩn thiết kế; giữ góc nghiêng nhẹ tinh tế (`-rotate-1 sm:-rotate-2 lg:-rotate-[2.5deg] hover:rotate-0 transition-transform duration-700`), bóng đổ sâu cinema, lớp phủ mờ biên hai đầu tạo cảm giác cuộn phim vô tận.
  - **Hình Nền Làm Mờ Tăng Tính Nghệ Thuật (Artistic Blurred Background):** 
    - Bổ sung hình nền ảnh mờ `album_banner.jpg` phủ toàn bộ banner với hiệu ứng `blur-xl scale-105 opacity-60 dark:opacity-25` kết hợp lớp gradient chuyển sắc mềm mại, giúp bức ảnh nghệ thuật hiển thị tinh tế mà vẫn làm nổi bật tiêu đề và dải phim.
    - Bổ sung lớp ảnh cưới mờ `wedding_horse_mist.jpg` với hiệu ứng `blur-2xl opacity-40 dark:opacity-20` ngay phía sau dải cuộn film, tạo chiều sâu quang học và hiệu ứng thị giác điện ảnh cuốn hút.
- [x] Xây dựng trang Liên Hệ (`/contact` & `/lien-he`) từ mã nguồn `E:\SpintX\Source` theo chuẩn 4 skills:
  - **labsflow-cms:** Tái sử dụng 100% các atomic UI components sẵn có (`Card`, `Button`, `Textinput`, `Textarea`, `Modal`, `Icon`, `Breadcrumb`) mà không sửa đổi bất kỳ component nào trong `src/components/ui/`; hỗ trợ Dark Mode (`dark:` variants); xử lý form validation chặt chẽ bằng `react-hook-form` + `yup` + `@hookform/resolvers/yup`; thông báo `react-toastify`.
  - **request-manager:** Xây dựng `src/api/core/contactApi.js` (`submitContactInquiryApi`, `getContactOfficeInfoApi`) sử dụng `callApi` với `showOverlay: true`; re-export tại `src/api/core/index.js`; bổ sung module xử lý backend tại `server/src/modules/contact/` (`contact.service.js`, `contact.controller.js`) và đăng ký trong `server/src/app.module.js`.
  - **seo-sge-master:** Thẻ H1 duy nhất "Liên hệ", khối Atomic Answer Hook 40–60 từ tối ưu trích xuất AI Overview / SGE, Title chuẩn, Meta Description 150–160 ký tự, Schema JSON-LD Structured Data `ContactPage` + `LocalBusiness`, Breadcrumb `Trang chủ > Liên hệ`.
  - **Giao diện 2 Cột Chuyên Nghiệp:** Cột trái chứa thông tin văn phòng SPINTX, chi nhánh, hotline 24/7, email, và bản đồ định vị Google Maps tương tác; Cột phải là Form điền thông tin tư vấn với bộ chọn mã vùng quốc gia (21 quốc gia, mặc định 🇻🇳 +84), định dạng số điện thoại thời gian thực, nút gửi trạng thái loading, và Popup Modal (Trial Success Modal) xác nhận tiếp nhận kèm mã vé hỗ trợ `SPX-xxxxxx`.
  - **Điều Hướng & Routing:** Cập nhật mục "Liên hệ" trên Navbar (`Navbar.jsx`) và Footer (`Footer.jsx`, `data.js`) trỏ đến `/contact`, tự động kích hoạt trạng thái active cho cả `/contact` và `/lien-he`.
- [x] Đã build thành công `npm run build` không lỗi (code 0).

## 2. Kế hoạch tiếp theo
- Mở rộng các chức năng chỉnh sửa và chia sẻ album trực tiếp cho studio và khách hàng.
