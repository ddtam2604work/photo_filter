import React, { forwardRef, useRef, useEffect } from "react";
import Icon from "./Icon";

const Textarea = forwardRef(
  (
    {
      label,
      placeholder = "Nhập nội dung chi tiết...",
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
      disabled = false,
      id,
      horizontal = false,
      validate,
      description,
      onChange,
      rows = 4,
      maxLength,
      showCount = false,
      autoResize = false,
      required = false,
      ...rest
    },
    ref
  ) => {
    const inputId = id || name;
    const isReadOnly = readOnly || readonly;
    const internalRef = useRef(null);
    const textareaRef = ref || internalRef;

    const currentValueLength = typeof value === "string" ? value.length : 0;

    // Auto resize handler
    const handleInput = (e) => {
      if (autoResize && e.target) {
        e.target.style.height = "auto";
        e.target.style.height = `${e.target.scrollHeight}px`;
      }
      if (onChange) onChange(e);
    };

    useEffect(() => {
      if (autoResize && textareaRef?.current) {
        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
    }, [value, autoResize]);

    return (
      <div
        className={`form-group ${error ? "has-error" : ""} ${validate ? "is-valid" : ""} ${
          horizontal ? "flex flex-wrap items-start" : ""
        } ${classGroup}`}
      >
        {label && (
          <label
            htmlFor={inputId}
            className={`block capitalize ${classLabel} ${
              horizontal ? "w-full md:w-1/3 mb-0 pr-4 pt-2" : ""
            }`}
          >
            {label}
            {required && <span className="text-danger-500 ml-1 font-bold">*</span>}
          </label>
        )}

        <div className={`relative ${horizontal ? "w-full md:w-2/3" : ""}`}>
          <textarea
            ref={textareaRef}
            name={name}
            id={inputId}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={isReadOnly}
            value={value}
            defaultValue={defaultValue}
            onChange={handleInput}
            rows={rows}
            maxLength={maxLength}
            {...(register && name ? register(name) : {})}
            className={`form-control block w-full rounded-md border bg-white dark:bg-slate-900 p-3 text-sm transition-all duration-150 ease-in-out focus:outline-none placeholder:text-slate-400 text-slate-900 dark:text-slate-100 resize-y ${
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
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
export default Textarea;
