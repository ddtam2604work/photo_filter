import React, { useState } from "react";
import Icon from "./Icon";

const Alert = ({
  type = "info", // 'success' | 'info' | 'warning' | 'danger'
  variant = "soft", // 'soft' | 'solid' | 'outline'
  title,
  children,
  icon,
  dismissible = false,
  onClose,
  actionSlot,
  className = "",
}) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const handleDismiss = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };

  const defaultIcons = {
    success: "check-circle",
    info: "info",
    warning: "alert-triangle",
    danger: "alert-circle",
  };

  const variantStyles = {
    // 1. Soft / Subtle
    soft: {
      success: "bg-success-50 text-success-800 border-success-200 dark:bg-success-950/40 dark:text-success-200 dark:border-success-800/50",
      info: "bg-info-50 text-info-800 border-info-200 dark:bg-info-950/40 dark:text-info-200 dark:border-info-800/50",
      warning: "bg-warning-50 text-warning-800 border-warning-200 dark:bg-warning-950/40 dark:text-warning-200 dark:border-warning-800/50",
      danger: "bg-danger-50 text-danger-800 border-danger-200 dark:bg-danger-950/40 dark:text-danger-200 dark:border-danger-800/50",
    },
    // 2. Solid
    solid: {
      success: "bg-success-500 text-white border-transparent",
      info: "bg-info-500 text-white border-transparent",
      warning: "bg-warning-500 text-white border-transparent",
      danger: "bg-danger-500 text-white border-transparent",
    },
    // 3. Outline
    outline: {
      success: "bg-transparent text-success-600 border-success-500 dark:text-success-400",
      info: "bg-transparent text-info-600 border-info-500 dark:text-info-400",
      warning: "bg-transparent text-warning-600 border-warning-500 dark:text-warning-400",
      danger: "bg-transparent text-danger-600 border-danger-500 dark:text-danger-400",
    },
  };

  const currentVariant = variantStyles[variant] || variantStyles.soft;
  const currentClass = currentVariant[type] || currentVariant.info;
  const currentIcon = icon !== undefined ? icon : defaultIcons[type];

  return (
    <div
      role="alert"
      className={`alert flex items-start gap-3 p-4 rounded-xl border transition-all duration-150 ${currentClass} ${className}`}
    >
      {currentIcon && (
        <span className="flex-shrink-0 mt-0.5">
          {typeof currentIcon === "string" ? <Icon icon={currentIcon} size={20} /> : currentIcon}
        </span>
      )}

      <div className="flex-1 min-w-0">
        {title && <h5 className="font-semibold text-sm leading-tight mb-1">{title}</h5>}
        {children && <div className="text-xs leading-relaxed opacity-90">{children}</div>}
      </div>

      {actionSlot && <div className="flex-shrink-0 ml-2">{actionSlot}</div>}

      {dismissible && (
        <button
          type="button"
          onClick={handleDismiss}
          className="flex-shrink-0 -mr-1 -mt-1 p-1 rounded-lg opacity-70 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/10 transition-all focus:outline-none"
          title="Đóng thông báo"
        >
          <Icon icon="x" size={16} />
        </button>
      )}
    </div>
  );
};

export default Alert;
