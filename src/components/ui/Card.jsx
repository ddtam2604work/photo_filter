import React, { forwardRef } from "react";
import Icon from "./Icon";

const Card = forwardRef(
  (
    {
      children,
      title,
      subtitle,
      icon,
      headerslot,
      footer,
      img,
      imgTop = true,
      imgAlt = "Card media",
      imgClass = "w-full h-48 object-cover",
      className = "",
      headerClass = "",
      bodyClass = "p-5 sm:p-6",
      footerClass = "",
      titleClass = "",
      subtitleClass = "",
      noborder = false,
      bordered = false,
      shadow = true,
      hoverable = false,
      isLoading = false,
      loadingText = "Đang tải...",
      skin = "default", // 'default' | 'bordered' | 'flat' | 'glass'
      onClick,
      ...rest
    },
    ref
  ) => {
    const skinStyles = {
      default: shadow
        ? "bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-sm hover:shadow-md"
        : "bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80",
      bordered: "bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 shadow-none",
      flat: "bg-slate-100/70 dark:bg-slate-800/50 border-0 shadow-none",
      glass: "bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-white/20 dark:border-slate-700/40 shadow-lg",
    };

    const isBordered = bordered || skin === "bordered";
    const selectedSkin = skinStyles[skin] || skinStyles.default;

    const hoverStyle = hoverable
      ? "transition-all duration-200 hover:-translate-y-1 hover:shadow-lg cursor-pointer"
      : "transition-all duration-150";

    const hasHeader = Boolean(title || subtitle || icon || headerslot);

    return (
      <div
        ref={ref}
        onClick={onClick}
        className={`card relative rounded-xl text-slate-800 dark:text-slate-100 overflow-hidden ${selectedSkin} ${hoverStyle} ${className}`.trim()}
        {...rest}
      >
        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-white/70 dark:bg-slate-800/70 backdrop-blur-[2px] z-20 flex flex-col items-center justify-center gap-2 animate-[fadeIn_0.15s_ease-out]">
            <svg
              className="animate-spin h-7 w-7 text-primary-500"
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
            {loadingText && (
              <span className="text-xs font-medium text-slate-700 dark:text-slate-200">
                {loadingText}
              </span>
            )}
          </div>
        )}

        {/* Media Image Top */}
        {img && imgTop && (
          <div className="card-image-top overflow-hidden">
            <img src={img} alt={imgAlt} className={imgClass} />
          </div>
        )}

        {/* Header */}
        {hasHeader && (
          <header
            className={`card-header px-5 py-4 sm:px-6 flex items-center justify-between gap-3 ${
              noborder ? "" : "border-b border-slate-100 dark:border-slate-700/80"
            } ${headerClass}`}
          >
            <div className="flex items-center gap-3 min-w-0">
              {icon && (
                <span className="text-primary-500 flex-shrink-0">
                  {typeof icon === "string" ? <Icon icon={icon} size={20} /> : icon}
                </span>
              )}
              <div className="min-w-0">
                {title && (
                  <h3
                    className={`card-title text-base font-semibold truncate text-slate-900 dark:text-white ${titleClass}`}
                  >
                    {title}
                  </h3>
                )}
                {subtitle && (
                  <p
                    className={`card-subtitle text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate ${subtitleClass}`}
                  >
                    {subtitle}
                  </p>
                )}
              </div>
            </div>
            {headerslot && (
              <div className="card-header-slot flex-shrink-0 flex items-center gap-2">
                {headerslot}
              </div>
            )}
          </header>
        )}

        {/* Body */}
        <main className={`card-body ${bodyClass}`}>{children}</main>

        {/* Media Image Bottom */}
        {img && !imgTop && (
          <div className="card-image-bottom overflow-hidden">
            <img src={img} alt={imgAlt} className={imgClass} />
          </div>
        )}

        {/* Footer */}
        {footer && (
          <footer
            className={`card-footer px-5 py-3.5 sm:px-6 bg-slate-50/70 dark:bg-slate-700/20 border-t border-slate-100 dark:border-slate-700/80 flex items-center justify-between text-sm ${footerClass}`}
          >
            {footer}
          </footer>
        )}
      </div>
    );
  }
);

Card.displayName = "Card";
export default Card;