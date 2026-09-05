import React, { useState, useEffect } from "react";

// Ảnh placeholder mặc định khi hình rỗng hoặc tải lỗi
export const FALLBACK_IMAGE =
  "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22400%22%20height%3D%22300%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20400%20300%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_text%20%7B%20fill%3A%2394a3b8%3Bfont-weight%3A600%3Bfont-family%3Asans-serif%2Cmonospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Crect%20width%3D%22400%22%20height%3D%22300%22%20fill%3D%22%231e293b%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20id%3D%22holder_text%22%20x%3D%22140%22%20y%3D%22155%22%3EPhotoFlow%20Image%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fsvg%3E";

/**
 * Kiểm tra xem nguồn hình ảnh có phải là dạng tải lên (File / Blob / base64) hay không
 * @param {any} source
 * @returns {boolean}
 */
export const isUploadedFile = (source) => {
  if (!source) return false;
  if (typeof File !== "undefined" && source instanceof File) return true;
  if (typeof Blob !== "undefined" && source instanceof Blob) return true;
  if (typeof source === "string" && (source.startsWith("data:") || source.startsWith("blob:"))) return true;
  if (typeof source === "object" && (source.file || source.preview)) return true;
  return false;
};

/**
 * Kiểm tra xem nguồn hình ảnh có phải là liên kết web (HTTP/HTTPS/CDN/Absolute URL) hay không
 * @param {any} source
 * @returns {boolean}
 */
export const isLinkUrl = (source) => {
  if (typeof source !== "string") return false;
  return (
    source.startsWith("http://") ||
    source.startsWith("https://") ||
    source.startsWith("//") ||
    source.startsWith("/")
  );
};

/**
 * Helper Adapter chuẩn hóa nguồn ảnh từ 2 dạng:
 * 1. Dạng tải lên (Uploaded): File, Blob, Data URI, local upload path
 * 2. Dạng liên kết (Link): URL tuyệt đối, CDN, static link
 *
 * @param {string|File|Blob|object} source - Dữ liệu hình ảnh đầu vào
 * @param {object} [options={}] - Các tùy chọn bổ sung
 * @param {string} [options.fallback] - URL ảnh thay thế khi không có ảnh
 * @param {string} [options.apiBaseUrl] - URL gốc backend (mặc định "")
 * @returns {{ src: string, isBlob: boolean, revoke: () => void }}
 */
export const resolveImageSrc = (source, options = {}) => {
  const fallback = options.fallback || FALLBACK_IMAGE;
  const apiBaseUrl = options.apiBaseUrl || "";

  if (!source) {
    return { src: fallback, isBlob: false, revoke: () => {} };
  }

  // 1. Dạng tải lên trực tiếp: File hoặc Blob từ máy người dùng
  if (
    (typeof File !== "undefined" && source instanceof File) ||
    (typeof Blob !== "undefined" && source instanceof Blob)
  ) {
    const objectUrl = URL.createObjectURL(source);
    return {
      src: objectUrl,
      isBlob: true,
      revoke: () => URL.revokeObjectURL(objectUrl),
    };
  }

  // 2. Dạng đối tượng từ các thư viện upload (như react-dropzone, custom uploader)
  if (typeof source === "object") {
    if (source.preview && typeof source.preview === "string") {
      return { src: source.preview, isBlob: false, revoke: () => {} };
    }
    if (source.url && typeof source.url === "string") {
      return resolveImageSrc(source.url, options);
    }
    if (source.src && typeof source.src === "string") {
      return resolveImageSrc(source.src, options);
    }
    if (source.path && typeof source.path === "string") {
      return resolveImageSrc(source.path, options);
    }
    if (source.file) {
      return resolveImageSrc(source.file, options);
    }
  }

  // 3. Dạng chuỗi (String)
  if (typeof source === "string") {
    const trimmed = source.trim();
    if (!trimmed) {
      return { src: fallback, isBlob: false, revoke: () => {} };
    }

    // Data URI hoặc Blob URL đã sinh trước đó
    if (trimmed.startsWith("data:") || trimmed.startsWith("blob:")) {
      return { src: trimmed, isBlob: false, revoke: () => {} };
    }

    // Liên kết mạng tuyệt đối (Link dạng HTTP/HTTPS/CDN)
    if (
      trimmed.startsWith("http://") ||
      trimmed.startsWith("https://") ||
      trimmed.startsWith("//")
    ) {
      return { src: trimmed, isBlob: false, revoke: () => {} };
    }

    // Đường dẫn nội bộ static hoặc uploads từ server
    if (trimmed.startsWith("/")) {
      return { src: trimmed, isBlob: false, revoke: () => {} };
    }

    // Đường dẫn tương đối từ backend uploads (ví dụ "uploads/2026/09/wedding.jpg")
    if (trimmed.startsWith("uploads/")) {
      const fullUrl = apiBaseUrl ? `${apiBaseUrl}/${trimmed}` : `/${trimmed}`;
      return { src: fullUrl, isBlob: false, revoke: () => {} };
    }

    // Fallback: coi như đường dẫn tương đối từ root
    return { src: `/${trimmed}`, isBlob: false, revoke: () => {} };
  }

  return { src: fallback, isBlob: false, revoke: () => {} };
};

/**
 * ImageAdapter Component — Thành phần hiển thị hình ảnh chuẩn hóa cho toàn dự án
 * Tự động thích ứng cả 2 dạng: ảnh tải lên (file/blob) và ảnh đường link web (URL)
 */
const ImageAdapter = ({
  src,
  alt = "PhotoFlow Image",
  className = "",
  fallbackSrc = FALLBACK_IMAGE,
  loading = "lazy",
  objectFit = "cover",
  onError,
  onLoad,
  style = {},
  ...rest
}) => {
  const [currentSrc, setCurrentSrc] = useState(fallbackSrc);
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Xử lý adapter nguồn ảnh và tự động giải phóng URL nếu là Blob
  useEffect(() => {
    setHasError(false);
    setIsLoaded(false);

    const resolved = resolveImageSrc(src, { fallback: fallbackSrc });
    setCurrentSrc(resolved.src);

    return () => {
      if (resolved.isBlob) {
        resolved.revoke();
      }
    };
  }, [src, fallbackSrc]);

  const handleError = (e) => {
    if (!hasError) {
      setHasError(true);
      setCurrentSrc(fallbackSrc);
      if (onError) onError(e);
    }
  };

  const handleLoad = (e) => {
    setIsLoaded(true);
    if (onLoad) onLoad(e);
  };

  return (
    <img
      src={currentSrc}
      alt={alt}
      loading={loading}
      onError={handleError}
      onLoad={handleLoad}
      className={`${className} ${
        objectFit === "cover"
          ? "object-cover"
          : objectFit === "contain"
          ? "object-contain"
          : ""
      }`}
      style={{
        ...style,
      }}
      {...rest}
    />
  );
};

export default ImageAdapter;
