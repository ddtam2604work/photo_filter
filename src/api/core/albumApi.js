// src/api/core/albumApi.js
import callApi from "../configs/callApi";

/**
 * Lấy danh sách các album nổi bật hiển thị trên landing page
 * @param {{ limit?: number }} [params={}]
 */
export const getFeaturedAlbumsApi = (params = {}) =>
  callApi.get("/api/v1/albums/featured", {
    limit: params.limit || 6,
  }, { showOverlay: false });

/**
 * Lấy danh sách album phân trang cho studio
 * @param {{ trang?: number, so_luong?: number, tim_kiem?: string }} [params={}]
 */
export const getAlbumListApi = (params = {}) =>
  callApi.get("/api/v1/albums/danh-sach", {
    trang: params.trang || 1,
    so_luong: params.so_luong || 20,
    tim_kiem: params.tim_kiem || "",
  }, { showOverlay: false });

/**
 * Tạo mới album ảnh cưới cho khách hàng
 * @param {{ ten_album: string, ten_cap_doi: string, ngay_chup: string, mo_ta?: string }} data
 */
export const createAlbumApi = (data) =>
  callApi.post("/api/v1/albums/tao-moi", data, { showOverlay: true });

/**
 * Khách hàng đánh dấu ảnh yêu thích để chỉnh sửa
 * @param {{ album_id: string, photo_id: string, yeu_thich: boolean }} data
 */
export const toggleFavoritePhotoApi = (data) =>
  callApi.post("/api/v1/albums/danh-dau-anh", data, { showOverlay: true });
