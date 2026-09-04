import React, { useEffect } from "react";
import Icon from "./Icon";

const Drawer = ({
  isOpen = false,
  onClose,
  title = "Chi tiết",
  subtitle,
  placement = "right", // 'right' | 'left' | 'top' | 'bottom'
  size = "md",
  headerSlot,
  footerContent,
  hasCloseButton = true,
  children,
  className = "",
  bodyClass = "p-6",
  headerClass = "",
  footerClass = "",
  backdrop = true,
  staticBackdrop = false,
  ...rest
}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen && !staticBackdrop) {
        if (onClose) onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, staticBackdrop]);

  if (!isOpen) return null;

  const placementClasses = {
    right: {
      container: "justify-end",
      panel: "h-full animate-[slideInRight_0.25s_ease-out]",
      sizes: {
        sm: "w-full max-w-xs",
        md: "w-full max-w-md",
        lg: "w-full max-w-xl",
        xl: "w-full max-w-3xl",
        full: "w-full",
      },
    },
    left: {
      container: "justify-start",
      panel: "h-full animate-[slideInLeft_0.25s_ease-out]",
      sizes: {
        sm: "w-full max-w-xs",
        md: "w-full max-w-md",
        lg: "w-full max-w-xl",
        xl: "w-full max-w-3xl",
        full: "w-full",
      },
    },
    top: {
      container: "items-start",
      panel: "w-full animate-[slideInDown_0.25s_ease-out]",
      sizes: {
        sm: "max-h-48",
        md: "max-h-72",
        lg: "max-h-96",
        xl: "max-h-[80vh]",
        full: "h-full",
      },
    },
    bottom: {
      container: "items-end",
      panel: "w-full rounded-t-2xl animate-[slideInUp_0.25s_ease-out]",
      sizes: {
        sm: "max-h-48",
        md: "max-h-72",
        lg: "max-h-96",
        xl: "max-h-[80vh]",
        full: "h-full",
      },
    },
  };

  const currentPlacement = placementClasses[placement] || placementClasses.right;
  const currentSize = currentPlacement.sizes[size] || currentPlacement.sizes.md;

  return (
    <div className="fixed inset-0 z-[99999] overflow-hidden" {...rest}>
      {backdrop && (
        <div
          onClick={staticBackdrop ? undefined : onClose}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300 animate-[fadeIn_0.2s_ease-out]"
        />
      )}

      <div className={`fixed inset-0 flex pointer-events-none ${currentPlacement.container}`}>
        <div
          className={`pointer-events-auto flex flex-col bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 shadow-2xl transition-transform ${currentPlacement.panel} ${currentSize} ${className}`}
        >
          {/* Header */}
          <header
            className={`px-6 py-4 border-b border-slate-100 dark:border-slate-700/80 flex items-center justify-between gap-3 ${headerClass}`}
          >
            <div className="min-w-0 pr-4">
              {title && (
                <h3 className="text-base font-semibold text-slate-900 dark:text-white truncate">
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                  {subtitle}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              {headerSlot}
              {hasCloseButton && (
                <button
                  type="button"
                  onClick={onClose}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors focus:outline-none"
                >
                  <Icon icon="x" size={18} />
                </button>
              )}
            </div>
          </header>

          {/* Body */}
          <main className={`flex-1 overflow-y-auto ${bodyClass}`}>{children}</main>

          {/* Footer */}
          {footerContent && (
            <footer
              className={`px-6 py-4 bg-slate-50/70 dark:bg-slate-700/20 border-t border-slate-100 dark:border-slate-700/80 flex items-center justify-end gap-3 ${footerClass}`}
            >
              {footerContent}
            </footer>
          )}
        </div>
      </div>
    </div>
  );
};

export default Drawer;
