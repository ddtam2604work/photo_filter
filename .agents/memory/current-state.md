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
- [x] Xây dựng màn hình Lọc & Chi tiết Ảnh Album (`/album/:id` - AlbumDetail) chuẩn 1:1 theo 4 hình ảnh người dùng cung cấp:
  - **Yêu cầu 1 (Trang Album sang Hình 2):** Khi nhấn vào bất kỳ ảnh/thẻ album nào trên trang `/album`, hệ thống điều hướng tức thì sang `/album/:id` hiển thị giao diện Hình 2 (Lưới ảnh tràn rộng đầy đủ, thanh bộ lọc phiên bản Ver 1 đến Ver 4+, ô tìm kiếm từ khóa, và thanh công cụ dính đáy).
  - **Yêu cầu 2 (Hình 2 sang Hình 3 & Hình 1):** Khi nhấn vào ảnh bất kỳ trong lưới (ví dụ ảnh #6 `wedding_portrait_06.jpg`), hệ thống kích hoạt mở sidebar "CHI TIẾT ẢNH" (Hình 3) ở cột bên phải, chuyển đổi sang bố cục hoàn chỉnh của Hình 1 với thumbnail, thông số kỹ thuật, khối Yêu cầu hiện tại, Lịch sử chỉnh sửa và Bình luận tương tác.
  - **Yêu cầu 3 (Cuộn trang & Sticky Sidebar Hình 4):** Khi cuộn trang xuống, sidebar "CHI TIẾT ẢNH" được ghim cố định (`position: sticky; top: 96px;`) trong khi lưới ảnh cưới (Hình 4) tiếp tục cuộn tự nhiên.
  - **Tầng API chuẩn request-manager:** Bổ sung `getAlbumDetailApi`, `updatePhotoFeedbackApi`, `addPhotoCommentApi` trong `src/api/core/albumApi.js` sử dụng `callApi`.
  - **Chuẩn SEO SGE:** Thẻ H1 duy nhất, Atomic Answer Hook 40–60 từ, ảnh có lazy loading, meta chuẩn.
- [x] Nâng cấp & Tinh chỉnh màn hình Chi tiết Album (`/album/:id` - AlbumDetail) theo 4 yêu cầu mới:
  - **Thanh nổi đáy đặc & nổi bật (Hình 1):** Nâng cấp thanh floating action bar đáy thành container đặc 100% (`bg-white dark:bg-slate-900`, `border-2 border-slate-200/90 dark:border-slate-700`, `shadow-[0_16px_45px_rgba(0,0,0,0.28)]`, `ring-1 ring-black/5 dark:ring-white/10`, `z-50`), loại bỏ hoàn toàn tính xuyên thấu để khi cuộn qua ảnh cưới không bị chìm hay lẫn màu.
  - **Nút tròn chọn ảnh kính mờ tinh tế (Frosted Glass):** Thiết kế lại nút chọn ảnh thành dạng kính mờ thanh thoát (`bg-black/40 backdrop-blur-xs`, viền trắng mảnh sắc nét `border-[1.5px] border-white/90`, icon checkmark trắng có đổ bóng nhẹ); loại bỏ hoàn toàn cảm giác thô, dày cộp như miếng dán nhựa trước đó. Khi được chọn chuyển sang nền vàng đồng `#b38840` viền trắng và phát sáng, vừa đảm bảo tính nhận diện cao vừa giữ trọn vẻ đẹp nghệ thuật của bức ảnh cưới.
  - **Bổ sung các trường chi tiết Cột Phải (Hình 3):**
    - Nút `[::] Ảnh Liên Quan` ở header với icon dạng lưới 4 ô.
    - Card `YÊU CẦU CHỈNH SỬA ẢNH` với icon chỉnh sửa, nút tròn `(+)` màu vàng đồng, khung hiển thị thumbnail, `Version X` và badge trạng thái `Đang chờ xử lý`.
    - Card `BÌNH LUẬN` với icon hội thoại, badge đếm số lượng, trạng thái rỗng "Chưa có bình luận nào cho ảnh này.", `textarea` nhập bình luận và nút `Gửi`.
  - **Bộ lọc phiên bản mới:** Đổi tab `Ver 4+` thành `Ver 4 (5)`, đồng thời bổ sung thêm tab `Ver 5+ (2)` và cập nhật bộ lọc `filteredPhotos` tương ứng.
- [x] Nâng cấp & Hoán đổi Banner theo yêu cầu người dùng:
  - **Trang Danh Sách Album (`/album` - Album.jsx):** Khôi phục nguyên vẹn **Banner Dải Cuộn Phim Âm Bản 35mm Tuần Hoàn (35mm Film Reel Marquee Loop)** 10 khung hình cưới thật chạy liên tục 60fps kèm hiệu ứng dừng khi rê chuột, nền làm mờ bokeh và thông số Kodak Portra cổ điển.
- [x] Tinh chỉnh Banner Chi Tiết Album (`/album/:id` - AlbumDetail.jsx) theo yêu cầu:
  - **Bỏ nội dung trong 3 hình:**
    - Loại bỏ khối tiêu đề (pill `• Bộ Sưu Tập Ảnh Cưới Chọn Lọc`, tiêu đề lớn `Lễ Cưới Thắng & Ngân`, đoạn mô tả) ở giao diện trực quan, đồng thời duy trì thẻ `<h1 className="sr-only">` và đoạn mô tả ẩn cho screen readers & Google AI SGE theo chuẩn SEO.
    - Loại bỏ cụm 3 badge tính năng (`120 Ảnh Đẹp`, `4K Ultra-HD`, `Ver 1 – Ver 5+`).
    - Loại bỏ huy hiệu tròn nổi `120 TỔNG ẢNH 4K ULTRA-HD`.
  - **Áp dụng nền hình học vát chéo ấm cúng (Warm Geometric Backdrop) & Dịch phải cụm lục giác:**
    - Khôi phục cấu trúc hình nền hình học vát chéo nghệ thuật ("giống khi nãy"): đa giác cắt chéo `polygon(0 0, 100% 0, 75% 100%, 0% 100%)`, đường chỉ vát chéo sắc nét, lưới dot-matrix và đốm sáng cinema ambient.
    - Áp dụng hệ màu sắc ấm đồng điệu trang chủ ("màu sắc giống hiện tại"): tone kem cát - champagne ấm áp `#FAF8F5` đến `#EAE0CF` (Light mode) và slate sâu kết hợp vệt vàng kim (Dark mode), không dùng lặp lại ảnh `banner.jpg`.
    - Dịch chuyển cụm 7 khung hình lục giác sang phía bên phải một tí (`lg:translate-x-16 xl:translate-x-24`), tạo bố cục hài hòa, cân đối với Breadcrumb bên trái.
  - **Bảo toàn dải cuộn phim 35mm ở `/album`:** Trang danh sách album `/album` vẫn giữ nguyên 100% dải cuộn phim 35mm tuần hoàn.
  - **Kiểm thử & Build:** Build `npm run build` thành công code 0, kiểm thử trực quan bằng Browser Subagent xác nhận Light Mode, Dark Mode và các hiệu ứng tương tác hoàn hảo.
- [x] Tích hợp Hiệu Ứng Hạt Phát Sáng (Particle Effect & Cinema Grain) cho tất cả các Banner khi ở Chế độ Tối (Dark Mode):
  - Xây dựng component `ParticlesEffect.jsx` tại `src/components/ui/` tích hợp Canvas 60fps vẽ các hạt bụi vàng kim lơ lửng, nhấp nháy êm ái cùng lớp phủ film grain nhiễu vi mô điện ảnh.
  - Tích hợp đồng bộ vào tất cả các Banner: Hero Banner Trang Chủ (`Home.jsx`), Banner Quản lý Album (`Home.jsx`), Banner Dải cuộn phim 35mm (`Album.jsx`), Banner Cụm ảnh lục giác tổ ong (`AlbumDetail.jsx`).
  - Tự động kích hoạt khi chuyển sang Dark Mode và ẩn hoàn toàn khi ở Light Mode để bảo toàn hiệu năng.
  - Kiểm thử trực quan trên toàn bộ các trang với kết quả hiển thị mượt mà, tinh tế và sang trọng.

- [x] Nâng cấp Bố Cục Banner Chi Tiết Album (`/album/:id` - AlbumDetail.jsx) thành 2 Cột Cân Đối:
  - **Cột Phải:** Đưa toàn bộ cụm 7 khung hình lục giác tổ ong sang bên phải (`lg:col-span-7 flex justify-end`), căn lề chuẩn xác, giữ nguyên các hiệu ứng tương tác hover phóng to, lớp phủ thông tin và điều hướng mở chi tiết ảnh.
  - **Cột Trái:** Bổ sung khối thông điệp & slogan sang trọng thể hiện sự **chuyên nghiệp & tận tâm**:
    - Eyebrow pill: `• TẬN TÂM TRONG TỪNG KHOẢNH KHẮC` với điểm nháy animation pulse màu vàng đồng.
    - Slogan chính nghệ thuật: *"Tận tâm trong từng khung hình, hoàn mỹ từng câu chuyện tình yêu."* với vệt chuyển sắc vàng champagne kim loại.
    - Đoạn mô tả giàu cảm xúc về giá trị kỷ vật tình yêu và sự tỉ mỉ trong từng đường nét hậu kỳ.
    - Bộ 3 thẻ cam kết uy tín (Trust Badges): `Hậu kỳ sắc nét 4K Ultra-HD`, `Lắng nghe & chỉnh sửa tận tâm 1:1`, `Lưu trữ & bảo toàn trọn đời`.
  - **Xóa khoảng trắng phía sau Header:** Loại bỏ `pt-20 sm:pt-24` trên thẻ `<main>` và chuyển thành `pt-24 sm:pt-28 lg:pt-[118px]` trực tiếp trên `<section>` banner. Nhờ đó, nền gradient và họa tiết hình học của banner tràn lên tận đỉnh màn hình (`y = 0`) phía sau Header nổi, loại bỏ 100% vệt trắng mà không làm thay đổi bất kỳ khoảng cách hay bố cục nào của breadcrumb, slogan và cụm ảnh.

- [x] Tinh Chỉnh Banner Album, Nút `<>` Dải Film 35mm & Icon Mở Rộng Thẻ Ảnh:
  - **Hình nền Banner trang Album (`/album` - Album.jsx):** Tinh chỉnh độ mờ từ `blur-xl` xuống `blur-[7px]` kết hợp điều chỉnh độ trong suốt và gradient overlay, giúp hình ảnh cô dâu chú rể và khung cảnh rừng thông trong bức ảnh nền nhận diện rõ ràng hơn ("rõ hơn 1 tí") nhưng vẫn giữ được độ mờ ảo, mềm mịn điện ảnh ("vẫn mờ").
  - **Dải cuộn film 35mm với 2 nút `<` và `>`:**
    - Bổ sung 2 nút điều hướng `<` và `>` phong cách vintage Kodak cinema nổi bật tại 2 biên trái và phải của dải film với nền kính mờ đen bóng, viền và icon vàng kim `border-amber-400/80 text-amber-400 hover:bg-amber-400 hover:text-slate-950`.
    - Chuyển đổi sang cơ chế điều khiển GPU `translate3d` 60fps kết hợp CSS transition gia tốc mượt mà: bấm nút `>` trượt tới 1 khung hình (~218px), bấm nút `<` trượt lùi 1 khung hình, tạm dừng 4 giây để người dùng chiêm ngưỡng trước khi nhẹ nhàng tiếp tục cuộn tuần hoàn.
    - Bổ sung Lightbox Modal khi nhấn vào khung film hoặc nút "Xem ảnh", hỗ trợ xem kích thước lớn, thông số film cổ điển, nút duyệt qua lại `<` và `>` và nút mở chi tiết album.
  - **Icon mở rộng ảnh ở góc dưới bên trái thẻ ảnh (`/album/:id` - AlbumDetail.jsx):**
    - Bổ sung nút icon chuẩn 1:1 theo **Hình 2** (2 mũi tên chéo góc ngược chiều ↗ ↙) vào góc dưới bên trái (`absolute bottom-3 left-3 z-20`) của tất cả các thẻ ảnh trong chế độ Lưới (Grid) và Danh sách (List).
    - Thiết kế nút dạng hình vuông bo góc `rounded-lg` kính mờ `bg-black/40 hover:bg-black/75 backdrop-blur-xs border-[1.5px] border-white/90 text-white hover:scale-110`, cân đối hoàn hảo với nút tròn checkmark ở góc dưới bên phải.
    - Nhấn vào icon sẽ kích hoạt Lightbox Modal phóng to ảnh 4K độ nét cao, hiển thị đầy đủ tên file, version, trạng thái, kích thước pixel, dung lượng file, nút duyệt ảnh trước/sau `<` `>` và các thao tác chọn ảnh / yêu cầu chỉnh sửa.

## 2. Kế hoạch tiếp theo
- Mở rộng các tính năng chỉnh sửa chuyên sâu và export album cho studio.



