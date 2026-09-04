import React, { forwardRef, useEffect, useRef } from "react";
import Icon from "./Icon";

const Checkbox = forwardRef(
  (
    {
      label,
      description,
      checked,
      defaultChecked,
      onChange,
      name,
      id,
      value,
      disabled = false,
      indeterminate = false,
      color = "primary",
      size = "md",
      className = "",
      labelClass = "",
      ...rest
    },
    ref
  ) => {
    const inputId = id || name || `checkbox-${Math.random().toString(36).substr(2, 9)}`;
    const internalRef = useRef(null);
    const resolvedRef = ref || internalRef;

    useEffect(() => {
      if (resolvedRef.current) {
        resolvedRef.current.indeterminate = Boolean(indeterminate);
      }
    }, [indeterminate, resolvedRef]);

    const colorVariants = {
      primary: "text-primary-500 focus:ring-primary-500 checked:bg-primary-500 checked:border-primary-500",
      success: "text-success-500 focus:ring-success-500 checked:bg-success-500 checked:border-success-500",
      danger: "text-danger-500 focus:ring-danger-500 checked:bg-danger-500 checked:border-danger-500",
      warning: "text-warning-500 focus:ring-warning-500 checked:bg-warning-500 checked:border-warning-500",
      info: "text-info-500 focus:ring-info-500 checked:bg-info-500 checked:border-info-500",
      dark: "text-slate-900 focus:ring-slate-900 checked:bg-slate-900 checked:border-slate-900 dark:checked:bg-slate-700",
    };

    const sizeVariants = {
      sm: "w-3.5 h-3.5 text-xs rounded",
      md: "w-4 h-4 text-sm rounded",
      lg: "w-5 h-5 text-base rounded-md",
    };

    return (
      <label
        htmlFor={inputId}
        className={`inline-flex items-start gap-2.5 cursor-pointer select-none group ${
          disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : ""
        } ${className}`}
      >
        <div className="relative flex items-center justify-center mt-0.5">
          <input
            ref={resolvedRef}
            type="checkbox"
            id={inputId}
            name={name}
            value={value}
            checked={checked}
            defaultChecked={defaultChecked}
            onChange={onChange}
            disabled={disabled}
            className={`peer appearance-none border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-1 dark:focus:ring-offset-slate-900 ${
              sizeVariants[size] || sizeVariants.md
            } ${colorVariants[color] || colorVariants.primary}`}
            {...rest}
          />
          {/* Custom Check / Indeterminate SVG indicator */}
          <span className="absolute inset-0 pointer-events-none hidden peer-checked:flex peer-indeterminate:flex items-center justify-center text-white">
            {indeterminate ? (
              <Icon icon="minus" size={size === "sm" ? 10 : size === "lg" ? 14 : 12} />
            ) : (
              <Icon icon="check" size={size === "sm" ? 10 : size === "lg" ? 14 : 12} />
            )}
          </span>
        </div>

        {(label || description) && (
          <div className="flex flex-col">
            {label && (
              <span
                className={`text-sm font-medium text-slate-800 dark:text-slate-200 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors ${labelClass}`}
              >
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

Checkbox.displayName = "Checkbox";
export default Checkbox;
