import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { AppModule } from "./src/app.module.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || process.env.BACKEND_PORT || 6521;

app.use(cors());
app.use(express.json());

// Khởi tạo NestJS AppModule
const appModule = new AppModule();
appModule.registerRoutes(app);

// Serve built frontend assets từ dist/ (nếu đã build)
const distPath = path.join(__dirname, "../dist");
app.use(express.static(distPath));

app.get("*", (req, res, next) => {
  if (req.url.startsWith("/api/")) {
    return next();
  }
  const indexPath = path.join(distPath, "index.html");
  res.sendFile(indexPath, (err) => {
    if (err) {
      res.status(200).send("PhotoFlow Frontend Server is running. Chạy 'npm run dev' để phát triển giao diện.");
    }
  });
});

app.listen(PORT, () => {
  console.log(`[PhotoFlow Server] Đang chạy tại http://localhost:${PORT}`);
  console.log(`[PhotoFlow Server] Health check: http://localhost:${PORT}/api/health`);
  console.log(`[PhotoFlow Server] Featured Albums API: http://localhost:${PORT}/api/v1/albums/featured`);
});
