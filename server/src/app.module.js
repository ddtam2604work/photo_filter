/**
 * server/src/app.module.js
 * Root module quản lý các services và controllers của hệ thống PhotoFlow Backend / BFF
 */
import { AlbumService } from "./modules/album/album.service.js";
import { AlbumController } from "./modules/album/album.controller.js";

export class AppModule {
  constructor() {
    this.albumService = new AlbumService();
    this.albumController = new AlbumController(this.albumService);
  }

  registerRoutes(app) {
    // Health check endpoint
    app.get("/api/health", (req, res) => {
      res.json({
        status: "ok",
        framework: "NestJS / Express BFF",
        service: "PhotoFlow Backend Server",
        timestamp: new Date().toISOString(),
      });
    });

    // Album endpoints (tương thích 100% với src/api/core/albumApi.js của request-manager)
    app.get("/api/v1/albums/featured", (req, res) => this.albumController.getFeatured(req, res));
    app.get("/api/v1/albums/danh-sach", (req, res) => this.albumController.getList(req, res));
    app.post("/api/v1/albums/tao-moi", (req, res) => this.albumController.create(req, res));
  }
}
