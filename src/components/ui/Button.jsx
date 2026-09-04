import React, { forwardRef } from "react";
import Icon from "./Icon";

const Button = forwardRef(
  (
    {
      text,
      type = "button",
      isLoading = false,
      disabled = false,
      className = "",
      children,
      icon,
      loadingClass = "",
      iconPosition = "left",
      iconClass = "",
      link,
      target,
      onClick,
      div = false,
      loadingText = "Đang xử lý...",
      variant = "primary",
      size = "md",
      block = false,
      rounded = false,
      iconOnly = false,
      ...rest
    },
    ref
  ) => {
    // Semantic color variants
    const variantMap = {
      // Solid Variants
      primary: "bg-primary-500 hover:bg-primary-600 active:bg-primary-700 text-white shadow-sm hover:shadow",
      secondary: "bg-slate-700 hover:bg-slate-800 active:bg-slate-900 text-white shadow-sm",
      success: "bg-success-500 hover:bg-success-600 active:bg-success-700 text-white shadow-sm hover:shadow",
      danger: "bg-danger-500 hover:bg-danger-600 active:bg-danger-700 text-white shadow-sm hover:shadow",
      warning: "bg-warning-500 hover:bg-warning-600 active:bg-warning-700 text-white shadow-sm hover:shadow",
      info: "bg-info-500 hover:bg-info-600 active:bg-info-700 text-white shadow-sm hover:shadow",
      dark: "bg-slate-900 hover:bg-black active:bg-slate-950 text-white shadow-sm",
      light: "bg-slate-100 hover:bg-slate-200 text-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-100",
      
      // Outline Variants
      "outline-primary": "border border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white dark:hover:text-white",
      "outline-secondary": "border border-slate-500 text-slate-600 hover:bg-slate-600 hover:text-white dark:text-slate-300 dark:hover:bg-slate-600",
      "outline-success": "border border-success-500 text-success-500 hover:bg-success-500 hover:text-white",
      "outline-danger": "border border-danger-500 text-danger-500 hover:bg-danger-500 hover:text-white",
      "outline-warning": "border border-warning-500 text-warning-500 hover:bg-warning-500 hover:text-white",
      "outline-info": "border border-info-500 text-info-500 hover:bg-info-500 hover:text-white",
      "outline-dark": "border border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white dark:border-slate-400 dark:text-slate-100 dark:hover:bg-slate-700",

      // Soft / Subtle Variants
      "soft-primary": "bg-primary-50 text-primary-600 hover:bg-primary-100 dark:bg-primary-950/40 dark:text-primary-300 dark:hover:bg-primary-900/50",
      "soft-success": "bg-success-50 text-success-600 hover:bg-success-100 dark:bg-success-950/40 dark:text-success-300 dark:hover:bg-success-900/50",
      "soft-danger": "bg-danger-50 text-danger-600 hover:bg-danger-100 dark:bg-danger-950/40 dark:text-danger-300 dark:hover:bg-danger-900/50",
      "soft-warning": "bg-warning-50 text-warning-600 hover:bg-warning-100 dark:bg-warning-950/40 dark:text-warning-300 dark:hover:bg-warning-900/50",
      "soft-info": "bg-info-50 text-info-600 hover:bg-info-100 dark:bg-info-950/40 dark:text-info-300 dark:hover:bg-info-900/50",
      "soft-secondary": "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700",

      // Ghost & Link
      ghost: "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800",
      link: "text-primary-500 hover:underline p-0 !h-auto !shadow-none font-normal",
      none: "",
    };

    const sizeMap = {
      xs: iconOnly ? "w-7 h-7 p-0 text-xs" : "py-1 px-2.5 text-xs gap-1",
      sm: iconOnly ? "w-8 h-8 p-0 text-sm" : "py-1.5 px-3 text-xs gap-1.5",
      md: iconOnly ? "w-10 h-10 p-0 text-base" : "py-2 px-4 text-sm gap-2",
      lg: iconOnly ? "w-12 h-12 p-0 text-lg" : "py-2.5 px-5 text-base gap-2.5",
      xl: iconOnly ? "w-14 h-14 p-0 text-xl" : "py-3.5 px-6 text-lg gap-3",
    };

    const selectedVariant = variantMap[variant] || variantMap.primary;
    const selectedSize = sizeMap[size] || sizeMap.md;

    const combinedClassName = `btn relative inline-flex items-center justify-center font-medium transition-all duration-150 select-none focus:outline-none focus:ring-2 focus:ring-primary-500/20 active:scale-[0.98] ${
      rounded ? "rounded-full" : "rounded-md"
    } ${block ? "w-full flex" : ""} ${selectedSize} ${selectedVariant} ${
      isLoading ? "pointer-events-none cursor-wait opacity-80" : ""
    } ${
      disabled ? "opacity-50 pointer-events-none cursor-not-allowed shadow-none active:scale-100" : "cursor-pointer"
    } ${className}`.trim();

    const renderContent = () => {
      if (isLoading) {
        return (
          <>
            <svg
              className={`animate-spin h-4 w-4 text-current flex-shrink-0 ${
                loadingText && !iconOnly ? "-ml-1 mr-2" : ""
              } ${loadingClass}`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            {!iconOnly && loadingText && <span>{loadingText}</span>}
          </>
        );
      }

      if (children) return children;

      if (iconOnly && icon) {
        return <Icon icon={icon} className={iconClass} />;
      }

      return (
        <>
          {icon && iconPosition === "left" && (
            <span className={`inline-flex items-center flex-shrink-0 ${iconClass}`}>
              <Icon icon={icon} />
            </span>
          )}
          {text && <span>{text}</span>}
          {icon && iconPosition === "right" && (
            <span className={`inline-flex items-center flex-shrink-0 ${iconClass}`}>
              <Icon icon={icon} />
            </span>
          )}
        </>
      );
    };

    if (div) {
      return (
        <div ref={ref} onClick={disabled || isLoading ? undefined : onClick} className={combinedClassName} {...rest}>
          {renderContent()}
        </div>
      );
    }

    if (link) {
      return (
        <a
          ref={ref}
          href={link}
          target={target}
          rel={target === "_blank" ? "noopener noreferrer" : undefined}
          className={combinedClassName}
          onClick={disabled || isLoading ? (e) => e.preventDefault() : onClick}
          {...rest}
        >
          {renderContent()}
        </a>
      );
    }

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        onClick={onClick}
        className={combinedClassName}
        {...rest}
      >
        {renderContent()}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;