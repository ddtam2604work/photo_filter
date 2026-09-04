import React, { forwardRef, useState } from "react";
import Icon from "./Icon";

const formatBytes = (bytes, decimals = 2) => {
  if (!+bytes) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

const Fileinput = forwardRef(
  (
    {
      name,
      label = "Tải tệp lên",
      onChange,
      onClear,
      placeholder = "Chọn tệp hoặc kéo thả vào đây...",
      multiple = false,
      preview = true,
      dropzone = false, // Chế độ vùng thả tệp mở rộng
      className = "",
      classLabel = "form-label mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200",
      classGroup = "",
      id,
      selectedFile,
      selectedFiles = [],
      disabled = false,
      accept,
      error,
      description,
      required = false,
      ...rest
    },
    ref
  ) => {
    const inputId = id || name || `file-${Math.random().toString(36).substr(2, 6)}`;
    const [isDragOver, setIsDragOver] = useState(false);

    const getPreviewUrl = (file) => {
      if (!file) return "";
      if (typeof file === "string") return file;
      try {
        return URL.createObjectURL(file);
      } catch {
        return "";
      }
    };

    const fileList = Array.isArray(selectedFiles)
      ? selectedFiles
      : selectedFiles instanceof FileList
      ? Array.from(selectedFiles)
      : [];

    const handleDragOver = (e) => {
      e.preventDefault();
      if (!disabled) setIsDragOver(true);
    };

    const handleDragLeave = () => {
      setIsDragOver(false);
    };

    const handleDrop = (e) => {
      e.preventDefault();
      setIsDragOver(false);
      if (disabled) return;
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        if (onChange) {
          onChange({
            target: {
              files: e.dataTransfer.files,
              name,
            },
          });
        }
      }
    };

    return (
      <div className={`form-group ${error ? "has-error" : ""} ${classGroup}`}>
        {label && (
          <label htmlFor={inputId} className={`block capitalize ${classLabel}`}>
            {label}
            {required && <span className="text-danger-500 ml-1 font-bold">*</span>}
          </label>
        )}

        <div className="file-input-wrapper relative">
          <input
            ref={ref}
            type="file"
            name={name}
            id={inputId}
            onChange={onChange}
            multiple={multiple}
            disabled={disabled}
            accept={accept}
            className="hidden"
            {...rest}
          />

          {/* 1. Drag & Drop Zone Mode */}
          {dropzone ? (
            <label
              htmlFor={inputId}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-150 text-center ${
                isDragOver
                  ? "border-primary-500 bg-primary-50/60 dark:bg-primary-950/20 scale-[1.01]"
                  : error
                  ? "border-danger-500 bg-danger-50/30 dark:bg-danger-950/20"
                  : "border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 hover:border-primary-500 hover:bg-slate-100/50 dark:hover:bg-slate-800/50"
              } ${disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : ""} ${className}`}
            >
              <div className="w-12 h-12 rounded-full bg-primary-100 text-primary-600 dark:bg-primary-900/50 dark:text-primary-300 flex items-center justify-center mb-3">
                <Icon icon="upload" size={24} />
              </div>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                <span className="text-primary-500 hover:underline">Nhấp để tải lên</span> hoặc kéo thả vào đây
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {accept ? `Hỗ trợ định dạng: ${accept}` : "PNG, JPG, PDF, DOCX hoặc tệp bất kỳ"}
              </p>
            </label>
          ) : (
            /* 2. Standard Compact Bar Mode */
            <label htmlFor={inputId} className="cursor-pointer block">
              <div
                className={`w-full min-h-[42px] flex items-center border rounded-md bg-white dark:bg-slate-900 transition-all ${
                  error
                    ? "border-danger-500"
                    : "border-slate-300 dark:border-slate-700 hover:border-primary-500"
                } ${disabled ? "opacity-60 bg-slate-100 dark:bg-slate-800 cursor-not-allowed" : ""} ${className}`}
              >
                <div className="flex-1 px-3.5 overflow-hidden text-ellipsis whitespace-nowrap text-sm text-slate-600 dark:text-slate-300">
                  {!multiple ? (
                    selectedFile ? (
                      <span className="font-medium text-slate-900 dark:text-white">
                        {typeof selectedFile === "string" ? selectedFile : selectedFile.name}
                      </span>
                    ) : (
                      <span className="text-slate-400">{placeholder}</span>
                    )
                  ) : fileList.length > 0 ? (
                    <span className="font-medium text-slate-900 dark:text-white">
                      Đã chọn {fileList.length} tệp
                    </span>
                  ) : (
                    <span className="text-slate-400">{placeholder}</span>
                  )}
                </div>

                <span className="flex-none border-l px-4 border-slate-200 dark:border-slate-700 h-[42px] inline-flex items-center bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-sm font-medium rounded-r-md gap-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                  <Icon icon="upload" size={16} />
                  <span>{label}</span>
                </span>
              </div>
            </label>
          )}
        </div>

        {error && (
          <p className="mt-1.5 text-xs text-danger-500 flex items-center gap-1">
            <Icon icon="alert-circle" size={12} />
            <span>{typeof error === "string" ? error : error?.message}</span>
          </p>
        )}

        {description && !error && (
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{description}</p>
        )}

        {/* Single File Image Preview */}
        {!multiple && preview && selectedFile && (
          <div className="relative inline-block mt-3 group">
            {typeof selectedFile !== "string" && selectedFile.type?.startsWith("image/") ? (
              <img
                src={getPreviewUrl(selectedFile)}
                className="w-24 h-24 rounded-lg object-cover border border-slate-200 dark:border-slate-700 shadow-sm"
                alt="preview"
              />
            ) : (
              <div className="flex items-center gap-2 p-3 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                <Icon icon="file" size={24} className="text-primary-500" />
                <div className="text-xs">
                  <p className="font-medium text-slate-800 dark:text-slate-200 truncate max-w-[160px]">
                    {selectedFile.name || selectedFile}
                  </p>
                  {selectedFile.size && (
                    <p className="text-slate-400">{formatBytes(selectedFile.size)}</p>
                  )}
                </div>
              </div>
            )}
            {onClear && (
              <button
                type="button"
                onClick={onClear}
                className="absolute -top-2 -right-2 bg-danger-500 text-white rounded-full p-1 shadow-md hover:bg-danger-600 transition"
                title="Gỡ tệp"
              >
                <Icon icon="x" size={12} />
              </button>
            )}
          </div>
        )}

        {/* Multi Files List Preview */}
        {multiple && preview && fileList.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
            {fileList.map((file, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2 bg-slate-50 dark:bg-slate-800/80 rounded-lg border border-slate-200 dark:border-slate-700"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <Icon
                    icon={file.type?.startsWith("image/") ? "image" : "file"}
                    size={20}
                    className="text-primary-500 flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-slate-800 dark:text-slate-200 truncate">
                      {file.name}
                    </p>
                    <p className="text-[10px] text-slate-400">{formatBytes(file.size)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
);

Fileinput.displayName = "Fileinput";
export default Fileinput;