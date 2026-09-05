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

/**
 * Lấy chi tiết album bao gồm danh sách ảnh và lịch sử phiên bản
 * @param {string|number} albumId
 */
export const getAlbumDetailApi = (albumId) =>
  callApi.get(`/api/v1/albums/chi-tiet/${albumId}`, {}, { showOverlay: false });

/**
 * Gửi yêu cầu chỉnh sửa cho danh sách ảnh đã chọn
 * @param {{ album_id: string|number, photo_ids: Array<string|number>, yeu_cau: string }} data
 */
export const updatePhotoFeedbackApi = (data) =>
  callApi.post("/api/v1/albums/gui-yeu-cau-chinh-sua", data, { showOverlay: true });

/**
 * Thêm bình luận cho một bức ảnh cụ thể
 * @param {{ photo_id: string|number, noi_dung: string, nguoi_gui?: string }} data
 */
export const addPhotoCommentApi = (data) =>
  callApi.post("/api/v1/albums/binh-luan-anh", data, { showOverlay: true });

/**
 * Hủy yêu cầu chỉnh sửa cho một hoặc nhiều ảnh, chuyển trạng thái về bình thường
 * @param {{ album_id: string|number, photo_ids: Array<string|number> }} data
 */
export const cancelPhotoRequestApi = (data) =>
  callApi.post("/api/v1/albums/huy-yeu-cau-chinh-sua", data, { showOverlay: true });


