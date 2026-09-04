/**
 * server/src/modules/album/album.controller.js
 * NestJS Controller định tuyến các endpoint /api/v1/albums
 */
export class AlbumController {
  constructor(albumService) {
    this.albumService = albumService;
  }

  getFeatured(req, res) {
    const limit = parseInt(req.query.limit, 10) || 4;
    const result = this.albumService.getFeaturedAlbums(limit);
    return res.json(result);
  }

  getList(req, res) {
    const trang = parseInt(req.query.trang, 10) || 1;
    const so_luong = parseInt(req.query.so_luong, 10) || 20;
    const tim_kiem = req.query.tim_kiem || "";
    const result = this.albumService.getAlbumList({ trang, so_luong, tim_kiem });
    return res.json(result);
  }

  create(req, res) {
    const result = this.albumService.createAlbum(req.body);
    return res.status(201).json(result);
  }
}
