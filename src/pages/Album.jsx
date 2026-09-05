import React, { useState, useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/partials/header/Navbar";
import Footer from "@/components/partials/footer/Footer";
import Card from "@/components/ui/Card";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Textinput from "@/components/ui/Textinput";
import Icon from "@/components/ui/Icon";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import ParticlesEffect from "@/components/ui/ParticlesEffect";
import { toast } from "react-toastify";
import { getAlbumListApi } from "@/api/core/albumApi";

// Dữ liệu 20 album chuẩn tái hiện chính xác 1:1 theo ảnh mẫu
const INITIAL_ALBUMS = [
  // Hàng 1
  {
    id: 1,
    title: "Lễ cưới Thắng + Ngân",
    createdDate: "17/07/2025",
    coverImage: "/images/carousel_1.jpg",
    likes: 0,
    comments: 0,
    category: "Lễ cưới",
    isLiked: false,
  },
  {
    id: 2,
    title: "Lễ cưới Thắng + Ngân",
    createdDate: "17/07/2025",
    coverImage: "/images/carousel_3.jpg",
    likes: 0,
    comments: 0,
    category: "Lễ cưới",
    isLiked: false,
  },
  {
    id: 3,
    title: "Lễ dạm ngõ",
    createdDate: "17/07/2025",
    coverImage: "/images/gallery_beach.jpg",
    likes: 0,
    comments: 0,
    category: "Lễ dạm ngõ",
    isLiked: false,
  },
  {
    id: 4,
    title: "Minh & My",
    createdDate: "17/07/2025",
    coverImage: "/images/carousel_2.jpg",
    likes: 0,
    comments: 0,
    category: "Pre-wedding",
    isLiked: false,
  },

  // Hàng 2
  {
    id: 5,
    title: "Lễ vu quy Ái Vân",
    createdDate: "17/07/2025",
    coverImage: "/images/wedding_laughing_bride.jpg",
    likes: 0,
    comments: 0,
    category: "Lễ vu quy",
    isLiked: false,
  },
  {
    id: 6,
    title: "Lễ cưới Thắng + Ngân",
    createdDate: "17/07/2025",
    coverImage: "/images/carousel_3.jpg",
    likes: 0,
    comments: 0,
    category: "Lễ cưới",
    isLiked: false,
  },
  {
    id: 7,
    title: "Lễ dạm ngõ",
    createdDate: "17/07/2025",
    coverImage: "/images/gallery_beach.jpg",
    likes: 0,
    comments: 0,
    category: "Lễ dạm ngõ",
    isLiked: false,
  },
  {
    id: 8,
    title: "Minh & My",
    createdDate: "17/07/2025",
    coverImage: "/images/carousel_2.jpg",
    likes: 0,
    comments: 0,
    category: "Pre-wedding",
    isLiked: false,
  },

  // Hàng 3
  {
    id: 9,
    title: "Lễ cưới Thắng + Ngân",
    createdDate: "17/07/2025",
    coverImage: "/images/wedding_laughing_bride.jpg",
    likes: 0,
    comments: 0,
    category: "Lễ cưới",
    isLiked: false,
  },
  {
    id: 10,
    title: "Lễ cưới Thắng + Ngân",
    createdDate: "17/07/2025",
    coverImage: "/images/carousel_3.jpg",
    likes: 0,
    comments: 0,
    category: "Lễ cưới",
    isLiked: false,
  },
  {
    id: 11,
    title: "Lễ dạm ngõ",
    createdDate: "17/07/2025",
    coverImage: "/images/gallery_beach.jpg",
    likes: 0,
    comments: 0,
    category: "Lễ dạm ngõ",
    isLiked: false,
  },
  {
    id: 12,
    title: "Minh & My",
    createdDate: "17/07/2025",
    coverImage: "/images/carousel_2.jpg",
    likes: 0,
    comments: 0,
    category: "Pre-wedding",
    isLiked: false,
  },

  // Hàng 4
  {
    id: 13,
    title: "Lễ cưới Thắng + Ngân",
    createdDate: "17/07/2025",
    coverImage: "/images/wedding_laughing_bride.jpg",
    likes: 0,
    comments: 0,
    category: "Lễ cưới",
    isLiked: false,
  },
  {
    id: 14,
    title: "Lễ cưới Thắng + Ngân",
    createdDate: "17/07/2025",
    coverImage: "/images/carousel_3.jpg",
    likes: 0,
    comments: 0,
    category: "Lễ cưới",
    isLiked: false,
  },
  {
    id: 15,
    title: "Lễ dạm ngõ",
    createdDate: "17/07/2025",
    coverImage: "/images/gallery_beach.jpg",
    likes: 0,
    comments: 0,
    category: "Lễ dạm ngõ",
    isLiked: false,
  },
  {
    id: 16,
    title: "Minh & My",
    createdDate: "17/07/2025",
    coverImage: "/images/carousel_2.jpg",
    likes: 0,
    comments: 0,
    category: "Pre-wedding",
    isLiked: false,
  },

  // Hàng 5
  {
    id: 17,
    title: "Lễ cưới Thắng + Ngân",
    createdDate: "17/07/2025",
    coverImage: "/images/wedding_laughing_bride.jpg",
    likes: 0,
    comments: 0,
    category: "Lễ cưới",
    isLiked: false,
  },
  {
    id: 18,
    title: "Lễ cưới Thắng + Ngân",
    createdDate: "17/07/2025",
    coverImage: "/images/carousel_3.jpg",
    likes: 0,
    comments: 0,
    category: "Lễ cưới",
    isLiked: false,
  },
  {
    id: 19,
    title: "Lễ dạm ngõ",
    createdDate: "17/07/2025",
    coverImage: "/images/gallery_beach.jpg",
    likes: 0,
    comments: 0,
    category: "Lễ dạm ngõ",
    isLiked: false,
  },
  {
    id: 20,
    title: "Minh & My",
    createdDate: "17/07/2025",
    coverImage: "/images/carousel_2.jpg",
    likes: 0,
    comments: 0,
    category: "Pre-wedding",
    isLiked: false,
  },
];

// Dữ liệu 10 khung hình film âm bản chuẩn 35mm cho hiệu ứng cuộn phim (Film Reel)
const FILM_REEL_FRAMES = [
  {
    id: "film-frame-1",
    title: "Khoảnh khắc kiêu sa & Voan cưới bay",
    coverImage: "/images/banner_bride_shoulder.jpg",
    createdDate: "17/07/2025",
    category: "Cô dâu",
    frameCode: "01A",
    frameNum: "01",
    subtext: "Cô dâu kiêu sa",
  },
  {
    id: "film-frame-2",
    title: "Tình yêu giữa đồi thông xanh",
    coverImage: "/images/banner_couple_embrace.jpg",
    createdDate: "17/07/2025",
    category: "Cặp đôi",
    frameCode: "02A",
    frameNum: "02",
    subtext: "Đồi thông ngát xanh",
  },
  {
    id: "film-frame-3",
    title: "Nụ cười rạng ngời ngày hạnh phúc",
    coverImage: "/images/wedding_laughing_bride.jpg",
    createdDate: "17/07/2025",
    category: "Lễ vu quy",
    frameCode: "03A",
    frameNum: "03",
    subtext: "Nụ cười vu quy",
  },
  {
    id: "film-frame-4",
    title: "Hoàng hôn lãng mạn bên bờ biển",
    coverImage: "/images/gallery_beach.jpg",
    createdDate: "17/07/2025",
    category: "Pre-wedding",
    frameCode: "04A",
    frameNum: "04",
    subtext: "Hoàng hôn biển chiều",
  },
  {
    id: "film-frame-5",
    title: "Thanh lịch & Chú rể vest trắng",
    coverImage: "/images/carousel_1.jpg",
    createdDate: "17/07/2025",
    category: "Studio",
    frameCode: "05A",
    frameNum: "05",
    subtext: "Studio tinh tế",
  },
  {
    id: "film-frame-6",
    title: "Dáng hình ngọt ngào bên nhau",
    coverImage: "/images/carousel_2.jpg",
    createdDate: "17/07/2025",
    category: "Pre-wedding",
    frameCode: "06A",
    frameNum: "06",
    subtext: "Cặp đôi ngọt ngào",
  },
  {
    id: "film-frame-7",
    title: "Hoàng hôn lộng gió trên tầng thượng",
    coverImage: "/images/gallery_lift.jpg",
    createdDate: "17/07/2025",
    category: "Ngoại cảnh",
    frameCode: "07A",
    frameNum: "07",
    subtext: "Rooftop lãng mạn",
  },
  {
    id: "film-frame-8",
    title: "Cổ tích rừng thông sương mờ",
    coverImage: "/images/wedding_horse_mist.jpg",
    createdDate: "17/07/2025",
    category: "Ngoại cảnh",
    frameCode: "08A",
    frameNum: "08",
    subtext: "Rừng sương cổ tích",
  },
  {
    id: "film-frame-9",
    title: "Phong cách Vintage bên xe mui trần",
    coverImage: "/images/gallery_car.jpg",
    createdDate: "17/07/2025",
    category: "Pre-wedding",
    frameCode: "09A",
    frameNum: "09",
    subtext: "Xe cổ điển Retro",
  },
  {
    id: "film-frame-10",
    title: "Chân dung tối giản & sang trọng",
    coverImage: "/images/carousel_3.jpg",
    createdDate: "17/07/2025",
    category: "Studio",
    frameCode: "10A",
    frameNum: "10",
    subtext: "Minimalist Portrait",
  },
];

// Nhân bản 2 bộ để tạo vòng lặp cuộn film liên tục vô tận không giật (Seamless Infinite Marquee Loop)
const INFINITE_FILM_FRAMES = [...FILM_REEL_FRAMES, ...FILM_REEL_FRAMES];

// Dữ liệu 7 khung hình lục giác tổ ong (Hexagonal Honeycomb) cho Banner theo thiết kế mẫu
const HONEYCOMB_ITEMS = [
  // 0. Lục giác lớn chủ đạo bên trái (Main Featured Hexagon)
  {
    id: "hex-main",
    title: "Khoảnh khắc kiêu sa",
    subtitle: "Dinh thự cổ điển",
    image: "/images/wedding_portrait_06.jpg",
    category: "Lễ cưới",
    isMain: true,
  },
  // 1. Hàng trên - giữa
  {
    id: "hex-1",
    title: "Hồ xanh & Nắng chiều",
    subtitle: "Ngoại cảnh ven hồ",
    image: "/images/wedding_portrait_08.jpg",
    category: "Pre-wedding",
  },
  // 2. Hàng trên - phải
  {
    id: "hex-2",
    title: "Bờ biển hoàng hôn",
    subtitle: "Hoàng hôn lãng mạn",
    image: "/images/gallery_beach.jpg",
    category: "Ngoại cảnh",
  },
  // 3. Hàng giữa - tâm
  {
    id: "hex-3",
    title: "Nụ cười rạng rỡ",
    subtitle: "Hạnh phúc ngập tràn",
    image: "/images/wedding_laughing_bride.jpg",
    category: "Lễ vu quy",
  },
  // 4. Hàng giữa - phải
  {
    id: "hex-4",
    title: "Xe mui trần cổ điển",
    subtitle: "Retro Vintage",
    image: "/images/gallery_car.jpg",
    category: "Pre-wedding",
  },
  // 5. Hàng dưới - giữa
  {
    id: "hex-5",
    title: "Nghi lễ gia tiên",
    subtitle: "Áo dài truyền thống",
    image: "/images/wedding_portrait_01.jpg",
    category: "Lễ vu quy",
  },
  // 6. Hàng dưới - phải
  {
    id: "hex-6",
    title: "Đồi thông sương mờ",
    subtitle: "Đà Lạt thơ mộng",
    image: "/images/wedding_horse_mist.jpg",
    category: "Ngoại cảnh",
  },
];

// Cấu hình tỷ lệ & tọa độ chuẩn toán học cho cụm lục giác tổ ong
const HEXAGON_CONFIGS = [
  // 0. Main Hexagon (Large, Left)
  {
    index: 0,
    style: {
      left: "1%",
      top: "14%",
      width: "38%",
      height: "72%",
      zIndex: 15,
    },
    borderClass: "p-1.5 sm:p-2.5",
  },
  // 1. Top - Mid
  {
    index: 1,
    style: {
      left: "38.5%",
      top: "2.5%",
      width: "21.5%",
      height: "38%",
      zIndex: 12,
    },
    borderClass: "p-1 sm:p-1.5",
  },
  // 2. Top - Right
  {
    index: 2,
    style: {
      left: "60.5%",
      top: "2.5%",
      width: "21.5%",
      height: "38%",
      zIndex: 12,
    },
    borderClass: "p-1 sm:p-1.5",
  },
  // 3. Mid - Center
  {
    index: 3,
    style: {
      left: "49.5%",
      top: "31%",
      width: "21.5%",
      height: "38%",
      zIndex: 14,
    },
    borderClass: "p-1 sm:p-1.5",
  },
  // 4. Mid - Right
  {
    index: 4,
    style: {
      left: "71.5%",
      top: "31%",
      width: "21.5%",
      height: "38%",
      zIndex: 14,
    },
    borderClass: "p-1 sm:p-1.5",
  },
  // 5. Bottom - Mid
  {
    index: 5,
    style: {
      left: "38.5%",
      top: "59.5%",
      width: "21.5%",
      height: "38%",
      zIndex: 12,
    },
    borderClass: "p-1 sm:p-1.5",
  },
  // 6. Bottom - Right
  {
    index: 6,
    style: {
      left: "60.5%",
      top: "59.5%",
      width: "21.5%",
      height: "38%",
      zIndex: 12,
    },
    borderClass: "p-1 sm:p-1.5",
  },
];

const Album = () => {
  const navigate = useNavigate();
  const [albums, setAlbums] = useState(INITIAL_ALBUMS);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' | 'list'
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [selectedFilmFrame, setSelectedFilmFrame] = useState(null);
  const [filterCategory, setFilterCategory] = useState("all");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  // Tham chiếu & trạng thái điều khiển dải film 35mm
  const filmTrackRef = useRef(null);
  const filmOffsetRef = useRef(0);
  const isFilmPausedRef = useRef(false);
  const isFilmTransitioningRef = useRef(false);
  const filmResumeTimerRef = useRef(null);

  // Hiệu ứng cuộn dải film tự động 60fps và điều khiển tiến/lùi <>
  useEffect(() => {
    let animId;
    let lastTime = performance.now();

    const step = (time) => {
      const dt = Math.min(time - lastTime, 50);
      lastTime = time;

      if (
        !isFilmPausedRef.current &&
        !isFilmTransitioningRef.current &&
        filmTrackRef.current
      ) {
        const track = filmTrackRef.current;
        const totalWidth = track.scrollWidth;
        const halfWidth = totalWidth / 2;

        // Vận tốc cuộn liên tục ~38px/giây êm ái
        filmOffsetRef.current -= 0.042 * dt;
        if (filmOffsetRef.current <= -halfWidth) {
          filmOffsetRef.current += halfWidth;
        }
        track.style.transform = `translate3d(${filmOffsetRef.current}px, 0, 0)`;
      }

      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(animId);
      if (filmResumeTimerRef.current) clearTimeout(filmResumeTimerRef.current);
    };
  }, []);

  // Xử lý nút < (lùi 1 khung hình film)
  const handlePrevFilm = (e) => {
    e?.stopPropagation();
    if (!filmTrackRef.current) return;
    const track = filmTrackRef.current;
    const totalWidth = track.scrollWidth;
    const halfWidth = totalWidth / 2;
    const stepSize = window.innerWidth < 640 ? 170 : 218;

    isFilmPausedRef.current = true;
    isFilmTransitioningRef.current = true;

    filmOffsetRef.current += stepSize;
    if (filmOffsetRef.current > 0) {
      filmOffsetRef.current -= halfWidth;
      track.style.transition = "none";
      track.style.transform = `translate3d(${filmOffsetRef.current - stepSize}px, 0, 0)`;
      track.offsetHeight; // force reflow
      filmOffsetRef.current += stepSize;
    }

    track.style.transition = "transform 0.45s cubic-bezier(0.25, 1, 0.5, 1)";
    track.style.transform = `translate3d(${filmOffsetRef.current}px, 0, 0)`;

    setTimeout(() => {
      if (track) track.style.transition = "none";
      isFilmTransitioningRef.current = false;
    }, 460);

    if (filmResumeTimerRef.current) clearTimeout(filmResumeTimerRef.current);
    filmResumeTimerRef.current = setTimeout(() => {
      isFilmPausedRef.current = false;
    }, 4000);
  };

  // Xử lý nút > (tiến 1 khung hình film)
  const handleNextFilm = (e) => {
    e?.stopPropagation();
    if (!filmTrackRef.current) return;
    const track = filmTrackRef.current;
    const totalWidth = track.scrollWidth;
    const halfWidth = totalWidth / 2;
    const stepSize = window.innerWidth < 640 ? 170 : 218;

    isFilmPausedRef.current = true;
    isFilmTransitioningRef.current = true;

    filmOffsetRef.current -= stepSize;

    track.style.transition = "transform 0.45s cubic-bezier(0.25, 1, 0.5, 1)";
    track.style.transform = `translate3d(${filmOffsetRef.current}px, 0, 0)`;

    setTimeout(() => {
      if (track) {
        track.style.transition = "none";
        if (filmOffsetRef.current <= -halfWidth) {
          filmOffsetRef.current += halfWidth;
          track.style.transform = `translate3d(${filmOffsetRef.current}px, 0, 0)`;
        }
      }
      isFilmTransitioningRef.current = false;
    }, 460);

    if (filmResumeTimerRef.current) clearTimeout(filmResumeTimerRef.current);
    filmResumeTimerRef.current = setTimeout(() => {
      isFilmPausedRef.current = false;
    }, 4000);
  };

  // Điều hướng chuyển ảnh trong Lightbox Modal của dải film
  const handleFilmModalPrev = () => {
    if (!selectedFilmFrame) return;
    const currentIndex = FILM_REEL_FRAMES.findIndex((f) => f.id === selectedFilmFrame.id);
    const prevIndex = (currentIndex - 1 + FILM_REEL_FRAMES.length) % FILM_REEL_FRAMES.length;
    setSelectedFilmFrame(FILM_REEL_FRAMES[prevIndex]);
  };

  const handleFilmModalNext = () => {
    if (!selectedFilmFrame) return;
    const currentIndex = FILM_REEL_FRAMES.findIndex((f) => f.id === selectedFilmFrame.id);
    const nextIndex = (currentIndex + 1) % FILM_REEL_FRAMES.length;
    setSelectedFilmFrame(FILM_REEL_FRAMES[nextIndex]);
  };

  // SEO: Cập nhật Document Title chuẩn kỹ thuật On-page theo /seo-sge-master
  useEffect(() => {
    document.title = "Album Ảnh Cưới Đẹp - Kho Lưu Trữ & Chia Sẻ Ảnh PhotoFlow";
    window.scrollTo(0, 0);
  }, []);

  // Gọi API tầng ApiRequestManager theo chuẩn /request-manager skill
  useEffect(() => {
    let isMounted = true;

    const fetchAlbums = async () => {
      try {
        const response = await getAlbumListApi({
          trang: 1,
          so_luong: 20,
          tim_kiem: searchQuery,
        });

        if (isMounted && response?.data && Array.isArray(response.data) && response.data.length > 0) {
          setAlbums(response.data);
        }
      } catch (err) {
        // Fallback tự nhiên nếu server BFF chưa có mock endpoint danh sách
        console.debug("API getAlbumListApi fallback to default mock data");
      }
    };

    fetchAlbums();

    return () => {
      isMounted = false;
    };
  }, [searchQuery]);

  // Bộ lọc tìm kiếm từ khóa và danh mục
  const filteredAlbums = useMemo(() => {
    return albums.filter((item) => {
      const matchQuery = item.title
        .toLowerCase()
        .includes(searchQuery.trim().toLowerCase());
      const matchCategory =
        filterCategory === "all" || item.category === filterCategory;
      return matchQuery && matchCategory;
    });
  }, [albums, searchQuery, filterCategory]);

  // Thao tác thả tim tương tác
  const handleToggleLike = (e, id) => {
    e.stopPropagation();
    setAlbums((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextLiked = !item.isLiked;
          const nextCount = nextLiked ? item.likes + 1 : Math.max(0, item.likes - 1);
          if (nextLiked) {
            toast.success(`Đã thêm "${item.title}" vào yêu thích!`);
          }
          return {
            ...item,
            isLiked: nextLiked,
            likes: nextCount,
          };
        }
        return item;
      })
    );
  };

  const categories = ["all", "Lễ cưới", "Lễ dạm ngõ", "Lễ vu quy", "Pre-wedding"];

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-900 transition-colors duration-200">
      {/* 1. Header Navigation */}
      <Navbar />

      <main className="flex-grow pt-16 sm:pt-20 pb-16">
        {/* ========================================================================= */}
        {/* 2. BANNER & BREADCRUMB SECTION (HIỆU ỨNG LỤC GIÁC TỔ ONG - HEXAGONAL HONEYCOMB) */}
        {/* ========================================================================= */}
        {/* ========================================================================= */}
        {/* 2. BANNER & BREADCRUMB SECTION (DẢI CUỘN FILM 10 TẤM TỰ ĐỘNG + NỀN MỜ) */}
        {/* ========================================================================= */}
        <section
          aria-label="Album Banner"
          className="relative w-full border-b border-slate-200/70 dark:border-slate-800 pt-4 sm:pt-6 lg:pt-8 pb-8 sm:pb-10 lg:pb-12 bg-[#FBF9F5] dark:bg-slate-950 transition-colors overflow-hidden"
        >
          {/* HÌNH NỀN LÀM MỜ Ở PHÍA SAU: ĐƯỢC CHỈNH RÕ HƠN 1 TÍ NHƯNG VẪN MỜ NGHỆ THUẬT THEO YÊU CẦU */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat filter blur-[7px] scale-105 opacity-75 dark:opacity-35 pointer-events-none transition-all duration-500"
            style={{
              backgroundImage: "url('/images/album_banner.jpg')",
            }}
          />
          {/* Lớp phủ chuyển sắc mềm mại tăng tương phản, giữ chữ sắc nét và tôn hình ảnh nghệ thuật */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/55 to-white/30 dark:from-slate-950/85 dark:via-slate-950/70 dark:to-slate-900/40 pointer-events-none" />

          {/* Vệt sáng ấm phim ảnh cổ điển (Ambient Warm Film Flare) */}
          <div className="absolute -top-16 -right-16 w-96 h-96 bg-amber-400/20 dark:bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Hiệu ứng hạt phát sáng & Grain cinema khi ở chế độ Dark Mode */}
          <ParticlesEffect particleCount={55} />

          {/* Banner Container: Bố cục 2 cột hài hòa, chuyên nghiệp trên desktop */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              
              {/* Cột trái: Tiêu đề H1 'Album' & Breadcrumb tối giản, sang trọng */}
              <div className="lg:col-span-5 xl:col-span-4 space-y-2.5 sm:space-y-3 text-center lg:text-left">
                {/* Primary SEO Heading (H1) chuẩn SEO SGE */}
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white font-heading leading-tight">
                  Album
                </h1>

                {/* SGE Atomic Answer Hook ẩn giao diện nhưng bảo toàn ngữ nghĩa SEO theo /seo-sge-master */}
                <p className="sr-only">
                  Kho lưu trữ và chia sẻ album ảnh cưới trực tuyến PhotoFlow với công nghệ phân giải cao, bảo mật đường dẫn riêng tư và tối ưu hiển thị tức thì trên mọi thiết bị.
                </p>

                {/* Breadcrumb: Trang chủ > Album */}
                <div className="flex justify-center lg:justify-start pt-0.5">
                  <Breadcrumb
                    items={[
                      { label: "Trang chủ", link: "/" },
                      { label: "Album" },
                    ]}
                    separator="chevron"
                    className="text-xs sm:text-sm font-medium"
                  />
                </div>
              </div>

              {/* Cột phải: Dải cuộn phim 10 tấm tự động liên tục kèm 2 nút điều hướng <> */}
              <div className="lg:col-span-7 xl:col-span-8 flex justify-center lg:justify-end">
                <div className="relative w-full max-w-2xl lg:max-w-3xl xl:max-w-4xl transform lg:translate-x-8 xl:translate-x-12 -rotate-1 sm:-rotate-2 lg:-rotate-[2.5deg] hover:rotate-0 transition-transform duration-700 ease-out origin-right">
                  {/* Lớp nền ảnh cưới làm mờ nghệ thuật phía sau dải film tạo chiều sâu điện ảnh */}
                  <div
                    className="absolute -inset-2 sm:-inset-4 bg-cover bg-center rounded-3xl filter blur-2xl opacity-40 dark:opacity-20 pointer-events-none scale-95"
                    style={{
                      backgroundImage: "url('/images/wedding_horse_mist.jpg')",
                    }}
                  />
                  
                  {/* Thân dải film màu đen bóng cinema với viền và bóng đổ sâu */}
                  <div className="bg-[#111215] dark:bg-[#08090b] rounded-2xl p-2 sm:p-2.5 shadow-[0_25px_65px_-12px_rgba(0,0,0,0.55)] dark:shadow-[0_25px_65px_-12px_rgba(0,0,0,0.95)] border-2 border-[#24252a] relative select-none overflow-hidden group/reel-box">
                    
                    {/* HIỆU ỨNG ÁNH SÁNG PHẢN CHIẾU TRÊN MÀNG FILM */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent pointer-events-none rounded-2xl z-10" />

                    {/* LỚP PHỦ LÀM MỜ BIÊN TRÁI & PHẢI TẠO CẢM GIÁC CUỘN PHIM VÔ TẬN */}
                    <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-16 bg-gradient-to-r from-[#111215] dark:from-[#08090b] to-transparent z-20 pointer-events-none rounded-l-2xl" />
                    <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-16 bg-gradient-to-l from-[#111215] dark:from-[#08090b] to-transparent z-20 pointer-events-none rounded-r-2xl" />

                    {/* NÚT ĐIỀU HƯỚNG TRÁI < XEM CÁC HÌNH TRONG DÃY FILM */}
                    <button
                      type="button"
                      onClick={handlePrevFilm}
                      aria-label="Xem khung hình film trước"
                      className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/85 hover:bg-amber-400 border border-amber-400/80 hover:border-amber-400 text-amber-400 hover:text-slate-950 backdrop-blur-md flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.8)] transition-all duration-200 hover:scale-110 active:scale-95 group/btn-prev cursor-pointer"
                      title="Khung hình trước (<)"
                    >
                      <svg
                        className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-current stroke-[2.8] fill-none -translate-x-0.5 transition-transform group-hover/btn-prev:-translate-x-1"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>

                    {/* NÚT ĐIỀU HƯỚNG PHẢI > XEM CÁC HÌNH TRONG DÃY FILM */}
                    <button
                      type="button"
                      onClick={handleNextFilm}
                      aria-label="Xem khung hình film tiếp theo"
                      className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/85 hover:bg-amber-400 border border-amber-400/80 hover:border-amber-400 text-amber-400 hover:text-slate-950 backdrop-blur-md flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.8)] transition-all duration-200 hover:scale-110 active:scale-95 group/btn-next cursor-pointer"
                      title="Khung hình tiếp theo (>)"
                    >
                      <svg
                        className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-current stroke-[2.8] fill-none translate-x-0.5 transition-transform group-hover/btn-next:translate-x-1"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>

                    {/* TIÊU ĐỀ KỸ THUẬT FILM TRÊN ĐẦU DẢI (TOP METADATA BANNER) */}
                    <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-mono font-semibold text-amber-400/90 tracking-widest uppercase px-2.5 py-1 border-b border-white/10">
                      <span className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                        PHOTOFLOW 35MM CONTINUOUS REEL
                      </span>
                      <span className="hidden sm:inline text-amber-400/60">SAFETY FILM • ISO 400</span>
                      <span className="text-amber-500 font-bold">KODAK PORTRA 400</span>
                      <span className="hidden md:inline text-amber-400/70">10 EXP LOOP</span>
                    </div>

                    {/* VÙNG CUỘN FILM TỰ ĐỘNG TUẦN HOÀN KÈM ĐIỀU HƯỚNG TIẾN/LÙI */}
                    <div
                      className="overflow-hidden relative py-1.5 select-none"
                      onMouseEnter={() => {
                        isFilmPausedRef.current = true;
                      }}
                      onMouseLeave={() => {
                        isFilmPausedRef.current = false;
                      }}
                    >
                      <div
                        ref={filmTrackRef}
                        className="flex items-center gap-2 sm:gap-2.5 will-change-transform"
                        style={{ width: "max-content" }}
                      >
                        {INFINITE_FILM_FRAMES.map((frame, index) => (
                          <div
                            key={`reel-${frame.id}-${index}`}
                            className="w-40 sm:w-48 md:w-52 flex-shrink-0 bg-[#16171b] rounded-md border border-white/10 overflow-hidden shadow-md flex flex-col group/film transition-all duration-300 hover:border-amber-400/80 hover:shadow-xl"
                          >
                            {/* HÀNG RĂNG CƯA TRÊN CỦA TỪNG KHUNG HÌNH (5 PERFORATIONS) */}
                            <div className="flex items-center justify-between px-2 pt-1.5 pb-1 border-b border-white/10 bg-black/40">
                              {[...Array(5)].map((_, spIdx) => (
                                <div
                                  key={`sp-top-${frame.id}-${index}-${spIdx}`}
                                  className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-[2px] bg-[#F7F5F0] dark:bg-slate-900 border border-black/50 dark:border-white/10 shadow-inner flex-shrink-0"
                                />
                              ))}
                            </div>

                            {/* THÔNG SỐ KHUNG TRÊN */}
                            <div className="flex items-center justify-between text-[8px] font-mono text-amber-400/80 tracking-wider px-2 py-0.5 bg-black/20">
                              <span>PHOTOFLOW</span>
                              <span className="font-bold text-amber-400">EXP {frame.frameNum}</span>
                              <span>▶ {frame.frameCode}</span>
                            </div>

                            {/* KHUNG CHỨA ẢNH THẬT */}
                            <div
                              onClick={() => setSelectedFilmFrame(frame)}
                              className="group/frame relative aspect-[3/4] bg-black overflow-hidden cursor-pointer mx-1.5 my-1 rounded-xs border border-white/10 hover:border-amber-400 transition-all duration-300"
                            >
                              <img
                                src={frame.coverImage}
                                alt={frame.title}
                                loading="lazy"
                                className="w-full h-full object-cover filter contrast-[1.04] transition-all duration-500 group-hover/film:scale-105 group-hover/film:brightness-110"
                              />

                              {/* Mã số âm bản vàng đồng ở góc dưới trái */}
                              <div className="absolute bottom-1.5 left-1.5 bg-black/80 backdrop-blur-xs text-[8.5px] font-mono text-amber-300 font-bold px-1.5 py-0.5 rounded shadow select-none flex items-center gap-1">
                                <span>▶</span>
                                <span>{frame.frameCode}</span>
                              </div>

                              {/* Badge danh mục ảnh ở góc trên phải */}
                              <div className="absolute top-1.5 right-1.5 bg-black/70 backdrop-blur-xs text-[8px] font-sans text-white/90 px-1.5 py-0.5 rounded select-none opacity-0 group-hover/film:opacity-100 transition-opacity">
                                {frame.category}
                              </div>

                              {/* Hover Overlay xem ảnh phóng to */}
                              <div className="absolute inset-0 bg-black/35 opacity-0 group-hover/film:opacity-100 transition-opacity flex items-center justify-center">
                                <span className="bg-white/95 text-slate-900 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-lg flex items-center gap-1 transform translate-y-1 group-hover/film:translate-y-0 transition-transform">
                                  <Icon icon="search" size={11} />
                                  <span>Xem ảnh</span>
                                </span>
                              </div>
                            </div>

                            {/* THÔNG SỐ KHUNG DƯỚI */}
                            <div className="flex items-center justify-between text-[8px] font-mono text-amber-400/80 tracking-wider px-2 py-0.5 bg-black/20">
                              <span>▶ {frame.frameNum}</span>
                              <span className="text-[7.5px] text-amber-300/70 truncate max-w-[85px]">
                                {frame.subtext}
                              </span>
                              <span>KODAK</span>
                            </div>

                            {/* HÀNG RĂNG CƯA DƯỚI CỦA TỪNG KHUNG HÌNH (5 PERFORATIONS) */}
                            <div className="flex items-center justify-between px-2 pt-1 pb-1.5 border-t border-white/10 bg-black/40">
                              {[...Array(5)].map((_, spIdx) => (
                                <div
                                  key={`sp-bot-${frame.id}-${index}-${spIdx}`}
                                  className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-[2px] bg-[#F7F5F0] dark:bg-slate-900 border border-black/50 dark:border-white/10 shadow-inner flex-shrink-0"
                                />
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CHÂN ĐÁY KỸ THUẬT FILM VINTAGE (BOTTOM METADATA FOOTER) */}
                    <div className="flex items-center justify-between text-[8px] sm:text-[9px] font-mono text-amber-400/70 tracking-widest uppercase px-2.5 pt-1.5 pb-0.5 border-t border-white/10">
                      <span>▶ EASTMAN KODAK COMPANY</span>
                      <span className="hidden sm:inline">35MM MOTION PICTURE COLOR FILM</span>
                      <span>PROCESS C-41 ▶</span>
                    </div>

                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. TOOLBAR: BỘ LỌC + VIEW TOGGLE + TÌM KIẾM */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          <div className="bg-[#FAF7F2] dark:bg-slate-800/80 rounded-2xl p-3 sm:p-4 border border-amber-900/5 dark:border-slate-700/80 shadow-xs flex flex-wrap items-center justify-between gap-4">
            {/* Left Controls: Bộ lọc + View switch [::] [=] */}
            <div className="flex items-center gap-3 sm:gap-4 relative">
              {/* Nút Bộ lọc */}
              <button
                type="button"
                onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-[#A67C37] dark:hover:text-[#FBBF24] transition-colors px-2 py-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5"
                aria-label="Mở bộ lọc danh mục"
              >
                <Icon icon="filter" size={17} />
                <span>Bộ lọc</span>
                {filterCategory !== "all" && (
                  <span className="w-2 h-2 rounded-full bg-[#A67C37]" />
                )}
              </button>

              {/* View Switch Icons with Divider */}
              <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                {/* Grid View Icon [::] */}
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  aria-label="Chế độ hiển thị lưới"
                  className={`p-1.5 rounded-md transition-colors ${
                    viewMode === "grid"
                      ? "text-[#A67C37] bg-white dark:bg-slate-700 shadow-xs"
                      : "hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <rect x="3" y="3" width="7" height="7" rx="1.5" />
                    <rect x="14" y="3" width="7" height="7" rx="1.5" />
                    <rect x="3" y="14" width="7" height="7" rx="1.5" />
                    <rect x="14" y="14" width="7" height="7" rx="1.5" />
                  </svg>
                </button>

                {/* Vertical Divider */}
                <span className="h-4 w-px bg-slate-300 dark:bg-slate-600 mx-0.5" />

                {/* List View Icon [=] */}
                <button
                  type="button"
                  onClick={() => setViewMode("list")}
                  aria-label="Chế độ hiển thị danh sách"
                  className={`p-1.5 rounded-md transition-colors ${
                    viewMode === "list"
                      ? "text-[#A67C37] bg-white dark:bg-slate-700 shadow-xs"
                      : "hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <rect x="3" y="4" width="18" height="4" rx="1.5" />
                    <rect x="3" y="10" width="18" height="4" rx="1.5" />
                    <rect x="3" y="16" width="18" height="4" rx="1.5" />
                  </svg>
                </button>
              </div>

              {/* Filter Dropdown */}
              {showFilterDropdown && (
                <div className="absolute top-11 left-0 z-30 w-48 bg-white dark:bg-slate-800 rounded-xl p-2 shadow-xl border border-slate-200 dark:border-slate-700 animate-[fadeIn_0.15s_ease-out]">
                  <div className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase px-2 py-1">
                    Phân loại
                  </div>
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => {
                        setFilterCategory(cat);
                        setShowFilterDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center justify-between ${
                        filterCategory === cat
                          ? "bg-amber-50 dark:bg-slate-700 text-[#A67C37] dark:text-[#FBBF24]"
                          : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/60"
                      }`}
                    >
                      <span>{cat === "all" ? "Tất cả album" : cat}</span>
                      {filterCategory === cat && <Icon icon="check" size={14} />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Controls: Label "Tìm kiếm" + Search Input */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 whitespace-nowrap">
                Tìm kiếm
              </span>
              <div className="w-full sm:w-64">
                <Textinput
                  name="search"
                  placeholder="Nhập từ khóa..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  icon="search"
                  iconPosition="right"
                  clearable
                  onClear={() => setSearchQuery("")}
                  className="!rounded-lg !bg-white dark:!bg-slate-900 !border-slate-200/90 dark:!border-slate-700 text-sm py-1.5 focus:!ring-[#A67C37]/20 focus:!border-[#A67C37]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. MAIN ALBUM GRID / LIST */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          {filteredAlbums.length === 0 ? (
            /* Empty State khi tìm kiếm không có kết quả */
            <div className="py-20 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 mx-auto flex items-center justify-center">
                <Icon icon="image" size={28} />
              </div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
                Không tìm thấy album phù hợp
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                Vui lòng thử lại với từ khóa khác hoặc xóa bộ lọc đang áp dụng.
              </p>
              <Button
                text="Xóa bộ lọc"
                className="!bg-[#A67C37] !text-white !rounded-full text-xs px-5 py-2 mt-2"
                onClick={() => {
                  setSearchQuery("");
                  setFilterCategory("all");
                }}
              />
            </div>
          ) : viewMode === "grid" ? (
            /* 4-Columns Grid tái hiện chính xác 20 album */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredAlbums.map((item) => (
                <div
                  key={item.id}
                  onClick={() => navigate(`/album/${item.id}`)}
                  className="group cursor-pointer"
                >
                  <Card
                    noborder
                    hoverable
                    shadow
                    className="overflow-hidden rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/60 transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-xl flex flex-col h-full"
                    bodyClass="p-4 sm:p-5 flex flex-col justify-between flex-grow"
                  >
                    {/* Cover Image */}
                    <div className="aspect-[4/3] sm:aspect-square overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-700 mb-3.5 relative">
                      <img
                        src={item.coverImage}
                        alt={`Ảnh bìa ${item.title}`}
                        loading="lazy"
                        width={600}
                        height={600}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* Subtle hover overlay */}
                      <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>

                    {/* Information */}
                    <div className="space-y-1">
                      <h3 className="font-bold text-base text-slate-900 dark:text-white truncate group-hover:text-[#A67C37] dark:group-hover:text-[#FBBF24] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-400 dark:text-slate-400">
                        Ngày tạo: {item.createdDate}
                      </p>
                    </div>

                    {/* Footer Meta: Likes & Comments */}
                    <div className="flex items-center gap-5 mt-4 pt-2 border-t border-slate-100 dark:border-slate-700/60 text-xs text-slate-400 dark:text-slate-400">
                      {/* Thả tim */}
                      <button
                        type="button"
                        onClick={(e) => handleToggleLike(e, item.id)}
                        className={`flex items-center gap-1.5 transition-colors ${
                          item.isLiked
                            ? "text-red-500 font-semibold"
                            : "hover:text-red-500 text-slate-400"
                        }`}
                        aria-label={`Thích ${item.title}`}
                      >
                        <svg
                          className="w-4 h-4"
                          viewBox="0 0 24 24"
                          fill={item.isLiked ? "currentColor" : "none"}
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                        <span>{item.likes}</span>
                      </button>

                      {/* Bình luận / Số lượng ảnh */}
                      <div className="flex items-center gap-1.5">
                        <svg
                          className="w-4 h-4 stroke-current stroke-2 fill-none"
                          viewBox="0 0 24 24"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                        <span>{item.comments}</span>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          ) : (
            /* List View Chế độ hiển thị danh sách ngang */
            <div className="space-y-4">
              {filteredAlbums.map((item) => (
                <div
                  key={item.id}
                  onClick={() => navigate(`/album/${item.id}`)}
                  className="group cursor-pointer"
                >
                  <Card
                    noborder
                    hoverable
                    shadow
                    className="overflow-hidden rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/60 transition-all duration-300 group-hover:shadow-lg"
                    bodyClass="p-4 flex flex-col sm:flex-row items-center gap-5"
                  >
                    <div className="w-full sm:w-40 aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-700 flex-shrink-0">
                      <img
                        src={item.coverImage}
                        alt={`Ảnh bìa ${item.title}`}
                        loading="lazy"
                        width={300}
                        height={225}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex-grow space-y-1 text-center sm:text-left">
                      <span className="text-xs font-semibold text-[#A67C37] uppercase tracking-wider">
                        {item.category}
                      </span>
                      <h3 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-[#A67C37] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-400">
                        Ngày tạo: {item.createdDate}
                      </p>
                    </div>
                    <div className="flex items-center gap-6 text-sm text-slate-400 flex-shrink-0">
                      <button
                        type="button"
                        onClick={(e) => handleToggleLike(e, item.id)}
                        className={`flex items-center gap-1.5 transition-colors ${
                          item.isLiked ? "text-red-500 font-semibold" : "hover:text-red-500"
                        }`}
                      >
                        <svg
                          className="w-4 h-4"
                          viewBox="0 0 24 24"
                          fill={item.isLiked ? "currentColor" : "none"}
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                        <span>{item.likes}</span>
                      </button>
                      <div className="flex items-center gap-1.5">
                        <Icon icon="chat-alt-2" size={16} />
                        <span>{item.comments}</span>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* 5. Footer SpintX */}
      <Footer />

      {/* 6. Lightbox Preview Modal khi click xem chi tiết Album */}
      {selectedAlbum && (
        <Modal
          activeModal={Boolean(selectedAlbum)}
          onClose={() => setSelectedAlbum(null)}
          title={selectedAlbum?.title || "Xem chi tiết Album"}
          className="max-w-3xl !p-0"
        >
          <div className="p-4 sm:p-6 space-y-4">
            <div className="rounded-2xl overflow-hidden max-h-[65vh] flex items-center justify-center bg-slate-900/5 dark:bg-slate-950">
              <img
                src={selectedAlbum?.coverImage}
                alt={selectedAlbum?.title}
                className="max-h-[65vh] w-auto rounded-xl object-contain shadow-md"
              />
            </div>
            <div className="flex items-center justify-between pt-2">
              <div>
                <h4 className="font-bold text-lg text-slate-900 dark:text-white">
                  {selectedAlbum?.title}
                </h4>
                <p className="text-xs text-slate-400">
                  Ngày tạo: {selectedAlbum?.createdDate} • Phân loại: {selectedAlbum?.category}
                </p>
              </div>
              <Button
                text="Mở toàn bộ ảnh"
                className="!bg-[#A67C37] !text-white !rounded-xl text-xs px-5 py-2.5"
                onClick={() => {
                  navigate(`/album/${selectedAlbum?.id || 1}`);
                }}
              />
            </div>
          </div>
        </Modal>
      )}

      {/* 7. Lightbox Preview Modal khi click xem ảnh trong dải Film 35mm */}
      {selectedFilmFrame && (
        <Modal
          activeModal={Boolean(selectedFilmFrame)}
          onClose={() => setSelectedFilmFrame(null)}
          title={`35mm Film Archive • ${selectedFilmFrame.frameCode}`}
          className="max-w-3xl !p-0"
        >
          <div className="p-4 sm:p-6 space-y-4">
            <div className="relative rounded-2xl overflow-hidden max-h-[65vh] flex items-center justify-center bg-black">
              <img
                src={selectedFilmFrame.coverImage}
                alt={selectedFilmFrame.title}
                className="max-h-[65vh] w-auto rounded-xl object-contain shadow-md"
              />
              {/* Nút lùi ảnh trong Modal */}
              <button
                type="button"
                onClick={handleFilmModalPrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/20 hover:border-amber-400 transition-colors cursor-pointer shadow-lg"
                title="Ảnh trước (<)"
              >
                <svg className="w-5 h-5 stroke-current stroke-2 fill-none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              {/* Nút tiến ảnh trong Modal */}
              <button
                type="button"
                onClick={handleFilmModalNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/20 hover:border-amber-400 transition-colors cursor-pointer shadow-lg"
                title="Ảnh tiếp theo (>)"
              >
                <svg className="w-5 h-5 stroke-current stroke-2 fill-none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            <div className="flex items-center justify-between pt-2">
              <div>
                <h4 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                  <span>{selectedFilmFrame.title}</span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300">
                    EXP {selectedFilmFrame.frameNum}
                  </span>
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Phân loại: {selectedFilmFrame.category} • Mã phim: Kodak Portra 400 • {selectedFilmFrame.subtext}
                </p>
              </div>
              <Button
                text="Xem Chi Tiết Album"
                className="!bg-[#A67C37] !text-white !rounded-xl text-xs px-5 py-2.5"
                onClick={() => {
                  navigate(`/album/1`);
                }}
              />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Album;
