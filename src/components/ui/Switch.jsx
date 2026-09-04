import React, { forwardRef } from "react";
import Icon from "./Icon";

const Switch = forwardRef(
  (
    {
      label,
      description,
      checked,
      defaultChecked,
      onChange,
      name,
      id,
      disabled = false,
      color = "primary",
      size = "md",
      iconOn,
      iconOff,
      labelPlacement = "right", // 'right' | 'left'
      className = "",
      ...rest
    },
    ref
  ) => {
    const inputId = id || name || `switch-${Math.random().toString(36).substr(2, 9)}`;

    const colorVariants = {
      primary: "peer-checked:bg-primary-500",
      success: "peer-checked:bg-success-500",
      danger: "peer-checked:bg-danger-500",
      warning: "peer-checked:bg-warning-500",
      info: "peer-checked:bg-info-500",
      dark: "peer-checked:bg-slate-900 dark:peer-checked:bg-slate-700",
    };

    const sizeVariants = {
      sm: {
        track: "w-8 h-4",
        thumb: "w-3 h-3",
        translate: "peer-checked:translate-x-4",
      },
      md: {
        track: "w-11 h-6",
        thumb: "w-5 h-5",
        translate: "peer-checked:translate-x-5",
      },
      lg: {
        track: "w-14 h-7",
        thumb: "w-6 h-6",
        translate: "peer-checked:translate-x-7",
      },
    };

    const currentSize = sizeVariants[size] || sizeVariants.md;

    return (
      <label
        htmlFor={inputId}
        className={`inline-flex items-start gap-3 cursor-pointer select-none group ${
          labelPlacement === "left" ? "flex-row-reverse justify-between" : ""
        } ${disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : ""} ${className}`}
      >
        <div className="relative inline-flex items-center flex-shrink-0 mt-0.5">
          <input
            ref={ref}
            type="checkbox"
            id={inputId}
            name={name}
            checked={checked}
            defaultChecked={defaultChecked}
            onChange={onChange}
            disabled={disabled}
            className="peer sr-only"
            {...rest}
          />
          {/* Switch Track */}
          <div
            className={`rounded-full bg-slate-300 dark:bg-slate-700 transition-colors duration-200 ease-in-out ${
              currentSize.track
            } ${colorVariants[color] || colorVariants.primary}`}
          />

          {/* Switch Thumb */}
          <div
            className={`absolute left-0.5 top-0.5 rounded-full bg-white shadow-md transform transition-transform duration-200 ease-in-out flex items-center justify-center text-slate-400 ${
              currentSize.thumb
            } ${currentSize.translate}`}
          >
            {iconOn && (
              <span className="hidden peer-checked:inline-flex items-center justify-center">
                <Icon icon={iconOn} size={size === "sm" ? 8 : 12} />
              </span>
            )}
            {iconOff && (
              <span className="inline-flex peer-checked:hidden items-center justify-center">
                <Icon icon={iconOff} size={size === "sm" ? 8 : 12} />
              </span>
            )}
          </div>
        </div>

        {(label || description) && (
          <div className="flex flex-col">
            {label && (
              <span className="text-sm font-medium text-slate-800 dark:text-slate-200 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                {label}
              </span>
            )}
            {description && (
              <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {description}
              </span>
            )}
          </div>
        )}
      </label>
    );
  }
);

Switch.displayName = "Switch";
export default Switch;
