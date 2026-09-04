import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import Icon from "./Icon";

const ToastContext = createContext(null);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export const ToastProvider = ({ children, position = "top-right" }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    ({ type = "info", title, message, duration = 4000, icon, action }) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
      const newToast = { id, type, title, message, duration, icon, action, createdAt: Date.now() };

      setToasts((prev) => [...prev, newToast]);

      if (duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }
      return id;
    },
    [removeToast]
  );

  const toastHelpers = {
    show: addToast,
    success: (message, options = {}) =>
      addToast({ type: "success", message, title: options.title || "Thành công!", ...options }),
    error: (message, options = {}) =>
      addToast({ type: "danger", message, title: options.title || "Lỗi xử lý!", ...options }),
    warning: (message, options = {}) =>
      addToast({ type: "warning", message, title: options.title || "Cảnh báo!", ...options }),
    info: (message, options = {}) =>
      addToast({ type: "info", message, title: options.title || "Thông tin", ...options }),
    remove: removeToast,
  };

  const positionClasses = {
    "top-right": "top-5 right-5 items-end",
    "top-left": "top-5 left-5 items-start",
    "top-center": "top-5 left-1/2 -translate-x-1/2 items-center",
    "bottom-right": "bottom-5 right-5 items-end",
    "bottom-left": "bottom-5 left-5 items-start",
    "bottom-center": "bottom-5 left-1/2 -translate-x-1/2 items-center",
  };

  const typeConfig = {
    success: {
      border: "border-success-500",
      iconBg: "bg-success-100 text-success-600 dark:bg-success-900/50 dark:text-success-300",
      icon: "check-circle",
    },
    danger: {
      border: "border-danger-500",
      iconBg: "bg-danger-100 text-danger-600 dark:bg-danger-900/50 dark:text-danger-300",
      icon: "alert-circle",
    },
    warning: {
      border: "border-warning-500",
      iconBg: "bg-warning-100 text-warning-600 dark:bg-warning-900/50 dark:text-warning-300",
      icon: "alert-triangle",
    },
    info: {
      border: "border-primary-500",
      iconBg: "bg-primary-100 text-primary-600 dark:bg-primary-900/50 dark:text-primary-300",
      icon: "info",
    },
  };

  return (
    <ToastContext.Provider value={toastHelpers}>
      {children}
      {/* Toast Notification Container */}
      <div
        className={`fixed z-[999999] flex flex-col gap-2.5 pointer-events-none ${
          positionClasses[position] || positionClasses["top-right"]
        }`}
      >
        {toasts.map((t) => {
          const config = typeConfig[t.type] || typeConfig.info;
          const currentIcon = t.icon || config.icon;

          return (
            <div
              key={t.id}
              className={`pointer-events-auto w-80 sm:w-96 rounded-xl bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 p-4 shadow-xl border-l-4 ${config.border} border-y border-r border-slate-200/80 dark:border-slate-700/80 flex items-start gap-3 transform transition-all duration-200 animate-[slideInRight_0.2s_ease-out]`}
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${config.iconBg}`}
              >
                <Icon icon={currentIcon} size={18} />
              </div>

              <div className="flex-1 min-w-0">
                {t.title && (
                  <h5 className="font-semibold text-sm leading-snug text-slate-900 dark:text-white">
                    {t.title}
                  </h5>
                )}
                {t.message && (
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">
                    {t.message}
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={() => removeToast(t.id)}
                className="flex-shrink-0 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-md transition-colors"
              >
                <Icon icon="x" size={14} />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export default ToastProvider;
