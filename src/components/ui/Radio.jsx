import React, { forwardRef } from "react";
import Icon from "./Icon";

export const Radio = forwardRef(
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
      color = "primary",
      size = "md",
      className = "",
      labelClass = "",
      ...rest
    },
    ref
  ) => {
    const inputId = id || `radio-${name}-${value}-${Math.random().toString(36).substr(2, 5)}`;

    const colorVariants = {
      primary: "text-primary-500 focus:ring-primary-500 checked:border-primary-500 checked:bg-primary-500",
      success: "text-success-500 focus:ring-success-500 checked:border-success-500 checked:bg-success-500",
      danger: "text-danger-500 focus:ring-danger-500 checked:border-danger-500 checked:bg-danger-500",
      warning: "text-warning-500 focus:ring-warning-500 checked:border-warning-500 checked:bg-warning-500",
      info: "text-info-500 focus:ring-info-500 checked:border-info-500 checked:bg-info-500",
      dark: "text-slate-900 focus:ring-slate-900 checked:border-slate-900 checked:bg-slate-900 dark:checked:bg-slate-700",
    };

    const sizeVariants = {
      sm: "w-3.5 h-3.5",
      md: "w-4 h-4",
      lg: "w-5 h-5",
    };

    const dotSizes = {
      sm: "w-1.5 h-1.5",
      md: "w-2 h-2",
      lg: "w-2.5 h-2.5",
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
            ref={ref}
            type="radio"
            id={inputId}
            name={name}
            value={value}
            checked={checked}
            defaultChecked={defaultChecked}
            onChange={onChange}
            disabled={disabled}
            className={`peer appearance-none rounded-full border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-1 dark:focus:ring-offset-slate-900 ${
              sizeVariants[size] || sizeVariants.md
            } ${colorVariants[color] || colorVariants.primary}`}
            {...rest}
          />
          {/* Inner Dot Indicator */}
          <span
            className={`absolute rounded-full bg-white hidden peer-checked:block pointer-events-none ${
              dotSizes[size] || dotSizes.md
            }`}
          />
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

Radio.displayName = "Radio";

export const RadioGroup = ({
  options = [], // [{ value: '1', label: 'Pro Plan', description: '$29/mo', icon: 'sparkles', badge: 'Popular' }]
  value,
  defaultValue,
  onChange,
  name,
  label,
  variant = "list", // 'list' | 'card' | 'pills'
  horizontal = false,
  color = "primary",
  size = "md",
  disabled = false,
  className = "",
}) => {
  const isControlled = value !== undefined;
  const [internalVal, setInternalVal] = React.useState(defaultValue !== undefined ? defaultValue : "");
  const currentVal = isControlled ? value : internalVal;

  const handleChange = (newVal) => {
    if (!isControlled) setInternalVal(newVal);
    if (onChange) onChange(newVal);
  };

  const groupName = name || `radio-group-${Math.random().toString(36).substr(2, 6)}`;

  return (
    <div className={`radio-group space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5">
          {label}
        </label>
      )}

      {/* 1. Default List Style */}
      {variant === "list" && (
        <div
          className={`flex ${
            horizontal ? "flex-wrap items-center gap-6" : "flex-col space-y-2.5"
          }`}
        >
          {options.map((opt) => {
            const optVal = typeof opt === "object" ? opt.value : opt;
            const optLabel = typeof opt === "object" ? opt.label : String(opt);
            const optDesc = typeof opt === "object" ? opt.description : null;
            const isChecked = currentVal === optVal;

            return (
              <Radio
                key={optVal}
                name={groupName}
                value={optVal}
                checked={isChecked}
                onChange={() => handleChange(optVal)}
                label={optLabel}
                description={optDesc}
                color={color}
                size={size}
                disabled={disabled || opt.disabled}
              />
            );
          })}
        </div>
      )}

      {/* 2. Interactive Card Cards Style */}
      {variant === "card" && (
        <div
          className={`grid gap-3 ${
            horizontal
              ? `grid-cols-1 sm:grid-cols-${Math.min(options.length, 4)}`
              : "grid-cols-1"
          }`}
        >
          {options.map((opt) => {
            const optVal = typeof opt === "object" ? opt.value : opt;
            const optLabel = typeof opt === "object" ? opt.label : String(opt);
            const optDesc = typeof opt === "object" ? opt.description : null;
            const isChecked = currentVal === optVal;

            return (
              <div
                key={optVal}
                onClick={() => !disabled && !opt.disabled && handleChange(optVal)}
                className={`relative p-4 rounded-xl border-2 transition-all duration-150 cursor-pointer select-none flex items-start gap-3.5 ${
                  isChecked
                    ? "border-primary-500 bg-primary-50/40 dark:bg-primary-950/20 shadow-sm"
                    : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600"
                } ${
                  disabled || opt.disabled
                    ? "opacity-50 cursor-not-allowed pointer-events-none"
                    : ""
                }`}
              >
                <Radio
                  name={groupName}
                  value={optVal}
                  checked={isChecked}
                  onChange={() => handleChange(optVal)}
                  color={color}
                  size={size}
                  disabled={disabled || opt.disabled}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`text-sm font-semibold ${
                        isChecked
                          ? "text-primary-900 dark:text-primary-200"
                          : "text-slate-900 dark:text-white"
                      }`}
                    >
                      {optLabel}
                    </span>
                    {opt.badge && (
                      <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-primary-100 text-primary-800 dark:bg-primary-900/50 dark:text-primary-300">
                        {opt.badge}
                      </span>
                    )}
                  </div>
                  {optDesc && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      {optDesc}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Radio;
