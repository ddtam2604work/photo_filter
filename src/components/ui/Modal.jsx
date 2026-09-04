import React, { useEffect, useState } from "react";
import Icon from "./Icon";

const Modal = ({
  activeModal,
  isOpen, // Alternative alias
  onClose,
  uncontrol = false,
  trigger,
  label = "Mở Modal",
  labelClass = "bg-primary-500 hover:bg-primary-600 text-white",
  title = "Tiêu đề Modal",
  subtitle,
  headerSlot,
  noHeader = false,
  hasCloseButton = true,
  children,
  footerContent,
  className = "",
  bodyClass = "p-6",
  headerClass = "",
  footerClass = "",
  centered = true,
  scrollContent = false,
  size = "md",
  backdrop = true,
  disableBackdrop = false,
  staticBackdrop = false,
  ...rest
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = activeModal !== undefined || isOpen !== undefined;
  const currentOpen = isControlled ? (activeModal !== undefined ? activeModal : isOpen) : internalOpen;

  const handleClose = () => {
    if (!isControlled) setInternalOpen(false);
    if (onClose) onClose();
  };

  const handleOpen = () => {
    if (!isControlled) setInternalOpen(true);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && currentOpen && backdrop !== "static" && !staticBackdrop) {
        handleClose();
      }
    };

    if (currentOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentOpen]);

  const sizeMap = {
    xs: "max-w-sm",
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    "2xl": "max-w-5xl",
    "3xl": "max-w-6xl",
    full: "max-w-full m-4 min-h-[calc(100vh-2rem)]",
  };

  const selectedSize = sizeMap[size] || sizeMap.md;
  const isStatic = staticBackdrop || backdrop === "static";
  const showBackdrop = !disableBackdrop && backdrop !== false;

  const renderModal = () => {
    if (!currentOpen) return null;

    return (
      <div className="fixed inset-0 z-[99999] overflow-y-auto" {...rest}>
        {/* Backdrop overlay */}
        {showBackdrop && (
          <div
            onClick={isStatic ? undefined : handleClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300 animate-[fadeIn_0.2s_ease-out]"
          />
        )}

        {/* Modal Dialog container */}
        <div
          className={`flex min-h-full justify-center p-4 md:p-6 text-center ${
            centered ? "items-center" : "items-start pt-12"
          }`}
        >
          <div
            className={`relative w-full transform overflow-hidden rounded-2xl bg-white dark:bg-slate-800 text-left align-middle shadow-2xl transition-all z-10 animate-[scaleIn_0.2s_ease-out] border border-slate-200/80 dark:border-slate-700/80 ${selectedSize} ${className}`}
          >
            {/* Header */}
            {!noHeader && (
              <div
                className={`relative py-4 px-6 flex items-center justify-between border-b border-slate-100 dark:border-slate-700/80 ${headerClass}`}
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
                      onClick={handleClose}
                      className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors focus:outline-none"
                    >
                      <Icon icon="x" size={18} />
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Body Content */}
            <div
              className={`text-slate-600 dark:text-slate-300 text-sm leading-relaxed ${
                scrollContent ? "overflow-y-auto max-h-[70vh]" : ""
              } ${bodyClass}`}
            >
              {children}
            </div>

            {/* Footer */}
            {footerContent && (
              <div
                className={`px-6 py-4 bg-slate-50/70 dark:bg-slate-700/20 border-t border-slate-100 dark:border-slate-700/80 flex justify-end items-center gap-3 ${footerClass}`}
              >
                {footerContent}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  if (uncontrol || trigger) {
    return (
      <>
        {trigger ? (
          <span onClick={handleOpen} className="inline-block cursor-pointer">
            {trigger}
          </span>
        ) : (
          <button
            type="button"
            onClick={handleOpen}
            className={`btn inline-flex items-center justify-center font-medium rounded-lg py-2 px-4 shadow-sm transition-all ${labelClass}`}
          >
            {label}
          </button>
        )}
        {renderModal()}
      </>
    );
  }

  return renderModal();
};

export default Modal;