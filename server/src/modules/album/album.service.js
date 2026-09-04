/**
 * server/src/modules/album/album.service.js
 * NestJS Service quản lý album ảnh cưới cho PhotoFlow
 */
export class AlbumService {
  constructor() {
    this.mockAlbums = [
      {
        id: "alb-01",
        title: "Hoàng Hôn Lãng Mạn - Minh & Thảo",
        coupleName: "Minh & Thảo",
        coverImage: "/images/gallery_center.jpg",
        photosCount: 120,
        createdAt: "2026-08-15",
        isFeatured: true,
      },
      {
        id: "alb-02",
        title: "Studio Cổ Điển - Tuấn & Hương",
        coupleName: "Tuấn & Hương",
        coverImage: "/images/gallery_studio.jpg",
        photosCount: 85,
        createdAt: "2026-08-20",
        isFeatured: true,
      },
      {
        id: "alb-03",
        title: "Bình Minh Biển - Khải & Vy",
        coupleName: "Khải & Vy",
        coverImage: "/images/gallery_beach.jpg",
        photosCount: 150,
        createdAt: "2026-08-28",
        isFeatured: true,
      },
      {
        id: "alb-04",
        title: "Retro Convertible - Đức & Linh",
        coupleName: "Đức & Linh",
        coverImage: "/images/gallery_car.jpg",
        photosCount: 95,
        createdAt: "2026-09-01",
        isFeatured: true,
      },
    ];
  }

  getFeaturedAlbums(limit = 4) {
    return {
      statusCode: 200,
      errorCode: 1,
      message: "Lấy danh sách album nổi bật thành công",
      data: this.mockAlbums.filter((a) => a.isFeatured).slice(0, limit),
    };
  }

  getAlbumList({ trang = 1, so_luong = 20, tim_kiem = "" }) {
    let filtered = [...this.mockAlbums];
    if (tim_kiem) {
      const keyword = tim_kiem.toLowerCase();
      filtered = filtered.filter(
        (a) =>
          a.title.toLowerCase().includes(keyword) ||
          a.coupleName.toLowerCase().includes(keyword)
      );
    }

    const total = filtered.length;
    const startIndex = (trang - 1) * so_luong;
    const items = filtered.slice(startIndex, startIndex + so_luong);

    return {
      statusCode: 200,
      errorCode: 1,
      message: "Lấy danh sách album thành công",
      data: {
        items,
        total,
        trang,
        so_luong,
        tong_so_trang: Math.ceil(total / so_luong),
      },
    };
  }

  createAlbum(data) {
    const newAlbum = {
      id: `alb-${Date.now()}`,
      title: data.ten_album || "Album cưới mới",
      coupleName: data.ten_cap_doi || "Cặp đôi",
      coverImage: "/images/carousel_1.jpg",
      photosCount: 0,
      createdAt: new Date().toISOString().split("T")[0],
      isFeatured: false,
      ...data,
    };

    this.mockAlbums.unshift(newAlbum);

    return {
      statusCode: 201,
      errorCode: 1,
      message: "Tạo album mới thành công!",
      data: newAlbum,
    };
  }
}
