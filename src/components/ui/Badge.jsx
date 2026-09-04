import React from "react";
import Icon from "./Icon";

const Badge = ({
  children,
  label,
  variant = "soft", // 'soft' | 'solid' | 'outline' | 'dot'
  color = "primary", // 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light'
  size = "sm", // 'xs' | 'sm' | 'md' | 'lg'
  rounded = false,
  pill = true,
  icon,
  iconPosition = "left",
  dismissible = false,
  onDismiss,
  className = "",
}) => {
  const content = label || children;

  const colorVariants = {
    // 1. Soft / Subtle
    soft: {
      primary: "bg-primary-100 text-primary-800 dark:bg-primary-900/40 dark:text-primary-300",
      secondary: "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300",
      success: "bg-success-100 text-success-800 dark:bg-success-900/40 dark:text-success-300",
      danger: "bg-danger-100 text-danger-800 dark:bg-danger-900/40 dark:text-danger-300",
      warning: "bg-warning-100 text-warning-800 dark:bg-warning-900/40 dark:text-warning-300",
      info: "bg-info-100 text-info-800 dark:bg-info-900/40 dark:text-info-300",
      dark: "bg-slate-900 text-slate-100 dark:bg-slate-700",
      light: "bg-slate-50 text-slate-600 border border-slate-200 dark:bg-slate-800 dark:text-slate-300",
    },
    // 2. Solid
    solid: {
      primary: "bg-primary-500 text-white",
      secondary: "bg-slate-700 text-white",
      success: "bg-success-500 text-white",
      danger: "bg-danger-500 text-white",
      warning: "bg-warning-500 text-white",
      info: "bg-info-500 text-white",
      dark: "bg-slate-900 text-white",
      light: "bg-slate-200 text-slate-800",
    },
    // 3. Outline
    outline: {
      primary: "border border-primary-500 text-primary-600 dark:text-primary-400 bg-transparent",
      secondary: "border border-slate-400 text-slate-600 dark:text-slate-300 bg-transparent",
      success: "border border-success-500 text-success-600 dark:text-success-400 bg-transparent",
      danger: "border border-danger-500 text-danger-600 dark:text-danger-400 bg-transparent",
      warning: "border border-warning-500 text-warning-600 dark:text-warning-400 bg-transparent",
      info: "border border-info-500 text-info-600 dark:text-info-400 bg-transparent",
      dark: "border border-slate-900 text-slate-900 dark:border-slate-400 dark:text-slate-100 bg-transparent",
      light: "border border-slate-300 text-slate-600 bg-transparent",
    },
    // 4. Dot Indicator
    dot: {
      primary: "bg-primary-500",
      secondary: "bg-slate-500",
      success: "bg-success-500",
      danger: "bg-danger-500",
      warning: "bg-warning-500",
      info: "bg-info-500",
      dark: "bg-slate-900 dark:bg-slate-100",
      light: "bg-slate-400",
    },
  };

  const sizeVariants = {
    xs: "px-1.5 py-0.2 text-[10px]",
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-1 text-xs",
    lg: "px-3 py-1.5 text-sm",
  };

  const isDot = variant === "dot";
  const selectedStyle = colorVariants[variant] || colorVariants.soft;
  const currentClass = selectedStyle[color] || selectedStyle.primary;

  if (isDot) {
    return (
      <span className={`inline-flex items-center gap-1.5 font-medium text-xs text-slate-700 dark:text-slate-300 ${className}`}>
        <span className={`w-2 h-2 rounded-full ${currentClass}`} />
        {content}
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center justify-center font-medium select-none transition-all ${
        pill || rounded ? "rounded-full" : "rounded-md"
      } ${sizeVariants[size] || sizeVariants.sm} ${currentClass} ${className}`}
    >
      {icon && iconPosition === "left" && (
        <span className="mr-1 inline-flex items-center">
          <Icon icon={icon} size={size === "xs" ? 10 : 12} />
        </span>
      )}

      <span>{content}</span>

      {icon && iconPosition === "right" && (
        <span className="ml-1 inline-flex items-center">
          <Icon icon={icon} size={size === "xs" ? 10 : 12} />
        </span>
      )}

      {dismissible && (
        <button
          type="button"
          onClick={onDismiss}
          className="ml-1 -mr-0.5 p-0.5 rounded-full hover:bg-black/10 dark:hover:bg-white/20 transition-colors"
        >
          <Icon icon="x" size={size === "xs" ? 10 : 12} />
        </button>
      )}
    </span>
  );
};

export default Badge;
