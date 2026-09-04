import React, { useState, useRef } from "react";

const Tooltip = ({
  content,
  children,
  placement = "top", // 'top' | 'bottom' | 'left' | 'right'
  delay = 150,
  arrow = true,
  className = "",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef(null);

  const showTooltip = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsVisible(false);
  };

  const placementClasses = {
    top: {
      tooltip: "bottom-full left-1/2 -translate-x-1/2 mb-2 animate-[fadeIn_0.15s_ease-out]",
      arrow: "top-full left-1/2 -translate-x-1/2 border-t-slate-900 dark:border-t-slate-700 border-x-transparent border-b-transparent",
    },
    bottom: {
      tooltip: "top-full left-1/2 -translate-x-1/2 mt-2 animate-[fadeIn_0.15s_ease-out]",
      arrow: "bottom-full left-1/2 -translate-x-1/2 border-b-slate-900 dark:border-b-slate-700 border-x-transparent border-t-transparent",
    },
    left: {
      tooltip: "right-full top-1/2 -translate-y-1/2 mr-2 animate-[fadeIn_0.15s_ease-out]",
      arrow: "left-full top-1/2 -translate-y-1/2 border-l-slate-900 dark:border-l-slate-700 border-y-transparent border-r-transparent",
    },
    right: {
      tooltip: "left-full top-1/2 -translate-y-1/2 ml-2 animate-[fadeIn_0.15s_ease-out]",
      arrow: "right-full top-1/2 -translate-y-1/2 border-r-slate-900 dark:border-r-slate-700 border-y-transparent border-l-transparent",
    },
  };

  const currentPlacement = placementClasses[placement] || placementClasses.top;

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
    >
      {children}

      {isVisible && content && (
        <div
          role="tooltip"
          className={`absolute z-50 pointer-events-none px-2.5 py-1 text-xs font-medium text-white bg-slate-900 dark:bg-slate-700 rounded-md shadow-lg whitespace-nowrap ${currentPlacement.tooltip} ${className}`}
        >
          {content}
          {arrow && (
            <span
              className={`absolute w-0 h-0 border-4 ${currentPlacement.arrow}`}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
