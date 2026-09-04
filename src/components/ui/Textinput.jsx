import React, { useState, forwardRef } from "react";
import Icon from "./Icon";

const Textinput = forwardRef(
  (
    {
      type = "text",
      label,
      placeholder = "Nhập dữ liệu...",
      classLabel = "form-label mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200",
      className = "",
      classGroup = "",
      register,
      name,
      readonly,
      readOnly,
      value,
      defaultValue,
      error,
      icon,
      iconPosition = "left",
      hasTogglePassword = false,
      disabled = false,
      id,
      horizontal = false,
      validate,
      description,
      onChange,
      onClear,
      clearable = false,
      maxLength,
      showCount = false,
      size = "md",
      required = false,
      ...rest
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputId = id || name;
    const isReadOnly = readOnly || readonly;
    const isPassword = type === "password" || hasTogglePassword;
    const currentType = isPassword ? (showPassword ? "text" : "password") : type;

    const sizeClasses = {
      sm: "py-1.5 px-3 text-xs",
      md: "py-2 px-3.5 text-sm",
      lg: "py-2.5 px-4 text-base",
    };

    const hasLeftIcon = Boolean(icon && iconPosition === "left");
    const hasRightAction = Boolean(
      isPassword ||
      (icon && iconPosition === "right") ||
      (clearable && value) ||
      error ||
      validate
    );

    const currentValueLength = typeof value === "string" ? value.length : 0;

    return (
      <div
        className={`form-group ${error ? "has-error" : ""} ${validate ? "is-valid" : ""} ${
          horizontal ? "flex flex-wrap items-center" : ""
        } ${classGroup}`}
      >
        {label && (
          <label
            htmlFor={inputId}
            className={`block capitalize ${classLabel} ${
              horizontal ? "w-full md:w-1/3 mb-0 pr-4" : ""
            }`}
          >
            {label}
            {required && <span className="text-danger-500 ml-1 font-bold">*</span>}
          </label>
        )}

        <div className={`relative ${horizontal ? "w-full md:w-2/3" : ""}`}>
          {hasLeftIcon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none flex items-center">
              <Icon icon={icon} size={16} />
            </span>
          )}

          <input
            ref={ref}
            type={currentType}
            name={name}
            id={inputId}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={isReadOnly}
            value={value}
            defaultValue={defaultValue}
            onChange={onChange}
            maxLength={maxLength}
            {...(register && name ? register(name) : {})}
            className={`form-control block w-full rounded-md border bg-white dark:bg-slate-900 transition-all duration-150 ease-in-out focus:outline-none placeholder:text-slate-400 text-slate-900 dark:text-slate-100 ${
              sizeClasses[size] || sizeClasses.md
            } ${hasLeftIcon ? "pl-9" : "pl-3.5"} ${hasRightAction ? "pr-10" : "pr-3.5"} ${
              error
                ? "border-danger-500 focus:border-danger-500 focus:ring-2 focus:ring-danger-500/20 text-danger-900 dark:text-danger-100"
                : validate
                ? "border-success-500 focus:border-success-500 focus:ring-2 focus:ring-success-500/20"
                : "border-slate-300 dark:border-slate-700 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 hover:border-slate-400 dark:hover:border-slate-600"
            } ${
              disabled
                ? "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed border-slate-200 dark:border-slate-800 opacity-80 select-none"
                : ""
            } ${isReadOnly ? "bg-slate-50 dark:bg-slate-800/50 cursor-default" : ""} ${className}`}
            {...rest}
          />

          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
            {clearable && value && !disabled && (
              <button
                type="button"
                onClick={onClear}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
                title="Xóa nội dung"
              >
                <Icon icon="x" size={14} />
              </button>
            )}

            {isPassword && !disabled && (
              <button
                type="button"
                className="cursor-pointer text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5 rounded focus:outline-none"
                onClick={() => setShowPassword(!showPassword)}
                title={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
              >
                <Icon icon={showPassword ? "eye" : "eye-off"} size={16} />
              </button>
            )}

            {!isPassword && icon && iconPosition === "right" && (
              <span className="text-slate-400 pointer-events-none flex items-center">
                <Icon icon={icon} size={16} />
              </span>
            )}

            {error && (
              <span className="text-danger-500 flex items-center" title={typeof error === "string" ? error : ""}>
                <Icon icon="alert-circle" size={16} />
              </span>
            )}

            {validate && !error && (
              <span className="text-success-500 flex items-center">
                <Icon icon="check-circle" size={16} />
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between mt-1">
          <div className="flex-1">
            {error && (
              <p className="text-xs text-danger-500 flex items-center gap-1">
                <Icon icon="alert-circle" size={12} />
                <span>{typeof error === "string" ? error : error?.message}</span>
              </p>
            )}

            {validate && typeof validate === "string" && !error && (
              <p className="text-xs text-success-500 flex items-center gap-1">
                <Icon icon="check-circle" size={12} />
                <span>{validate}</span>
              </p>
            )}

            {description && !error && (
              <p className="text-xs text-slate-500 dark:text-slate-400">{description}</p>
            )}
          </div>

          {(showCount || maxLength) && (
            <span className="text-[11px] text-slate-400 dark:text-slate-500 ml-2">
              {currentValueLength}
              {maxLength ? `/${maxLength}` : ""}
            </span>
          )}
        </div>
      </div>
    );
  }
);

Textinput.displayName = "Textinput";
export default Textinput;