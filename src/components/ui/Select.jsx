import React, { useState, useRef, useEffect, forwardRef } from "react";
import Icon from "./Icon";

const Select = forwardRef(
  (
    {
      options = [], // [{ value: '1', label: 'Option 1', icon: 'user', group: 'Category', disabled: false }] or ['A', 'B']
      value,
      defaultValue,
      onChange,
      placeholder = "Chọn một tùy chọn...",
      label,
      classLabel = "form-label mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200",
      className = "",
      classGroup = "",
      disabled = false,
      multiple = false,
      searchable = false,
      clearable = false,
      error,
      validate,
      description,
      size = "md",
      required = false,
      id,
      name,
      ...rest
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const dropdownRef = useRef(null);

    // Normalize options
    const normalizedOptions = options.map((opt) => {
      if (typeof opt === "object" && opt !== null) {
        return {
          value: opt.value !== undefined ? opt.value : opt.label,
          label: opt.label !== undefined ? opt.label : String(opt.value),
          icon: opt.icon,
          disabled: Boolean(opt.disabled),
          group: opt.group,
        };
      }
      return { value: opt, label: String(opt) };
    });

    // Handle internal selected state
    const [internalValue, setInternalValue] = useState(
      defaultValue !== undefined
        ? defaultValue
        : multiple
        ? []
        : ""
    );

    const isControlled = value !== undefined;
    const selectedValue = isControlled ? value : internalValue;

    // Handle outside click
    useEffect(() => {
      const handleClickOutside = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const sizeClasses = {
      sm: "min-h-[32px] py-1 px-3 text-xs",
      md: "min-h-[40px] py-2 px-3.5 text-sm",
      lg: "min-h-[48px] py-2.5 px-4 text-base",
    };

    const handleSelectOption = (optValue, opt) => {
      if (opt.disabled) return;

      if (multiple) {
        const currentArr = Array.isArray(selectedValue) ? selectedValue : [];
        const exists = currentArr.includes(optValue);
        const newArr = exists
          ? currentArr.filter((v) => v !== optValue)
          : [...currentArr, optValue];

        if (!isControlled) setInternalValue(newArr);
        if (onChange) onChange(newArr);
      } else {
        if (!isControlled) setInternalValue(optValue);
        if (onChange) onChange(optValue);
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    const handleRemoveTag = (e, valToRemove) => {
      e.stopPropagation();
      const currentArr = Array.isArray(selectedValue) ? selectedValue : [];
      const newArr = currentArr.filter((v) => v !== valToRemove);
      if (!isControlled) setInternalValue(newArr);
      if (onChange) onChange(newArr);
    };

    const handleClear = (e) => {
      e.stopPropagation();
      const emptyVal = multiple ? [] : "";
      if (!isControlled) setInternalValue(emptyVal);
      if (onChange) onChange(emptyVal);
    };

    // Filter options by search term
    const filteredOptions = normalizedOptions.filter((opt) =>
      opt.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Selected labels lookup
    const getSelectedLabel = () => {
      if (multiple) {
        const currentArr = Array.isArray(selectedValue) ? selectedValue : [];
        return currentArr.map((v) => {
          const match = normalizedOptions.find((o) => o.value === v);
          return match ? match : { value: v, label: String(v) };
        });
      }
      const match = normalizedOptions.find((o) => o.value === selectedValue);
      return match || null;
    };

    const selectedItem = getSelectedLabel();
    const hasValue = multiple
      ? Array.isArray(selectedValue) && selectedValue.length > 0
      : selectedValue !== undefined && selectedValue !== "" && selectedValue !== null;

    return (
      <div
        ref={dropdownRef}
        className={`form-group relative select-none ${error ? "has-error" : ""} ${
          validate ? "is-valid" : ""
        } ${classGroup}`}
      >
        {label && (
          <label
            htmlFor={id || name}
            className={`block capitalize ${classLabel}`}
          >
            {label}
            {required && <span className="text-danger-500 ml-1 font-bold">*</span>}
          </label>
        )}

        {/* Trigger Button */}
        <div
          onClick={() => !disabled && setIsOpen(!isOpen)}
          className={`flex items-center justify-between w-full rounded-md border bg-white dark:bg-slate-900 transition-all duration-150 cursor-pointer ${
            sizeClasses[size] || sizeClasses.md
          } ${
            error
              ? "border-danger-500 ring-1 ring-danger-500/20"
              : validate
              ? "border-success-500 ring-1 ring-success-500/20"
              : isOpen
              ? "border-primary-500 ring-2 ring-primary-500/20"
              : "border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600"
          } ${
            disabled ? "bg-slate-100 dark:bg-slate-800 opacity-60 cursor-not-allowed" : ""
          } ${className}`}
        >
          <div className="flex-1 flex flex-wrap items-center gap-1.5 overflow-hidden">
            {!hasValue && (
              <span className="text-slate-400 truncate">{placeholder}</span>
            )}

            {!multiple && hasValue && selectedItem && (
              <div className="flex items-center gap-2 text-slate-800 dark:text-slate-100 truncate">
                {selectedItem.icon && (
                  <Icon icon={selectedItem.icon} size={16} className="text-primary-500" />
                )}
                <span>{selectedItem.label}</span>
              </div>
            )}

            {multiple && hasValue && (
              <div className="flex flex-wrap gap-1">
                {selectedItem.map((item) => (
                  <span
                    key={item.value}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900/40 dark:text-primary-200"
                  >
                    {item.icon && <Icon icon={item.icon} size={12} />}
                    <span>{item.label}</span>
                    {!disabled && (
                      <button
                        type="button"
                        onClick={(e) => handleRemoveTag(e, item.value)}
                        className="hover:text-primary-900 dark:hover:text-white rounded-full"
                      >
                        <Icon icon="x" size={12} />
                      </button>
                    )}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-1 ml-2 flex-shrink-0">
            {clearable && hasValue && !disabled && (
              <button
                type="button"
                onClick={handleClear}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5 rounded-full"
                title="Xóa lựa chọn"
              >
                <Icon icon="x" size={14} />
              </button>
            )}

            <Icon
              icon="chevron-down"
              size={16}
              className={`text-slate-400 transition-transform duration-200 ${
                isOpen ? "rotate-180 text-primary-500" : ""
              }`}
            />
          </div>
        </div>

        {/* Dropdown Menu */}
        {isOpen && !disabled && (
          <div className="absolute left-0 right-0 top-full mt-1.5 z-50 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-xl overflow-hidden animate-[fadeIn_0.15s_ease-out]">
            {searchable && (
              <div className="p-2 border-b border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50">
                <div className="relative">
                  <Icon
                    icon="search"
                    size={14}
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Tìm kiếm..."
                    className="w-full pl-8 pr-3 py-1.5 text-xs rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:border-primary-500 text-slate-800 dark:text-slate-200"
                    autoFocus
                  />
                </div>
              </div>
            )}

            <div className="max-h-60 overflow-y-auto py-1 text-sm">
              {filteredOptions.length === 0 ? (
                <div className="px-4 py-3 text-center text-xs text-slate-400">
                  Không tìm thấy kết quả phù hợp
                </div>
              ) : (
                filteredOptions.map((opt) => {
                  const isSelected = multiple
                    ? Array.isArray(selectedValue) && selectedValue.includes(opt.value)
                    : selectedValue === opt.value;

                  return (
                    <div
                      key={opt.value}
                      onClick={() => handleSelectOption(opt.value, opt)}
                      className={`flex items-center justify-between px-3.5 py-2 cursor-pointer transition-colors duration-100 ${
                        opt.disabled
                          ? "opacity-40 cursor-not-allowed bg-slate-50 dark:bg-slate-800/50"
                          : isSelected
                          ? "bg-primary-50 text-primary-600 font-medium dark:bg-primary-950/40 dark:text-primary-300"
                          : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/60"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        {multiple && (
                          <div
                            className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${
                              isSelected
                                ? "bg-primary-500 border-primary-500 text-white"
                                : "border-slate-300 dark:border-slate-600"
                            }`}
                          >
                            {isSelected && <Icon icon="check" size={12} />}
                          </div>
                        )}
                        {opt.icon && (
                          <Icon
                            icon={opt.icon}
                            size={16}
                            className={isSelected ? "text-primary-500" : "text-slate-400"}
                          />
                        )}
                        <span className="truncate">{opt.label}</span>
                      </div>

                      {!multiple && isSelected && (
                        <Icon icon="check" size={16} className="text-primary-500 flex-shrink-0 ml-2" />
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* Feedback Messages */}
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
    );
  }
);

Select.displayName = "Select";
export default Select;
