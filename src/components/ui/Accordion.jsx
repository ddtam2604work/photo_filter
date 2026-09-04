import React, { useState } from "react";
import Icon from "./Icon";

const Accordion = ({
  items = [], // [{ title, content, icon, badge, disabled }]
  allowMultiple = false,
  variant = "bordered", // 'bordered' | 'boxed' | 'flush'
  defaultOpen = [0],
  className = "",
  headerClass = "",
  bodyClass = "",
}) => {
  const [openIndexes, setOpenIndexes] = useState(defaultOpen);

  const toggleItem = (index, disabled) => {
    if (disabled) return;
    if (allowMultiple) {
      setOpenIndexes((prev) =>
        prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
      );
    } else {
      setOpenIndexes((prev) => (prev.includes(index) ? [] : [index]));
    }
  };

  return (
    <div
      className={`accordion-container ${
        variant === "flush" ? "divide-y divide-slate-200 dark:divide-slate-700" : "space-y-3"
      } ${className}`}
    >
      {items.map((item, index) => {
        const isOpen = openIndexes.includes(index);

        return (
          <div
            key={index}
            className={`accordion-item transition-all duration-150 ${
              variant === "boxed"
                ? "rounded-xl overflow-hidden bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-sm"
                : variant === "bordered"
                ? `rounded-xl overflow-hidden border ${
                    isOpen
                      ? "border-primary-500/50 dark:border-primary-500/50 shadow-sm"
                      : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                  }`
                : "bg-transparent"
            }`}
          >
            <button
              type="button"
              disabled={item.disabled}
              onClick={() => toggleItem(index, item.disabled)}
              className={`w-full flex items-center justify-between px-5 py-4 text-left font-medium text-sm transition-colors duration-150 select-none ${
                item.disabled
                  ? "opacity-50 cursor-not-allowed"
                  : isOpen
                  ? "bg-primary-50/50 text-primary-900 dark:bg-primary-950/20 dark:text-primary-200"
                  : "text-slate-800 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-700/50"
              } ${headerClass}`}
            >
              <div className="flex items-center gap-3 min-w-0 pr-4">
                {item.icon && (
                  <span className="text-primary-500 flex-shrink-0">
                    {typeof item.icon === "string" ? <Icon icon={item.icon} size={18} /> : item.icon}
                  </span>
                )}
                <span className="truncate">{item.title}</span>
                {item.badge && (
                  <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-primary-100 text-primary-800 dark:bg-primary-900/50 dark:text-primary-300 flex-shrink-0">
                    {item.badge}
                  </span>
                )}
              </div>

              <span
                className={`text-slate-400 transform transition-transform duration-200 flex-shrink-0 ${
                  isOpen ? "rotate-180 text-primary-500" : ""
                }`}
              >
                <Icon icon="chevron-down" size={16} />
              </span>
            </button>

            {isOpen && (
              <div
                className={`px-5 py-4 text-slate-600 dark:text-slate-300 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/80 bg-white dark:bg-slate-800 animate-[fadeIn_0.15s_ease-out] ${bodyClass}`}
              >
                {typeof item.content === "function" ? item.content() : item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;