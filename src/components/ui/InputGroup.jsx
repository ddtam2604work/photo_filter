import React, { useState, forwardRef } from "react";
import Icon from "./Icon";

const InputGroup = forwardRef(
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
      disabled = false,
      id,
      horizontal = false,
      validate,
      description,
      onChange,
      prepend,
      append,
      merged = false,
      size = "md",
      required = false,
      ...rest
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputId = id || name;
    const isReadOnly = readOnly || readonly;
    const isPasswordType = type === "password";
    const currentType = isPasswordType && showPassword ? "text" : type;

    const sizeClasses = {
      sm: "py-1.5 px-3 text-xs",
      md: "py-2 px-3.5 text-sm",
      lg: "py-2.5 px-4 text-base",
    };

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
          <div className="flex items-stretch w-full">
            {prepend && (
              <span
                className={`inline-flex items-center px-3.5 text-sm text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 border select-none ${
                  error ? "border-danger-500" : "border-slate-300 dark:border-slate-700"
                } ${merged ? "border-r-0 rounded-l-md" : "rounded-l-md border-r-0"}`}
              >
                {typeof prepend === "string" && (prepend.startsWith("http") || prepend.includes("@") || prepend.includes("$") || prepend.includes("www")) ? (
                  prepend
                ) : typeof prepend === "string" ? (
                  <Icon icon={prepend} size={16} />
                ) : (
                  prepend
                )}
              </span>
            )}

            <div className="relative flex-1">
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
                {...(register && name ? register(name) : {})}
                className={`form-control block w-full border bg-white dark:bg-slate-900 transition-all duration-150 ease-in-out focus:outline-none placeholder:text-slate-400 text-slate-900 dark:text-slate-100 ${
                  sizeClasses[size] || sizeClasses.md
                } ${prepend ? "rounded-l-none" : "rounded-l-md"} ${
                  append ? "rounded-r-none" : "rounded-r-md"
                } ${
                  error
                    ? "border-danger-500 focus:border-danger-500 focus:ring-2 focus:ring-danger-500/20 text-danger-900 dark:text-danger-100"
                    : validate
                    ? "border-success-500 focus:border-success-500 focus:ring-2 focus:ring-success-500/20"
                    : "border-slate-300 dark:border-slate-700 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 hover:border-slate-400 dark:hover:border-slate-600"
                } ${
                  disabled
                    ? "bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed opacity-80 select-none"
                    : ""
                } ${isPasswordType || icon ? "pr-10" : ""} ${className}`}
                {...rest}
              />

              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                {isPasswordType && !disabled && (
                  <button
                    type="button"
                    className="cursor-pointer text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5 rounded focus:outline-none"
                    onClick={() => setShowPassword(!showPassword)}
                    title={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                  >
                    <Icon icon={showPassword ? "eye" : "eye-off"} size={16} />
                  </button>
                )}

                {icon && !isPasswordType && (
                  <span className="text-slate-400 pointer-events-none flex items-center">
                    <Icon icon={icon} size={16} />
                  </span>
                )}
              </div>
            </div>

            {append && (
              <span
                className={`inline-flex items-center px-3.5 text-sm text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 border select-none ${
                  error ? "border-danger-500" : "border-slate-300 dark:border-slate-700"
                } ${merged ? "border-l-0 rounded-r-md" : "rounded-r-md border-l-0"}`}
              >
                {typeof append === "string" && (append.includes(".com") || append.includes("%") || append.includes("VNĐ") || append.includes("kg")) ? (
                  append
                ) : typeof append === "string" ? (
                  <Icon icon={append} size={16} />
                ) : (
                  append
                )}
              </span>
            )}
          </div>

          {error && (
            <p className="mt-1 text-xs text-danger-500 flex items-center gap-1">
              <Icon icon="alert-circle" size={12} />
              <span>{typeof error === "string" ? error : error?.message}</span>
            </p>
          )}

          {validate && typeof validate === "string" && !error && (
            <p className="mt-1 text-xs text-success-500 flex items-center gap-1">
              <Icon icon="check-circle" size={12} />
              <span>{validate}</span>
            </p>
          )}

          {description && !error && (
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{description}</p>
          )}
        </div>
      </div>
    );
  }
);

InputGroup.displayName = "InputGroup";
export default InputGroup;