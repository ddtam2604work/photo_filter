import React, { useState, useRef, useEffect } from "react";
import Icon from "./Icon";

const Dropdown = ({
  items = [], // [{ label: 'Edit', icon: 'edit', onClick: () => {}, divider: false, danger: false, shortcut: '⌘E' }]
  trigger,
  label = "Tùy chọn",
  icon,
  placement = "bottom-right", // 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
  className = "",
  menuClass = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const placementClasses = {
    "bottom-right": "top-full right-0 mt-1.5",
    "bottom-left": "top-full left-0 mt-1.5",
    "top-right": "bottom-full right-0 mb-1.5",
    "top-left": "bottom-full left-0 mb-1.5",
  };

  const handleItemClick = (item) => {
    if (item.disabled) return;
    if (item.onClick) item.onClick();
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className={`relative inline-block text-left ${className}`}>
      {trigger ? (
        <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer inline-block">
          {trigger}
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="btn inline-flex items-center gap-2 px-3.5 py-2 text-sm font-medium rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 shadow-sm transition-all focus:outline-none"
        >
          {icon && <Icon icon={icon} size={16} />}
          <span>{label}</span>
          <Icon
            icon="chevron-down"
            size={14}
            className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          />
        </button>
      )}

      {isOpen && (
        <div
          className={`absolute z-50 min-w-[180px] rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-1.5 shadow-xl animate-[fadeIn_0.15s_ease-out] ${
            placementClasses[placement] || placementClasses["bottom-right"]
          } ${menuClass}`}
        >
          {items.map((item, idx) => {
            if (item.divider) {
              return (
                <hr
                  key={`div-${idx}`}
                  className="my-1 border-slate-100 dark:border-slate-700"
                />
              );
            }

            return (
              <button
                key={idx}
                type="button"
                disabled={item.disabled}
                onClick={() => handleItemClick(item)}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-lg transition-colors duration-100 ${
                  item.disabled
                    ? "opacity-40 cursor-not-allowed"
                    : item.danger
                    ? "text-danger-600 hover:bg-danger-50 dark:text-danger-400 dark:hover:bg-danger-950/40"
                    : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/60"
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  {item.icon && (
                    <span className={item.danger ? "text-danger-500" : "text-slate-400"}>
                      {typeof item.icon === "string" ? (
                        <Icon icon={item.icon} size={14} />
                      ) : (
                        item.icon
                      )}
                    </span>
                  )}
                  <span className="truncate">{item.label}</span>
                </div>

                {item.shortcut && (
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 ml-3">
                    {item.shortcut}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
