import React, { useState } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import Modal from "@/components/ui/Modal";
import Navbar from "@/components/partials/header/Navbar";
import Footer from "@/components/partials/footer/Footer";

const Home = () => {
  // Carousel state
  const [activeSlide, setActiveSlide] = useState(0);

  // Selected image modal for preview
  const [selectedImage, setSelectedImage] = useState(null);

  const carouselImages = [
    {
      id: 1,
      src: "/images/carousel_1.jpg",
      alt: "Cô dâu chú rể tươi cười hạnh phúc tại studio phong cách Hàn Quốc",
      title: "Khoảnh khắc tự nhiên",
    },
    {
      id: 2,
      src: "/images/carousel_2.jpg",
      alt: "Chú rể tạo dáng hình trái tim ngọt ngào cùng cô dâu",
      title: "Gắn kết yêu thương",
    },
    {
      id: 3,
      src: "/images/carousel_3.jpg",
      alt: "Cô dâu chú rể rạng ngời trong trang phục cưới trắng tinh khôi",
      title: "Thanh lịch & Sang trọng",
    },
  ];

  const handlePrev = () => {
    setActiveSlide((prev) => (prev === 0 ? carouselImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveSlide((prev) => (prev === carouselImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] dark:bg-slate-900 transition-colors duration-200">
      {/* Header / Navbar */}
      <Navbar />

      <main className="flex-grow">
        {/* ========================================================================= */}
        {/* SECTION 1: HERO SECTION */}
        {/* ========================================================================= */}
        <section
          id="hero"
          className="relative overflow-hidden pt-16 pb-24 md:pt-24 md:pb-32 text-center bg-[#FAF8F5] dark:bg-slate-900 transition-colors"
        >
          {/* Background Image: banner.jpg matching Hình 2 */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none opacity-90 dark:opacity-20 transition-opacity duration-300"
            style={{ backgroundImage: "url('/banner.jpg')" }}
          />
          {/* Soft ambient overlay for contrast and luxury warmth */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F5]/30 via-[#FAF8F5]/20 to-[#FAF8F5]/90 dark:from-slate-900/60 dark:via-slate-900/40 dark:to-slate-900/90 pointer-events-none" />

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            {/* Primary SEO Heading (H1) matching Hình 2 */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold tracking-tight text-slate-900 dark:text-white font-heading leading-[1.25]">
              Nền tảng giao ảnh trực tuyến dành cho Photographer &amp; Studio
            </h1>

            {/* SGE Atomic Answer Hook (40-60 words directly answering intent) */}
            <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              Quản lý không giới hạn album, tải ảnh tốc độ cao, chia sẻ bằng liên kết bảo mật và cho phép khách hàng xem, yêu thích, lựa chọn và tải ảnh mọi lúc trên mọi thiết bị.
            </p>

            {/* CTA Buttons matching Hình 2 */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4 sm:gap-5">
              {/* Left Button: Xem hướng dẫn with Play Icon */}
              <Button
                className="!bg-[#a67c37] hover:!bg-[#916a2d] active:!bg-[#7a5722] !text-white !rounded-xl sm:!rounded-2xl px-6 py-3.5 text-base font-semibold shadow-sm hover:shadow-md transition-all duration-200"
                onClick={() => {
                  const workflowElem = document.getElementById("workflow");
                  workflowElem?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <span className="flex items-center gap-2.5">
                  <span>Xem hướng dẫn</span>
                  <svg className="w-4 h-4 fill-current translate-y-[0.5px]" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </Button>

              {/* Right Button: Đăng kí with Arrow Right */}
              <Button
                className="!bg-[#a67c37] hover:!bg-[#916a2d] active:!bg-[#7a5722] !text-white !rounded-xl sm:!rounded-2xl px-7 py-3.5 text-base font-semibold shadow-sm hover:shadow-md transition-all duration-200"
                icon="arrow-right"
                iconPosition="right"
                text="Đăng kí"
                onClick={() => {
                  const bannerElem = document.getElementById("banner");
                  bannerElem?.scrollIntoView({ behavior: "smooth" });
                }}
              />
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 2: SHOWCASE / CAROUSEL SECTION */}
        {/* ========================================================================= */}
        <section id="workflow" className="py-16 md:py-24 bg-white dark:bg-slate-900/60 transition-colors">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 dark:text-white font-heading">
                Từ buổi chụp đến tay khách hàng – Chỉ trong vài cú nhấp
              </h2>
              <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
                Đăng tải ảnh với tốc độ cao, phân loại theo album, chia sẻ bằng một đường dẫn duy nhất và giúp khách hàng xem ảnh ở bất cứ đâu trên điện thoại, máy tính hoặc máy tính bảng.
              </p>
            </div>

            {/* Carousel Container with Left/Right Arrows */}
            <div className="relative flex items-center justify-center gap-4 sm:gap-6">
              {/* Left Arrow Button */}
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Ảnh trước"
                className="z-10 w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-800/90 hover:bg-white dark:hover:bg-slate-800 text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white shadow-sm flex items-center justify-center transition-all duration-150 active:scale-95 flex-shrink-0"
              >
                <Icon icon="chevron-left" size={22} />
              </button>

              {/* 3 Featured Portrait Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl">
                {carouselImages.map((item, index) => (
                  <div
                    key={item.id}
                    className="cursor-pointer group"
                    onClick={() => setSelectedImage(item)}
                  >
                    <Card
                      noborder
                      hoverable
                      shadow
                      className="overflow-hidden rounded-2xl bg-white dark:bg-slate-800 transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-xl"
                      bodyClass="!p-0"
                    >
                      <div className="relative aspect-[3/4] overflow-hidden bg-slate-100 dark:bg-slate-800">
                        <img
                          src={item.src}
                          alt={item.alt}
                          loading="lazy"
                          width={600}
                          height={800}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                          <p className="text-white text-sm font-medium">
                            {item.title}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>

              {/* Right Arrow Button */}
              <button
                type="button"
                onClick={handleNext}
                aria-label="Ảnh kế tiếp"
                className="z-10 w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-800/90 hover:bg-white dark:hover:bg-slate-800 text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white shadow-sm flex items-center justify-center transition-all duration-150 active:scale-95 flex-shrink-0"
              >
                <Icon icon="chevron-right" size={22} />
              </button>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 3: MASONRY EDITORIAL GALLERY */}
        {/* ========================================================================= */}
        <section id="albums" className="py-16 md:py-24 bg-[#FAF8F5] dark:bg-slate-900 transition-colors">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center space-y-1 mb-14">
              <span className="text-xs sm:text-sm font-semibold tracking-wider text-slate-500 dark:text-slate-400 uppercase">
                Chia sẻ ảnh dễ dàng
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 dark:text-white font-heading">
                Tạo Album ảnh nhanh chóng
              </h2>
            </div>

            {/* Editorial Masonry Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 items-stretch">
              {/* Column 1: Colonial Building (Top) + Ballgown Studio (Bottom) */}
              <div className="flex flex-col gap-4 md:gap-5">
                {/* Top Image: Colonial Grand Hall */}
                <div
                  onClick={() =>
                    setSelectedImage({
                      src: "/images/gallery_building.jpg",
                      alt: "Cô dâu chú rể chụp ảnh trước tòa dinh thự vàng cổ điển",
                      title: "Kiến trúc cổ điển",
                    })
                  }
                  className="relative group overflow-hidden rounded-2xl bg-slate-200 dark:bg-slate-800 aspect-[4/3] cursor-pointer shadow-sm hover:shadow-lg transition-all"
                >
                  <img
                    src="/images/gallery_building.jpg"
                    alt="Cô dâu chú rể chụp ảnh trước tòa dinh thự vàng cổ điển"
                    loading="lazy"
                    width={800}
                    height={600}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Bottom Image: Studio Ballgown */}
                <div
                  onClick={() =>
                    setSelectedImage({
                      src: "/images/gallery_studio.jpg",
                      alt: "Ảnh cưới studio cô dâu diện váy xòe bồng công chúa",
                      title: "Studio phong cách Hàn Quốc",
                    })
                  }
                  className="relative group overflow-hidden rounded-2xl bg-slate-200 dark:bg-slate-800 aspect-square cursor-pointer shadow-sm hover:shadow-lg transition-all flex-grow"
                >
                  <img
                    src="/images/gallery_studio.jpg"
                    alt="Ảnh cưới studio cô dâu diện váy xòe bồng công chúa"
                    loading="lazy"
                    width={800}
                    height={800}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>

              {/* Column 2: Large Center Sunset Silhouette */}
              <div
                onClick={() =>
                  setSelectedImage({
                    src: "/images/gallery_center.jpg",
                    alt: "Cặp đôi ngược sáng hoàng hôn tung cánh hoa lãng mạn",
                    title: "Hoàng hôn lãng mạn",
                  })
                }
                className="relative group overflow-hidden rounded-2xl bg-slate-200 dark:bg-slate-800 min-h-[380px] md:min-h-[520px] cursor-pointer shadow-sm hover:shadow-lg transition-all"
              >
                <img
                  src="/images/gallery_center.jpg"
                  alt="Cặp đôi ngược sáng hoàng hôn tung cánh hoa lãng mạn"
                  loading="lazy"
                  width={800}
                  height={1060}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Column 3: Rooftop Lift (Top) + Convertible Car (Bottom) */}
              <div className="flex flex-col gap-4 md:gap-5">
                {/* Top Image: Rooftop Lift Pose */}
                <div
                  onClick={() =>
                    setSelectedImage({
                      src: "/images/gallery_lift.jpg",
                      alt: "Chú rể bế cô dâu trên tầng thượng lúc hoàng hôn thành phố",
                      title: "Tầng thượng hoàng hôn",
                    })
                  }
                  className="relative group overflow-hidden rounded-2xl bg-slate-200 dark:bg-slate-800 aspect-[4/3] cursor-pointer shadow-sm hover:shadow-lg transition-all"
                >
                  <img
                    src="/images/gallery_lift.jpg"
                    alt="Chú rể bế cô dâu trên tầng thượng lúc hoàng hôn thành phố"
                    loading="lazy"
                    width={800}
                    height={600}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Bottom Image: Vintage Convertible Car */}
                <div
                  onClick={() =>
                    setSelectedImage({
                      src: "/images/gallery_car.jpg",
                      alt: "Cặp đôi phong cách thời trang đeo kính râm trên xe mui trần cổ điển",
                      title: "Phong cách mui trần Retro",
                    })
                  }
                  className="relative group overflow-hidden rounded-2xl bg-slate-200 dark:bg-slate-800 aspect-[4/3] cursor-pointer shadow-sm hover:shadow-lg transition-all flex-grow"
                >
                  <img
                    src="/images/gallery_car.jpg"
                    alt="Cặp đôi phong cách thời trang đeo kính râm trên xe mui trần cổ điển"
                    loading="lazy"
                    width={800}
                    height={600}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>

              {/* Column 4: Panoramic Vertical Beach Sunset Bride */}
              <div
                onClick={() =>
                  setSelectedImage({
                    src: "/images/gallery_beach.jpg",
                    alt: "Cô dâu giơ cao hoa cưới trên bờ biển sóng vỗ lúc hoàng hôn",
                    title: "Bình minh & Hoàng hôn biển",
                  })
                }
                className="relative group overflow-hidden rounded-2xl bg-slate-200 dark:bg-slate-800 min-h-[380px] md:min-h-[520px] cursor-pointer shadow-sm hover:shadow-lg transition-all"
              >
                <img
                  src="/images/gallery_beach.jpg"
                  alt="Cô dâu giơ cao hoa cưới trên bờ biển sóng vỗ lúc hoàng hôn"
                  loading="lazy"
                  width={800}
                  height={1400}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 4: SMART ALBUM MANAGEMENT BANNER */}
        {/* ========================================================================= */}
        <section id="banner" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="relative rounded-3xl overflow-hidden min-h-[440px] md:min-h-[500px] flex items-center justify-center p-8 sm:p-12 md:p-16 shadow-2xl">
              {/* Background Photo: Couple with Horse in Misty Forest */}
              <div className="absolute inset-0 z-0">
                <img
                  src="/images/wedding_horse_mist.jpg"
                  alt="Cặp đôi chụp ảnh cưới trong rừng thông sương mờ bên chú ngựa nâu quý phái"
                  loading="lazy"
                  width={1600}
                  height={900}
                  className="w-full h-full object-cover object-center filter brightness-[0.78] contrast-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/30" />
              </div>

              {/* Foreground Center Card */}
              <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6 text-white">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-bold font-heading tracking-tight leading-snug drop-shadow-md">
                  Quản lý album ảnh cưới thông minh
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-slate-100 leading-relaxed max-w-2xl mx-auto font-normal drop-shadow">
                  Tạo album riêng cho từng cặp đôi, cho phép khách hàng xem trước, đánh dấu ảnh yêu thích, lựa chọn ảnh cần chỉnh sửa và tải ảnh sau khi hoàn tất. Tất cả được quản lý trên một nền tảng duy nhất.
                </p>

                <div className="pt-3">
                  <Button
                    className="!bg-[#FAF8F5] hover:!bg-white active:!bg-slate-100 !text-[#a67c37] !rounded-full px-8 py-3.5 text-base font-bold shadow-xl hover:shadow-2xl transition-all duration-200 transform hover:scale-105 inline-flex items-center gap-2"
                    icon="arrow-right"
                    iconPosition="right"
                    text="Bắt đầu ngay"
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* Lightbox / Image Preview Modal using UI Modal Component */}
      {selectedImage && (
        <Modal
          activeModal={Boolean(selectedImage)}
          onClose={() => setSelectedImage(null)}
          title={selectedImage?.title || "Xem ảnh phóng to"}
          className="max-w-4xl !p-0"
        >
          <div className="p-2 sm:p-4 flex flex-col items-center">
            <img
              src={selectedImage?.src}
              alt={selectedImage?.alt}
              className="max-h-[75vh] w-auto rounded-xl object-contain shadow"
            />
            <p className="mt-3 text-xs sm:text-sm text-slate-500 dark:text-slate-400 text-center">
              {selectedImage?.alt}
            </p>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Home;
