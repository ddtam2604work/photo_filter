import React from "react";

export const Progress = ({
  value = 0,
  max = 100,
  color = "primary", // 'primary' | 'success' | 'danger' | 'warning' | 'info'
  size = "md", // 'sm' | 'md' | 'lg'
  showLabel = false,
  label,
  striped = false,
  animated = false,
  className = "",
}) => {
  const percent = Math.min(Math.max(Math.round((value / max) * 100), 0), 100);

  const colorVariants = {
    primary: "bg-primary-500",
    success: "bg-success-500",
    danger: "bg-danger-500",
    warning: "bg-warning-500",
    info: "bg-info-500",
  };

  const sizeVariants = {
    sm: "h-1.5",
    md: "h-2.5",
    lg: "h-4 text-xs font-semibold",
  };

  const currentColor = colorVariants[color] || colorVariants.primary;
  const currentSize = sizeVariants[size] || sizeVariants.md;

  return (
    <div className={`w-full space-y-1.5 ${className}`}>
      {(label || (showLabel && size !== "lg")) && (
        <div className="flex justify-between items-center text-xs font-medium text-slate-700 dark:text-slate-300">
          {label && <span>{label}</span>}
          {showLabel && <span>{percent}%</span>}
        </div>
      )}

      <div
        className={`w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden ${currentSize}`}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        <div
          style={{ width: `${percent}%` }}
          className={`h-full transition-all duration-300 rounded-full flex items-center justify-center text-white ${currentColor} ${
            striped
              ? "bg-[linear-gradient(45deg,rgba(255,255,255,0.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.15)_50%,rgba(255,255,255,0.15)_75%,transparent_75%,transparent)] bg-[length:1rem_1rem]"
              : ""
          } ${animated ? "animate-[progressStripe_1s_linear_infinite]" : ""}`}
        >
          {size === "lg" && showLabel && (
            <span className="px-2 leading-none">{percent}%</span>
          )}
        </div>
      </div>
    </div>
  );
};

export const CircularProgress = ({
  value = 0,
  max = 100,
  size = 64,
  strokeWidth = 6,
  color = "primary",
  showLabel = true,
  className = "",
}) => {
  const percent = Math.min(Math.max(Math.round((value / max) * 100), 0), 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  const colorVariants = {
    primary: "text-primary-500 stroke-primary-500",
    success: "text-success-500 stroke-success-500",
    danger: "text-danger-500 stroke-danger-500",
    warning: "text-warning-500 stroke-warning-500",
    info: "text-info-500 stroke-info-500",
  };

  const currentColor = colorVariants[color] || colorVariants.primary;

  return (
    <div
      style={{ width: size, height: size }}
      className={`relative inline-flex items-center justify-center ${className}`}
    >
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-slate-200 dark:text-slate-700"
        />
        {/* Progress Arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="none"
          className={`transition-all duration-300 ${currentColor}`}
        />
      </svg>

      {showLabel && (
        <span className="absolute text-xs font-bold text-slate-800 dark:text-white">
          {percent}%
        </span>
      )}
    </div>
  );
};

export default Progress;
