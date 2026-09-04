import React, { forwardRef } from "react";
import Icon from "./Icon";

const FormGroup = forwardRef(
  (
    {
      label,
      labelAction,
      required = false,
      infoTooltip,
      classLabel = "",
      className = "mb-4",
      classGroup = "",
      error,
      id,
      name,
      horizontal = false,
      labelWidth = "w-full md:w-1/3",
      contentWidth = "w-full md:w-2/3",
      validate,
      description,
      children,
      ...rest
    },
    ref
  ) => {
    const inputId = id || name;
    const errorMessage = typeof error === "string" ? error : error?.message;
    const validMessage = typeof validate === "string" ? validate : null;
    const hasError = Boolean(error);
    const isValid = Boolean(validate) && !hasError;

    return (
      <div
        ref={ref}
        className={`form-group ${hasError ? "has-error" : ""} ${isValid ? "is-valid" : ""} ${
          horizontal ? "flex flex-wrap items-start" : ""
        } ${className}`.trim()}
        {...rest}
      >
        {(label || labelAction) && (
          <div
            className={`flex justify-between items-center ${
              horizontal ? `${labelWidth} pr-4 pt-2` : "mb-1.5"
            }`}
          >
            {label && (
              <label
                htmlFor={inputId}
                className={`inline-flex items-center gap-1 text-sm font-medium text-slate-700 dark:text-slate-200 capitalize select-none ${classLabel}`}
              >
                <span>{label}</span>
                {required && <span className="text-danger-500 font-bold">*</span>}
                {infoTooltip && (
                  <span
                    className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 cursor-help ml-0.5 inline-flex items-center"
                    title={infoTooltip}
                  >
                    <Icon icon="info" size={14} />
                  </span>
                )}
              </label>
            )}
            {!horizontal && labelAction && (
              <div className="text-xs text-slate-500 dark:text-slate-400">{labelAction}</div>
            )}
          </div>
        )}

        <div className={`relative ${horizontal ? contentWidth : "w-full"} ${classGroup}`}>
          {children}

          {hasError && errorMessage && (
            <p className="mt-1.5 text-xs text-danger-500 flex items-center gap-1">
              <Icon icon="alert-circle" size={12} />
              <span>{errorMessage}</span>
            </p>
          )}

          {isValid && validMessage && (
            <p className="mt-1.5 text-xs text-success-500 flex items-center gap-1">
              <Icon icon="check-circle" size={12} />
              <span>{validMessage}</span>
            </p>
          )}

          {description && !hasError && (
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </div>
    );
  }
);

FormGroup.displayName = "FormGroup";
export default FormGroup;