import React from "react";

const Skeleton = ({
  variant = "text", // 'text' | 'circle' | 'rect' | 'card'
  width,
  height,
  count = 1,
  className = "",
}) => {
  const baseClass = "bg-slate-200 dark:bg-slate-700 animate-pulse rounded";

  const renderSingle = (key) => {
    if (variant === "circle") {
      return (
        <div
          key={key}
          style={{ width: width || 40, height: height || 40 }}
          className={`${baseClass} rounded-full flex-shrink-0 ${className}`}
        />
      );
    }

    if (variant === "rect") {
      return (
        <div
          key={key}
          style={{ width: width || "100%", height: height || 160 }}
          className={`${baseClass} rounded-xl ${className}`}
        />
      );
    }

    if (variant === "card") {
      return (
        <div
          key={key}
          className={`p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 space-y-3 ${className}`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 animate-pulse flex-shrink-0" />
            <div className="space-y-1.5 flex-1">
              <div className="h-3.5 bg-slate-200 dark:bg-slate-700 rounded w-1/2 animate-pulse" />
              <div className="h-2.5 bg-slate-200 dark:bg-slate-700 rounded w-1/3 animate-pulse" />
            </div>
          </div>
          <div className="h-24 bg-slate-200 dark:bg-slate-700 rounded-lg animate-pulse" />
          <div className="space-y-1.5 pt-1">
            <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-full animate-pulse" />
            <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-4/5 animate-pulse" />
          </div>
        </div>
      );
    }

    // Default 'text'
    return (
      <div
        key={key}
        style={{ width: width || "100%", height: height || 16 }}
        className={`${baseClass} ${className}`}
      />
    );
  };

  if (count > 1) {
    return (
      <div className="space-y-2">
        {Array.from({ length: count }).map((_, idx) => renderSingle(idx))}
      </div>
    );
  }

  return renderSingle(0);
};

export default Skeleton;
