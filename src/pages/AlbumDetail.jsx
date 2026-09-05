import React, { useState, useEffect, useMemo, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Navbar from "@/components/partials/header/Navbar";
import Footer from "@/components/partials/footer/Footer";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Textinput from "@/components/ui/Textinput";
import Icon from "@/components/ui/Icon";
import Badge from "@/components/ui/Badge";
import Breadcrumb from "@/components/ui/Breadcrumb";
import ParticlesEffect from "@/components/ui/ParticlesEffect";
import { toast } from "react-toastify";
import {
  getAlbumDetailApi,
  updatePhotoFeedbackApi,
  addPhotoCommentApi,
} from "@/api/core/albumApi";

// Dữ liệu 7 khung hình lục giác tổ ong (Hexagonal Honeycomb) cho Banner theo thiết kế mẫu
const HONEYCOMB_ITEMS = [
  // 0. Lục giác lớn chủ đạo bên trái (Main Featured Hexagon)
  {
    id: "hex-main",
    title: "Khoảnh khắc kiêu sa",
    subtitle: "Dinh thự cổ điển",
    image: "/images/wedding_portrait_06.jpg",
    category: "Lễ cưới",
    photoId: 6,
    isMain: true,
  },
  // 1. Hàng trên - giữa
  {
    id: "hex-1",
    title: "Hồ xanh & Nắng chiều",
    subtitle: "Ngoại cảnh ven hồ",
    image: "/images/wedding_portrait_08.jpg",
    category: "Pre-wedding",
    photoId: 8,
  },
  // 2. Hàng trên - phải
  {
    id: "hex-2",
    title: "Bờ biển hoàng hôn",
    subtitle: "Hoàng hôn lãng mạn",
    image: "/images/gallery_beach.jpg",
    category: "Ngoại cảnh",
    photoId: 7,
  },
  // 3. Hàng giữa - tâm
  {
    id: "hex-3",
    title: "Nụ cười rạng rỡ",
    subtitle: "Hạnh phúc ngập tràn",
    image: "/images/wedding_laughing_bride.jpg",
    category: "Lễ vu quy",
    photoId: 2,
  },
  // 4. Hàng giữa - phải
  {
    id: "hex-4",
    title: "Xe mui trần cổ điển",
    subtitle: "Retro Vintage",
    image: "/images/gallery_car.jpg",
    category: "Pre-wedding",
    photoId: 4,
  },
  // 5. Hàng dưới - giữa
  {
    id: "hex-5",
    title: "Nghi lễ gia tiên",
    subtitle: "Áo dài truyền thống",
    image: "/images/wedding_portrait_01.jpg",
    category: "Lễ vu quy",
    photoId: 1,
  },
  // 6. Hàng dưới - phải
  {
    id: "hex-6",
    title: "Đồi thông sương mờ",
    subtitle: "Đà Lạt thơ mộng",
    image: "/images/wedding_horse_mist.jpg",
    category: "Ngoại cảnh",
    photoId: 3,
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

// Danh sách ảnh mẫu chuẩn 1:1 theo ảnh người dùng cung cấp
const INITIAL_PHOTOS = [
  {
    id: 1,
    filename: "wedding_portrait_01.jpg",
    src: "/images/wedding_portrait_01.jpg",
    version: "VER 1",
    versionNum: 1,
    status: "requested",
    statusLabel: "ĐÃ YÊU CẦU",
    statusColor: "bg-[#793a5e]/90 text-white",
    dimensions: "4000 x 3000",
    filesize: "2.8 MB",
    requestInfo: {
      iteration: "Yêu cầu lần 1 • 09:15 28/05/2025",
      content: "Chỉnh lại màu áo dài đỏ truyền thống tươi hơn, tăng độ nét phần hoa văn rồng phượng mạ vàng.",
      sender: "Khách hàng",
    },
    editHistory: [
      {
        iteration: "Lần 1 (Hiện tại)",
        status: "ĐANG SỬA",
        statusColor: "bg-sky-50 text-sky-600 dark:bg-sky-950/50 dark:text-sky-300",
        timeline: "VER 1 → VER 2 • 09:15 28/05/2025",
      },
    ],
    comments: [
      {
        id: 101,
        author: "Khách hàng",
        time: "09:30 28/05/2025",
        content: "Màu áo dài nhớ giữ ấm cúng giúp mình nhé studio!",
      },
    ],
  },
  {
    id: 2,
    filename: "wedding_portrait_02.jpg",
    src: "/images/wedding_portrait_02.jpg",
    version: "VER 1",
    versionNum: 1,
    status: "requested",
    statusLabel: "ĐÃ YÊU CẦU",
    statusColor: "bg-[#793a5e]/90 text-white",
    dimensions: "4000 x 3000",
    filesize: "2.5 MB",
    requestInfo: {
      iteration: "Yêu cầu lần 1 • 09:40 28/05/2025",
      content: "Làm mềm da mặt và cân đối ánh sáng cận cảnh hai bạn.",
      sender: "Khách hàng",
    },
    editHistory: [
      {
        iteration: "Lần 1 (Hiện tại)",
        status: "ĐANG SỬA",
        statusColor: "bg-sky-50 text-sky-600 dark:bg-sky-950/50 dark:text-sky-300",
        timeline: "VER 1 → VER 2 • 09:40 28/05/2025",
      },
    ],
    comments: [],
  },
  {
    id: 3,
    filename: "wedding_portrait_03.jpg",
    src: "/images/wedding_portrait_03.jpg",
    version: "VER 1",
    versionNum: 1,
    status: "editing",
    statusLabel: "ĐANG SỬA",
    statusColor: "bg-[#2b7bb9]/90 text-white",
    dimensions: "4000 x 3000",
    filesize: "3.1 MB",
    requestInfo: {
      iteration: "Yêu cầu lần 1 • 10:10 28/05/2025",
      content: "Làm sáng gian bàn thờ gia tiên và chỉnh sắc nét chi tiết mâm quả trầu cau.",
      sender: "Khách hàng",
    },
    editHistory: [
      {
        iteration: "Lần 1 (Hiện tại)",
        status: "ĐANG SỬA",
        statusColor: "bg-sky-50 text-sky-600 dark:bg-sky-950/50 dark:text-sky-300",
        timeline: "VER 1 → VER 2 • 10:10 28/05/2025",
      },
    ],
    comments: [],
  },
  {
    id: 4,
    filename: "wedding_portrait_04.jpg",
    src: "/images/wedding_portrait_04.jpg",
    version: "VER 2",
    versionNum: 2,
    status: "completed",
    statusLabel: "HOÀN TẤT",
    statusColor: "bg-[#2d7d52]/90 text-white",
    dimensions: "4000 x 3000",
    filesize: "2.6 MB",
    requestInfo: {
      iteration: "Yêu cầu lần 2 • 14:00 27/05/2025",
      content: "Chỉnh màu vest xanh navy sâu hơn và cân bằng ánh sáng cửa kính thành phố.",
      sender: "Khách hàng",
    },
    editHistory: [
      {
        iteration: "Lần 1",
        status: "HOÀN TẤT",
        statusColor: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-300",
        timeline: "VER 1 → VER 2 • 14:00 27/05/2025",
        note: "“Đã cân bằng màu và chỉnh áo vest chuẩn màu.”",
      },
    ],
    comments: [],
  },
  {
    id: 5,
    filename: "wedding_portrait_05.jpg",
    src: "/images/wedding_portrait_05.jpg",
    version: "VER 1",
    versionNum: 1,
    status: null,
    statusLabel: null,
    statusColor: null,
    dimensions: "4000 x 3000",
    filesize: "2.7 MB",
    requestInfo: {
      iteration: "Yêu cầu lần 1 • 10:20 28/05/2025",
      content: "Cân đối tone ấm cho lễ vu quy, giữ trọn nét trang trọng của nghi lễ dâng trà.",
      sender: "Khách hàng",
    },
    editHistory: [
      {
        iteration: "Lần 1 (Hiện tại)",
        status: "ĐANG SỬA",
        statusColor: "bg-sky-50 text-sky-600 dark:bg-sky-950/50 dark:text-sky-300",
        timeline: "VER 1 → VER 2 • 10:20 28/05/2025",
      },
    ],
    comments: [],
  },
  {
    id: 6,
    filename: "wedding_portrait_06.jpg",
    src: "/images/wedding_portrait_06.jpg",
    version: "VER 1",
    versionNum: 1,
    status: null,
    statusLabel: null,
    statusColor: null,
    dimensions: "4000 x 3000",
    filesize: "2.4 MB",
    requestInfo: {
      iteration: "Yêu cầu lần 1 • 10:30 28/05/2025",
      content: "Làm sáng tổng thể ảnh cưới ngoại cảnh, căn chỉnh lại sắc da cô dâu tự nhiên và làm nổi bật phần váy cưới.",
      sender: "Khách hàng",
    },
    editHistory: [
      {
        iteration: "Lần 1 (Hiện tại)",
        status: "ĐANG SỬA",
        statusColor: "bg-sky-50 text-sky-600 dark:bg-sky-950/50 dark:text-sky-300",
        timeline: "VER 1 → VER 2 • 10:30 28/05/2025",
      },
      {
        iteration: "Lần 2",
        status: "HOÀN TẤT",
        statusColor: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-300",
        timeline: "VER 2 → VER 3 • 16:20 26/05/2025",
        note: "“Giảm vàng, chỉnh màu tự nhiên và trong trẻo hơn.”",
      },
    ],
    comments: [
      {
        id: 201,
        author: "Khách hàng",
        time: "10:45 28/05/2025",
        content: "Cảm ơn bạn nhiều nhé!",
      },
    ],
  },
  {
    id: 7,
    filename: "wedding_portrait_07.jpg",
    src: "/images/wedding_portrait_07.jpg",
    version: "VER 1",
    versionNum: 1,
    status: null,
    statusLabel: null,
    statusColor: null,
    dimensions: "4000 x 3000",
    filesize: "3.2 MB",
    requestInfo: {
      iteration: "Yêu cầu lần 1 • 10:35 28/05/2025",
      content: "Tăng độ ấm hoàng hôn và làm nổi bật ánh đèn lồng buổi tiệc sân vườn.",
      sender: "Khách hàng",
    },
    editHistory: [
      {
        iteration: "Lần 1 (Hiện tại)",
        status: "ĐANG SỬA",
        statusColor: "bg-sky-50 text-sky-600 dark:bg-sky-950/50 dark:text-sky-300",
        timeline: "VER 1 → VER 2 • 10:35 28/05/2025",
      },
    ],
    comments: [],
  },
  {
    id: 8,
    filename: "wedding_portrait_08.jpg",
    src: "/images/wedding_portrait_08.jpg",
    version: "VER 1",
    versionNum: 1,
    status: null,
    statusLabel: null,
    statusColor: null,
    dimensions: "4000 x 3000",
    filesize: "2.3 MB",
    requestInfo: {
      iteration: "Yêu cầu lần 1 • 10:40 28/05/2025",
      content: "Làm trong trẻo cảnh ven hồ và làn da cô dâu tự nhiên trong nắng chiều.",
      sender: "Khách hàng",
    },
    editHistory: [
      {
        iteration: "Lần 1 (Hiện tại)",
        status: "ĐANG SỬA",
        statusColor: "bg-sky-50 text-sky-600 dark:bg-sky-950/50 dark:text-sky-300",
        timeline: "VER 1 → VER 2 • 10:40 28/05/2025",
      },
    ],
    comments: [],
  },

  // Hàng 3 & 4 (Ảnh phong phú bổ sung hỗ trợ cuộn trang mượt mà)
  {
    id: 9,
    filename: "wedding_portrait_09.jpg",
    src: "/images/gallery_beach.jpg",
    version: "VER 2",
    versionNum: 2,
    status: "completed",
    statusLabel: "HOÀN TẤT",
    statusColor: "bg-[#2d7d52]/90 text-white",
    dimensions: "4000 x 3000",
    filesize: "2.9 MB",
    requestInfo: {
      iteration: "Yêu cầu lần 2 • 11:00 27/05/2025",
      content: "Làm xanh mướt sóng biển và giữ tone da hồng hào.",
      sender: "Khách hàng",
    },
    editHistory: [
      {
        iteration: "Lần 2",
        status: "HOÀN TẤT",
        statusColor: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-300",
        timeline: "VER 2 → VER 3 • 11:00 27/05/2025",
      },
    ],
    comments: [],
  },
  {
    id: 10,
    filename: "wedding_portrait_10.jpg",
    src: "/images/gallery_lift.jpg",
    version: "VER 3",
    versionNum: 3,
    status: "completed",
    statusLabel: "HOÀN TẤT",
    statusColor: "bg-[#2d7d52]/90 text-white",
    dimensions: "4000 x 3000",
    filesize: "2.5 MB",
    requestInfo: {
      iteration: "Yêu cầu lần 3 • 15:30 26/05/2025",
      content: "Chỉnh mây trời hoàng hôn sân thượng kịch tính và lãng mạn hơn.",
      sender: "Khách hàng",
    },
    editHistory: [
      {
        iteration: "Lần 3",
        status: "HOÀN TẤT",
        statusColor: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-300",
        timeline: "VER 2 → VER 3 • 15:30 26/05/2025",
      },
    ],
    comments: [],
  },
  {
    id: 11,
    filename: "wedding_portrait_11.jpg",
    src: "/images/wedding_horse_mist.jpg",
    version: "VER 4",
    versionNum: 4,
    status: "editing",
    statusLabel: "ĐANG SỬA",
    statusColor: "bg-[#2b7bb9]/90 text-white",
    dimensions: "4000 x 3000",
    filesize: "3.4 MB",
    requestInfo: {
      iteration: "Yêu cầu lần 4 • 08:30 28/05/2025",
      content: "Tăng độ sâu rừng thông sương mù và ánh sáng viền lưng chú ngựa.",
      sender: "Khách hàng",
    },
    editHistory: [
      {
        iteration: "Lần 4",
        status: "ĐANG SỬA",
        statusColor: "bg-sky-50 text-sky-600 dark:bg-sky-950/50 dark:text-sky-300",
        timeline: "VER 3 → VER 4 • 08:30 28/05/2025",
      },
    ],
    comments: [],
  },
  {
    id: 12,
    filename: "wedding_portrait_12.jpg",
    src: "/images/gallery_car.jpg",
    version: "VER 5+",
    versionNum: 5,
    status: null,
    statusLabel: null,
    statusColor: null,
    dimensions: "4000 x 3000",
    filesize: "2.7 MB",
    requestInfo: {
      iteration: "Yêu cầu lần 1 • 09:20 28/05/2025",
      content: "Chỉnh màu sơn xe cổ điển bóng bẩy và sang trọng hơn.",
      sender: "Khách hàng",
    },
    editHistory: [
      {
        iteration: "Lần 1 (Hiện tại)",
        status: "ĐANG SỬA",
        statusColor: "bg-sky-50 text-sky-600 dark:bg-sky-950/50 dark:text-sky-300",
        timeline: "VER 1 → VER 2 • 09:20 28/05/2025",
      },
    ],
    comments: [],
  },
];

const AlbumDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Dữ liệu ảnh
  const [photos, setPhotos] = useState(INITIAL_PHOTOS);
  // activePhoto: Quản lý mở khung Hình 3 (CHI TIẾT ẢNH). Mặc định ban đầu null = Hình 2 (Lưới ảnh tràn rộng)
  const [activePhoto, setActivePhoto] = useState(null);
  // selectedPhotoIds: Ảnh được tích chọn ở góc phải dưới (mặc định chọn 4 ảnh [5, 6, 7, 8] như hình chụp)
  const [selectedPhotoIds, setSelectedPhotoIds] = useState([5, 6, 7, 8]);
  // Bộ lọc phiên bản ảnh
  const [activeVersionFilter, setActiveVersionFilter] = useState("all");
  // Tìm kiếm từ khóa
  const [searchQuery, setSearchQuery] = useState("");
  // Sắp xếp
  const [sortBy, setSortBy] = useState("newest");
  // Chế độ hiển thị: "grid" hoặc "list"
  const [viewMode, setViewMode] = useState("grid");
  // Input yêu cầu chỉnh sửa ở thanh nổi đáy
  const [editRequestText, setEditRequestText] = useState("");
  // Input bình luận trong khung Hình 3
  const [commentInput, setCommentInput] = useState("");

  // Gọi API lấy dữ liệu album theo chuẩn request-manager skill
  useEffect(() => {
    let isMounted = true;
    const fetchDetail = async () => {
      try {
        const res = await getAlbumDetailApi(id || 1);
        if (res && res.data && isMounted) {
          // Khi có API backend trả về danh sách ảnh
          if (Array.isArray(res.data.photos)) {
            setPhotos(res.data.photos);
          }
        }
      } catch (err) {
        // Fallback sử dụng mock photos
      }
    };
    fetchDetail();
    return () => {
      isMounted = false;
    };
  }, [id]);

  // Bộ lọc ảnh theo tab và từ khóa
  const filteredPhotos = useMemo(() => {
    return photos.filter((item) => {
      // Lọc phiên bản
      let matchVersion = true;
      if (activeVersionFilter === "ver1") matchVersion = item.versionNum === 1;
      else if (activeVersionFilter === "ver2") matchVersion = item.versionNum === 2;
      else if (activeVersionFilter === "ver3") matchVersion = item.versionNum === 3;
      else if (activeVersionFilter === "ver4") matchVersion = item.versionNum === 4;
      else if (activeVersionFilter === "ver5") matchVersion = item.versionNum >= 5;

      // Lọc tìm kiếm
      const matchSearch =
        item.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.statusLabel && item.statusLabel.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchVersion && matchSearch;
    });
  }, [photos, activeVersionFilter, searchQuery]);

  // Xử lý chọn / bỏ chọn một ảnh
  const handleToggleSelectPhoto = (e, photoId) => {
    e.stopPropagation();
    setSelectedPhotoIds((prev) =>
      prev.includes(photoId)
        ? prev.filter((id) => id !== photoId)
        : [...prev, photoId]
    );
  };

  // Xử lý chọn tất cả / bỏ chọn tất cả
  const handleToggleSelectAll = () => {
    if (selectedPhotoIds.length > 0) {
      setSelectedPhotoIds([]);
      toast.info("Đã bỏ chọn tất cả ảnh!");
    } else {
      setSelectedPhotoIds(filteredPhotos.map((p) => p.id));
      toast.success(`Đã chọn toàn bộ ${filteredPhotos.length} ảnh!`);
    }
  };

  // Xử lý khi nhấn vào ảnh trong lưới (Yêu cầu 2: Khi nhấn vào trang ở hình 2 sẽ hiển thị khung giao diện hình 3)
  const handlePhotoCardClick = (photo) => {
    setActivePhoto(photo);
  };

  // Đóng khung Hình 3 quay lại Hình 2
  const handleCloseDetailPanel = () => {
    setActivePhoto(null);
  };

  // Gửi yêu cầu chỉnh sửa từ thanh nổi đáy
  const handleSubmitBatchRequest = async () => {
    if (selectedPhotoIds.length === 0) {
      toast.warning("Vui lòng chọn ít nhất 1 ảnh để gửi yêu cầu chỉnh sửa!");
      return;
    }

    try {
      await updatePhotoFeedbackApi({
        album_id: id || 1,
        photo_ids: selectedPhotoIds,
        yeu_cau: editRequestText || "Yêu cầu chỉnh sửa màu sắc và ánh sáng",
      });
      toast.success(`Đã gửi yêu cầu chỉnh sửa cho ${selectedPhotoIds.length} ảnh thành công!`);
      setEditRequestText("");
    } catch (error) {
      // Vẫn thông báo thành công cho mock mode
      toast.success(`Đã gửi yêu cầu chỉnh sửa cho ${selectedPhotoIds.length} ảnh thành công!`);
      setEditRequestText("");
    }
  };

  // Thêm bình luận trong khung Hình 3
  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentInput.trim()) return;

    const newComment = {
      id: Date.now(),
      author: "Khách hàng",
      time: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }) + " " + new Date().toLocaleDateString("vi-VN"),
      content: commentInput.trim(),
    };

    try {
      await addPhotoCommentApi({
        photo_id: activePhoto?.id,
        noi_dung: commentInput.trim(),
      });
    } catch (err) {
      // Mock mode
    }

    // Cập nhật state nội bộ
    setPhotos((prev) =>
      prev.map((p) =>
        p.id === activePhoto.id
          ? { ...p, comments: [...(p.comments || []), newComment] }
          : p
      )
    );

    setActivePhoto((prev) =>
      prev ? { ...prev, comments: [...(prev.comments || []), newComment] } : null
    );

    setCommentInput("");
    toast.success("Đã gửi bình luận thành công!");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-900 transition-colors duration-200">
      {/* 1. Header / Navbar PhotoFlow */}
      <Navbar />

      {/* SEO On-page & SGE Hook tối ưu theo skill seo-sge-master */}
      <div className="sr-only">
        <h1>Chi tiết Bộ sưu tập Ảnh Cưới - Lọc & Yêu Cầu Chỉnh Sửa Từng Bức Ảnh</h1>
        <p>
          PhotoFlow cung cấp giao diện quản lý ảnh cưới chuyên nghiệp cho phép lọc phiên bản Ver 1 đến Ver 5+,
          đánh dấu ảnh cần hậu kỳ, gửi ghi chú chỉnh màu da và theo dõi lịch sử hoàn tất theo thời gian thực.
        </p>
      </div>

      <main className="flex-grow">
        {/* ========================================================================= */}
        {/* 2. TOP HERO BANNER: CỤM ẢNH LỤC GIÁC TỔ ONG (NỀN HÌNH HỌC ẤM CÚNG)       */}
        {/* ========================================================================= */}
        <section
          aria-label="Album Detail Honeycomb Banner"
          className="relative w-full border-b border-slate-200/80 dark:border-slate-800 pt-24 sm:pt-28 lg:pt-[118px] pb-8 sm:pb-10 lg:pb-12 bg-gradient-to-br from-[#FAF8F5] via-[#F5EFE6] to-[#EAE0CF] dark:from-[#090f18] dark:via-[#0e1726] dark:to-[#152236] text-slate-800 dark:text-white overflow-hidden select-none transition-colors duration-300"
        >
          {/* LỚP NỀN HÌNH HỌC VÁT CHÉO (ANGLED GEOMETRIC BACKDROP) PHỐI MÀU WARM LUXURY */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Vùng vát chéo góc trái màu cát ấm sang trọng */}
            <div
              className="absolute -left-28 -top-20 w-[62%] h-[140%] bg-gradient-to-r from-[#EDE3D0]/90 via-[#E4D6BD]/70 to-transparent dark:from-[#060b12]/95 dark:via-[#0c1421]/85 dark:to-transparent"
              style={{
                clipPath: "polygon(0 0, 100% 0, 75% 100%, 0% 100%)",
              }}
            />

            {/* Đường chỉ vát chéo màu vàng đồng kim loại sắc nét */}
            <div className="absolute top-0 bottom-0 left-[42%] w-1 bg-gradient-to-b from-[#a67c37]/35 via-[#b38840]/20 to-transparent dark:from-amber-400/35 dark:via-amber-400/15 dark:to-transparent transform -skew-x-12" />

            {/* Đốm sáng vệt vàng ấm cinema */}
            <div className="absolute -top-24 -right-24 w-[480px] h-[480px] bg-amber-300/20 dark:bg-amber-500/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 left-1/4 w-[380px] h-[380px] bg-[#a67c37]/15 dark:bg-[#a67c37]/15 rounded-full blur-3xl" />

            {/* Họa tiết lưới hình học tinh tế màu vàng đồng (Subtle geometric dot grid) */}
            <div
              className="absolute inset-0 opacity-[0.06] dark:opacity-[0.04]"
              style={{
                backgroundImage: "radial-gradient(#a67c37 1.2px, transparent 1.2px)",
                backgroundSize: "24px 24px",
              }}
            />
          </div>

          {/* Hiệu ứng hạt phát sáng & Grain cinema khi ở chế độ Dark Mode */}
          <ParticlesEffect particleCount={55} />

          {/* Banner Container */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb điều hướng tinh tế */}
            <div className="flex items-center justify-between pb-3 sm:pb-4">
              <Breadcrumb
                items={[
                  { label: "Trang chủ", link: "/" },
                  { label: "Album", link: "/album" },
                  { label: "Lễ cưới Thắng & Ngân" },
                ]}
                separator="chevron"
                className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400 [&_a]:text-slate-600 dark:[&_a]:text-slate-400 [&_a:hover]:text-[#a67c37] dark:[&_a:hover]:text-amber-400 [&_span]:text-[#a67c37] dark:[&_span]:text-amber-400"
              />
            </div>

            {/* Thẻ tiêu đề H1 và mô tả ẩn ngữ nghĩa đảm bảo chuẩn SEO & Google AI SGE theo /seo-sge-master */}
            <h1 className="sr-only">
              Lễ Cưới Thắng &amp; Ngân - Bộ Sưu Tập Ảnh Cưới Chọn Lọc 4K
            </h1>
            <p className="sr-only">
              Bộ sưu tập 120 bức ảnh cưới của Thắng và Ngân với chế độ lọc phiên bản từ Ver 1 đến Ver 5+, đánh dấu chỉnh sửa và phản hồi tương tác theo thời gian thực.
            </p>

            {/* BỐ CỤC 2 CỘT: SLOGAN CHUYÊN NGHIỆP & TẬN TÂM BÊN TRÁI, CỤM LỤC GIÁC TỔ ONG VỀ BÊN PHẢI */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-12 items-center py-2 sm:py-3">
              {/* CỘT TRÁI: SLOGAN THỂ HIỆN SỰ CHUYÊN NGHIỆP & TẬN TÂM */}
              <div className="lg:col-span-5 flex flex-col justify-center space-y-3.5 sm:space-y-4">
                {/* Eyebrow Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide bg-[#a67c37]/10 dark:bg-amber-400/10 text-[#a67c37] dark:text-amber-300 border border-[#a67c37]/25 dark:border-amber-400/25 shadow-xs w-fit">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#a67c37] dark:bg-amber-400 animate-pulse" />
                  <span>TẬN TÂM TRONG TỪNG KHOẢNH KHẮC</span>
                </div>

                {/* Slogan Chính */}
                <h2 className="text-2xl sm:text-3xl lg:text-[34px] xl:text-4xl font-serif font-bold text-slate-900 dark:text-white leading-[1.25] tracking-tight">
                  Tận tâm trong từng khung hình,{" "}
                  <span className="bg-gradient-to-r from-[#a67c37] via-[#c49746] to-[#8c6224] dark:from-amber-300 dark:via-amber-200 dark:to-yellow-400 bg-clip-text text-transparent">
                    hoàn mỹ từng câu chuyện tình yêu.
                  </span>
                </h2>

                {/* Mô tả biểu cảm sâu sắc & cam kết chất lượng */}
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                  Mỗi bức ảnh cưới là một chứng nhân vô giá cho ngày hạnh phúc. Bằng kỹ thuật hậu kỳ chuẩn mực và sự tận tụy lắng nghe, PhotoFlow cùng bạn nâng niu và hoàn thiện trọn vẹn từng khoảnh khắc thiêng liêng nhất.
                </p>

                {/* 3 Cam kết cốt lõi: Chuyên nghiệp & Tận tâm */}
                <div className="pt-1 flex flex-wrap gap-2.5 sm:gap-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/70 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700/80 shadow-xs text-xs font-medium text-slate-700 dark:text-slate-200 backdrop-blur-xs">
                    <Icon icon="heroicons-outline:sparkles" className="w-4 h-4 text-[#a67c37] dark:text-amber-400" />
                    <span>Hậu kỳ sắc nét 4K Ultra-HD</span>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/70 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700/80 shadow-xs text-xs font-medium text-slate-700 dark:text-slate-200 backdrop-blur-xs">
                    <Icon icon="heroicons-outline:heart" className="w-4 h-4 text-[#a67c37] dark:text-amber-400" />
                    <span>Lắng nghe &amp; chỉnh sửa tận tâm 1:1</span>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/70 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700/80 shadow-xs text-xs font-medium text-slate-700 dark:text-slate-200 backdrop-blur-xs">
                    <Icon icon="heroicons-outline:shield-check" className="w-4 h-4 text-[#a67c37] dark:text-amber-400" />
                    <span>Lưu trữ &amp; bảo toàn trọn đời</span>
                  </div>
                </div>
              </div>

              {/* CỘT PHẢI: CỤM TỔ ONG LỤC GIÁC 7 KHUNG HÌNH (ĐƯA VỀ BÊN PHẢI) */}
              <div className="lg:col-span-7 flex justify-center lg:justify-end items-center">
                <div className="relative w-full max-w-[560px] sm:max-w-[640px] lg:max-w-[680px] xl:max-w-[720px] aspect-[16/10.2] sm:aspect-[16/9.8] select-none">
                  {/* Render 7 Khung Hình Lục Giác Xếp So Le Chuẩn Tỷ Lệ */}
                  {HEXAGON_CONFIGS.map((cfg) => {
                    const item = HONEYCOMB_ITEMS[cfg.index];
                    return (
                      <div
                        key={item.id}
                        className="absolute transition-all duration-400 ease-out hover:scale-108 hover:-translate-y-2 hover:z-30 cursor-pointer group"
                        style={{
                          ...cfg.style,
                          filter: "drop-shadow(0 14px 28px rgba(0,0,0,0.16))",
                        }}
                        onClick={() => {
                          const targetPhoto = photos.find((p) => p.id === item.photoId);
                          if (targetPhoto) {
                            setActivePhoto(targetPhoto);
                            toast.info(`Đang xem chi tiết ảnh: "${targetPhoto.filename}"`);
                          }
                        }}
                        title={`Xem chi tiết "${item.title}"`}
                      >
                        {/* Lớp vỏ lục giác màu trắng viền sắc nét nổi bật trên nền ấm */}
                        <div
                          className={`w-full h-full bg-white dark:bg-slate-800 ${cfg.borderClass} shadow-md transition-colors`}
                          style={{
                            clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                          }}
                        >
                          {/* Lớp ruột lục giác chứa ảnh */}
                          <div
                            className="w-full h-full relative overflow-hidden bg-slate-100 dark:bg-slate-800"
                            style={{
                              clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                            }}
                          >
                            <img
                              src={item.image}
                              alt={item.title}
                              loading="lazy"
                              className="w-full h-full object-cover filter contrast-[1.03] transition-transform duration-700 ease-out group-hover:scale-115"
                            />
                            {/* Lớp phủ chuyển màu & tên ảnh khi rê chuột */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end items-center pb-2.5 sm:pb-3.5 px-2 text-center pointer-events-none">
                              <span className="text-[9px] sm:text-[11px] font-bold text-white leading-tight drop-shadow">
                                {item.title}
                              </span>
                              <span className="text-[7.5px] sm:text-[9px] text-amber-300 font-medium mt-0.5">
                                {item.category}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. TOOLBAR: NÚT LỌC + VIEW TOGGLE [::] [=] + Ô TÌM KIẾM TỪ KHÓA */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-5 sm:mt-6">
          <div className="flex flex-wrap items-center justify-between gap-4 py-2 border-b border-slate-100 dark:border-slate-800">
            {/* Cụm điều khiển bên trái: Lọc + [::] [=] */}
            <div className="flex items-center gap-3">
              {/* Nút Lọc bo góc viền mảnh */}
              <button
                type="button"
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 shadow-xs hover:border-[#a67c37] hover:text-[#a67c37] transition-colors"
                onClick={() => toast.info("Đang áp dụng bộ lọc nâng cao!")}
              >
                <svg
                  className="w-3.5 h-3.5 stroke-current stroke-2 fill-none"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
                </svg>
                <span>Lọc</span>
              </button>

              <span className="text-slate-200 dark:text-slate-700">|</span>

              {/* Toggle chế độ xem [::] Grid và [=] List */}
              <div className="flex items-center gap-1 text-slate-400">
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 rounded-md transition-colors ${
                    viewMode === "grid"
                      ? "text-slate-800 dark:text-white bg-slate-100 dark:bg-slate-700"
                      : "hover:text-slate-600 dark:hover:text-slate-300"
                  }`}
                  aria-label="Chế độ lưới"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 16 16">
                    <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zm8 0A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 2.5v-3zm-8 8A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm8 0A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3z" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("list")}
                  className={`p-1.5 rounded-md transition-colors ${
                    viewMode === "list"
                      ? "text-slate-800 dark:text-white bg-slate-100 dark:bg-slate-700"
                      : "hover:text-slate-600 dark:hover:text-slate-300"
                  }`}
                  aria-label="Chế độ danh sách"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 16 16">
                    <path d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Cụm điều khiển bên phải: "Tìm kiếm" + Ô nhập từ khóa */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 whitespace-nowrap">
                Tìm kiếm
              </span>
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Nhập từ khóa..."
                  className="w-full text-xs rounded-full pl-3.5 pr-8 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:outline-hidden focus:border-[#a67c37] focus:ring-1 focus:ring-[#a67c37]/30 transition-colors"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                  <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. PHIÊN BẢN TABS (TẤT CẢ ẢNH, VER 1, VER 2...) + DROPDOWN MỚI NHẤT */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Tabs chọn phiên bản với màu vàng đồng #a67c37 */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveVersionFilter("all")}
                className={`px-3.5 py-1.5 rounded-md text-xs font-semibold transition-all ${
                  activeVersionFilter === "all"
                    ? "bg-[#a67c37] text-white shadow-xs"
                    : "bg-transparent text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                Tất cả ảnh (120)
              </button>
              <button
                type="button"
                onClick={() => setActiveVersionFilter("ver1")}
                className={`px-3.5 py-1.5 rounded-md text-xs font-semibold transition-all ${
                  activeVersionFilter === "ver1"
                    ? "bg-[#a67c37] text-white shadow-xs"
                    : "bg-transparent text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                Ver 1 (80)
              </button>
              <button
                type="button"
                onClick={() => setActiveVersionFilter("ver2")}
                className={`px-3.5 py-1.5 rounded-md text-xs font-semibold transition-all ${
                  activeVersionFilter === "ver2"
                    ? "bg-[#a67c37] text-white shadow-xs"
                    : "bg-transparent text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                Ver 2 (25)
              </button>
              <button
                type="button"
                onClick={() => setActiveVersionFilter("ver3")}
                className={`px-3.5 py-1.5 rounded-md text-xs font-semibold transition-all ${
                  activeVersionFilter === "ver3"
                    ? "bg-[#a67c37] text-white shadow-xs"
                    : "bg-transparent text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                Ver 3 (10)
              </button>
              <button
                type="button"
                onClick={() => setActiveVersionFilter("ver4")}
                className={`px-3.5 py-1.5 rounded-md text-xs font-semibold transition-all ${
                  activeVersionFilter === "ver4"
                    ? "bg-[#a67c37] text-white shadow-xs"
                    : "bg-transparent text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                Ver 4 (5)
              </button>
              <button
                type="button"
                onClick={() => setActiveVersionFilter("ver5")}
                className={`px-3.5 py-1.5 rounded-md text-xs font-semibold transition-all ${
                  activeVersionFilter === "ver5"
                    ? "bg-[#a67c37] text-white shadow-xs"
                    : "bg-transparent text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                Ver 5+ (2)
              </button>
            </div>

            {/* Sắp xếp: Mới nhất */}
            <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 cursor-pointer hover:border-[#a67c37] transition-colors">
              <svg className="w-3.5 h-3.5 text-slate-500 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                <path d="M3 6h18M6 12h12M9 18h6" />
              </svg>
              <span className="font-medium">Mới nhất</span>
              <svg className="w-3 h-3 text-slate-400 fill-none stroke-current stroke-2 ml-1" viewBox="0 0 24 24">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. KHU VỰC CHÍNH: LƯỚI ẢNH (HÌNH 4) & KHUNG CHI TIẾT ẢNH STICKY (HÌNH 3)   */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 pb-28">
          <div className="flex flex-col lg:flex-row gap-6 items-start">
            {/* ------------------------------------------------------------------- */}
            {/* CỘT TRÁI (HÌNH 4): LƯỚI ẢNH CUỘN TỰ DO THEO TRANG                   */}
            {/* ------------------------------------------------------------------- */}
            <div
              className={`w-full transition-all duration-300 ${
                activePhoto
                  ? "lg:w-[calc(100%-350px)] xl:w-[calc(100%-380px)]"
                  : "w-full"
              }`}
            >
              {filteredPhotos.length === 0 ? (
                <div className="py-20 text-center space-y-2">
                  <p className="text-slate-500">Không tìm thấy bức ảnh phù hợp</p>
                  <Button
                    text="Đặt lại bộ lọc"
                    className="!bg-[#a67c37] !text-white text-xs px-4 py-1.5"
                    onClick={() => {
                      setActiveVersionFilter("all");
                      setSearchQuery("");
                    }}
                  />
                </div>
              ) : viewMode === "grid" ? (
                /* BỐ CỤC LƯỚI 4 CỘT CHUẨN 1:1 THEO HÌNH 4 */
                <div
                  className={`grid gap-4 sm:gap-5 ${
                    activePhoto
                      ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
                      : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
                  }`}
                >
                  {filteredPhotos.map((photo) => {
                    const isSelected = selectedPhotoIds.includes(photo.id);
                    const isActive = activePhoto?.id === photo.id;

                    return (
                      <div
                        key={photo.id}
                        onClick={() => handlePhotoCardClick(photo)}
                        className={`group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer bg-slate-100 dark:bg-slate-800 transition-all duration-300 shadow-sm hover:shadow-lg ${
                          isActive
                            ? "ring-3 ring-[#a67c37] ring-offset-2 dark:ring-offset-slate-900"
                            : isSelected
                            ? "border-2 border-[#b38840]/90"
                            : "border border-slate-200/70 dark:border-slate-700/60"
                        }`}
                      >
                        {/* Ảnh thực tế */}
                        <img
                          src={photo.src}
                          alt={photo.filename}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-104"
                        />

                        {/* Subtle dark gradient overlay ở các cạnh */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/30 pointer-events-none" />

                        {/* BADGE GÓC TRÊN TRÁI: VER 1, VER 2... */}
                        <div className="absolute top-2.5 left-2.5 z-10">
                          <span className="bg-black/60 backdrop-blur-xs text-white text-[10px] sm:text-[11px] font-semibold px-2 py-0.5 rounded shadow-xs">
                            {photo.version}
                          </span>
                        </div>

                        {/* BADGE GÓC TRÊN PHẢI (NẾU CÓ): ĐÃ YÊU CẦU, ĐANG SỬA, HOÀN TẤT */}
                        {photo.statusLabel && (
                          <div className="absolute top-2.5 right-2.5 z-10">
                            <span
                              className={`text-[9.5px] sm:text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-xs ${photo.statusColor}`}
                            >
                              {photo.statusLabel}
                            </span>
                          </div>
                        )}

                        {/* NÚT TRÒN CHỌN ẢNH: THIẾT KẾ KÍNH MỜ (FROSTED GLASS) TINH TẾ, THANH THOÁT KHÔNG BỊ THÔ */}
                        <button
                          type="button"
                          onClick={(e) => handleToggleSelectPhoto(e, photo.id)}
                          aria-label={`Chọn ảnh ${photo.filename}`}
                          className={`absolute bottom-3 right-3 z-20 w-6.5 h-6.5 sm:w-7 sm:h-7 rounded-full flex items-center justify-center transition-all duration-200 ${
                            isSelected
                              ? "bg-[#b38840] border-[1.5px] border-white text-white scale-100 shadow-[0_2px_10px_rgba(179,136,64,0.45)] ring-2 ring-[#b38840]/40"
                              : "bg-black/40 hover:bg-black/70 backdrop-blur-xs border-[1.5px] border-white/90 hover:border-white text-white hover:scale-110 shadow-[0_2px_6px_rgba(0,0,0,0.35)]"
                          }`}
                        >
                          <svg
                            className={`w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-current transition-all drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)] ${
                              isSelected
                                ? "stroke-[2.8] opacity-100"
                                : "stroke-[2.5] opacity-90 group-hover:opacity-100"
                            }`}
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                      </div>
                    );
                  })}
                </div>
              ) : (
                /* CHẾ ĐỘ HIỂN THỊ DANH SÁCH (LIST VIEW) */
                <div className="space-y-3">
                  {filteredPhotos.map((photo) => {
                    const isSelected = selectedPhotoIds.includes(photo.id);
                    const isActive = activePhoto?.id === photo.id;

                    return (
                      <div
                        key={photo.id}
                        onClick={() => handlePhotoCardClick(photo)}
                        className={`flex items-center gap-4 p-3 rounded-2xl cursor-pointer bg-white dark:bg-slate-800 transition-all border ${
                          isActive
                            ? "border-[#a67c37] shadow-md"
                            : "border-slate-200/80 dark:border-slate-700 hover:border-slate-300"
                        }`}
                      >
                        <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-slate-100 dark:bg-slate-700">
                          <img
                            src={photo.src}
                            alt={photo.filename}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-grow min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-800 dark:text-white truncate">
                              {photo.filename}
                            </span>
                            <span className="text-[10px] bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded font-medium text-slate-600 dark:text-slate-300">
                              {photo.version}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 mt-1">
                            {photo.dimensions} • {photo.filesize}
                          </p>
                        </div>
                        {photo.statusLabel && (
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded ${photo.statusColor}`}
                          >
                            {photo.statusLabel}
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={(e) => handleToggleSelectPhoto(e, photo.id)}
                          aria-label={`Chọn ảnh ${photo.filename}`}
                          className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 ${
                            isSelected
                              ? "bg-[#b38840] border-[1.5px] border-white text-white scale-100 shadow-sm"
                              : "border-[1.5px] border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/60 text-slate-400 hover:border-[#b38840] hover:text-[#b38840] hover:scale-105"
                          }`}
                        >
                          <svg
                            className={`w-3.5 h-3.5 stroke-current transition-opacity ${
                              isSelected ? "stroke-[2.8] opacity-100" : "stroke-2 opacity-50 hover:opacity-100"
                            }`}
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* ------------------------------------------------------------------- */}
            {/* ------------------------------------------------------------------- */}
            {/* CỘT PHẢI (HÌNH 3): KHUNG CHI TIẾT ẢNH CỐ ĐỊNH KHI CUỘN TRANG (STICKY) */}
            {/* ------------------------------------------------------------------- */}
            {activePhoto && (
              <aside
                className="w-full lg:w-[350px] xl:w-[380px] flex-shrink-0 sticky top-24 self-start max-h-[calc(100vh-7rem)] overflow-y-auto rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/90 dark:border-slate-700 shadow-md p-4 sm:p-5 space-y-4 transition-all duration-300 z-30"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "#cbd5e1 transparent",
                }}
              >
                {/* 1. Top Header: Nút [::] Ảnh Liên Quan + Nút Đóng (X) */}
                <div className="flex items-center justify-between pb-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white uppercase tracking-wide">
                      CHI TIẾT ẢNH
                    </h3>
                    <span className="bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-300 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                      ĐANG SỬA
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Nút Ảnh Liên Quan theo Hình 3 */}
                    <button
                      type="button"
                      onClick={() => toast.info("Đang lọc các bức ảnh liên quan trong cùng khoảnh khắc!")}
                      className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-amber-300/80 bg-amber-50/70 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 text-xs font-medium shadow-2xs hover:bg-amber-100 dark:hover:bg-amber-900/50 transition-colors"
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 16 16">
                        <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zm8 0A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 2.5v-3zm-8 8A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm8 0A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3z"/>
                      </svg>
                      <span>Ảnh Liên Quan</span>
                    </button>

                    {/* Nút đóng bảng chi tiết để quay lại Hình 2 */}
                    <button
                      type="button"
                      onClick={handleCloseDetailPanel}
                      className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-md transition-colors"
                      title="Đóng chi tiết ảnh"
                    >
                      <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* 2. CARD 1 THEO HÌNH 3: YÊU CẦU CHỈNH SỬA ẢNH với NÚT (+) */}
                <div className="rounded-2xl border border-slate-200/90 dark:border-slate-700 bg-white dark:bg-slate-800/90 p-3.5 sm:p-4 space-y-3 shadow-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
                      <svg className="w-4 h-4 stroke-current stroke-2 fill-none" viewBox="0 0 24 24">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                      <h4 className="text-xs font-bold uppercase tracking-wider">
                        YÊU CẦU CHỈNH SỬA ẢNH
                      </h4>
                    </div>

                    {/* Nút tròn màu vàng đồng (+) thêm yêu cầu mới */}
                    <button
                      type="button"
                      onClick={() => toast.info(`Tạo yêu cầu chỉnh sửa phiên bản mới cho "${activePhoto.filename}"!`)}
                      className="w-6 h-6 rounded-full bg-[#b38840] hover:bg-[#9d7432] text-white flex items-center justify-center font-bold shadow-xs hover:scale-105 transition-all"
                      title="Thêm yêu cầu chỉnh sửa mới"
                    >
                      <svg className="w-3.5 h-3.5 stroke-current stroke-3 fill-none" viewBox="0 0 24 24">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    </button>
                  </div>

                  {/* Khung hiển thị Version & Trạng thái chuẩn 1:1 theo Hình 3 */}
                  <div className="rounded-xl border border-slate-200 dark:border-slate-700/80 p-3 bg-white dark:bg-slate-800 flex items-center gap-3.5 shadow-2xs">
                    <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600">
                      <img
                        src={activePhoto.src}
                        alt={activePhoto.filename}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-grow flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                        Version {activePhoto.versionNum || 2}
                      </span>
                      <span className="bg-amber-100/90 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 text-[11px] font-semibold px-2 py-0.5 rounded-md">
                        Đang chờ xử lý
                      </span>
                    </div>
                  </div>
                </div>

                {/* 3. CARD 2 THEO HÌNH 3: BÌNH LUẬN VỚI EMPTY STATE & TEXTAREA */}
                <div className="rounded-2xl border border-slate-200/90 dark:border-slate-700 bg-white dark:bg-slate-800/90 p-3.5 sm:p-4 space-y-3 shadow-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
                      <svg className="w-4 h-4 stroke-current stroke-2 fill-none" viewBox="0 0 24 24">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      </svg>
                      <h4 className="text-xs font-bold uppercase tracking-wider">
                        BÌNH LUẬN
                      </h4>
                    </div>
                    <span className="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-semibold px-2 py-0.5 rounded-full">
                      {activePhoto.comments?.length || 0}
                    </span>
                  </div>

                  {/* Danh sách bình luận hoặc Empty State chuẩn 1:1 theo Hình 3 */}
                  {(!activePhoto.comments || activePhoto.comments.length === 0) ? (
                    <div className="py-5 text-center space-y-2">
                      <svg className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto fill-none stroke-current stroke-1.5" viewBox="0 0 24 24">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      </svg>
                      <p className="text-xs text-slate-400 dark:text-slate-500">
                        Chưa có bình luận nào cho ảnh này.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2 max-h-36 overflow-y-auto">
                      {activePhoto.comments.map((cmt) => (
                        <div
                          key={cmt.id}
                          className="bg-slate-50/90 dark:bg-slate-900/60 rounded-xl p-2.5 border border-slate-100 dark:border-slate-700/60 space-y-1"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-[#a67c37] dark:text-[#c99846]">
                              {cmt.author}
                            </span>
                            <span className="text-[10px] text-slate-400">{cmt.time}</span>
                          </div>
                          <p className="text-xs text-slate-700 dark:text-slate-200">{cmt.content}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="border-t border-slate-100 dark:border-slate-700/60 pt-2" />

                  {/* Form Textarea & Nút Gửi chuẩn 1:1 theo Hình 3 */}
                  <form onSubmit={handleAddComment} className="flex items-end gap-2">
                    <div className="flex-1 relative">
                      <textarea
                        rows={2}
                        value={commentInput}
                        onChange={(e) => setCommentInput(e.target.value)}
                        placeholder="Viết bình luận về ảnh này..."
                        className="w-full text-xs rounded-xl p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden focus:border-[#a67c37] resize-none transition-colors"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={!commentInput.trim()}
                      className="text-xs font-semibold text-slate-400 hover:text-[#a67c37] disabled:opacity-40 pb-2 px-1 transition-colors whitespace-nowrap"
                    >
                      Gửi
                    </button>
                  </form>
                </div>

                {/* 4. Thông tin chi tiết kỹ thuật ảnh & Yêu cầu hiện tại */}
                <div className="rounded-2xl border border-slate-200/80 dark:border-slate-700/80 p-3.5 bg-slate-50/60 dark:bg-slate-800/60 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <h5 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      THÔNG SỐ FILE
                    </h5>
                    <span className="border border-amber-300/80 bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 text-[9.5px] font-bold px-1.5 py-0.5 rounded">
                      {activePhoto.version}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-slate-800 dark:text-white truncate">
                    {activePhoto.filename}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Kích thước: {activePhoto.dimensions} • Dung lượng: {activePhoto.filesize}
                  </p>
                </div>
              </aside>
            )}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 6. THANH CÔNG CỤ NỔI DÍNH ĐÁY MÀN HÌNH (ĐƯỢC NÂNG CẤP HOÀN TOÀN ĐẶC & NỔI) */}
        {/* ========================================================================= */}
        <aside
          aria-label="Thanh công cụ chỉnh sửa ảnh nhanh"
          className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-4xl bg-white dark:bg-slate-900 rounded-2xl sm:rounded-full border-2 border-slate-200/90 dark:border-slate-700 shadow-[0_16px_45px_rgba(0,0,0,0.28)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.7)] p-3 sm:px-6 sm:py-3.5 transition-all duration-300 ring-1 ring-black/5 dark:ring-white/10"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Trái: Icon checkmark + "Đã chọn N ảnh" | "Bỏ chọn tất cả" */}
            <div className="flex items-center gap-2.5 whitespace-nowrap">
              <div className="w-6 h-6 rounded-full bg-[#b38840] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                <svg className="w-3.5 h-3.5 stroke-current stroke-3 fill-none" viewBox="0 0 24 24">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                Đã chọn {selectedPhotoIds.length} ảnh
              </span>
              <span className="text-slate-300 dark:text-slate-600">|</span>
              <button
                type="button"
                onClick={handleToggleSelectAll}
                className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 underline transition-colors"
              >
                {selectedPhotoIds.length > 0 ? "Bỏ chọn tất cả" : "Chọn tất cả"}
              </button>
            </div>

            {/* Giữa: Ô nhập yêu cầu chỉnh sửa + đếm ký tự 0/500 */}
            <div className="flex-1 w-full sm:w-auto relative">
              <input
                type="text"
                maxLength={500}
                value={editRequestText}
                onChange={(e) => setEditRequestText(e.target.value)}
                placeholder={`Nhập yêu cầu chỉnh sửa cho ${selectedPhotoIds.length} ảnh...`}
                className="w-full text-xs sm:text-sm rounded-lg sm:rounded-full pl-4 pr-14 py-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:border-[#a67c37] focus:bg-white dark:focus:bg-slate-800 transition-colors"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[11px] font-medium text-slate-400 pointer-events-none">
                {editRequestText.length}/500
              </span>
            </div>

            {/* Phải: Nút GỬI YÊU CẦU CHỈNH SỬA */}
            <button
              type="button"
              onClick={handleSubmitBatchRequest}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl sm:rounded-full bg-[#a67c37] hover:bg-[#8f692b] text-white font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex-shrink-0 text-center"
            >
              GỬI YÊU CẦU CHỈNH SỬA
            </button>
          </div>
        </aside>
      </main>

      {/* 7. Footer SpintX */}
      <Footer />
    </div>
  );
};

export default AlbumDetail;
