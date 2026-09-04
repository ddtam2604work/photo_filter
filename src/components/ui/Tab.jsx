import React, { useState } from "react";
import Icon from "./Icon";

const Tab = ({
  items = [], // [{ title, icon, badge, content, disabled }]
  variant = "line", // 'line' | 'pill' | 'bordered' | 'boxed'
  vertical = false,
  justify = false,
  size = "md",
  selectedIndex,
  onChange,
  className = "",
  tabListClass = "",
  panelClass = "",
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const isControlled = selectedIndex !== undefined;
  const currentIndex = isControlled ? selectedIndex : activeTab;

  const handleTabClick = (index, item) => {
    if (item.disabled) return;
    if (!isControlled) setActiveTab(index);
    if (onChange) onChange(index, item);
  };

  const sizeClasses = {
    sm: "py-1.5 px-3 text-xs",
    md: "py-2 px-4 text-sm",
    lg: "py-2.5 px-5 text-base",
  };

  const getTabClasses = (isSelected, disabled) => {
    const baseClasses = `inline-flex items-center justify-center font-medium transition-all duration-150 select-none focus:outline-none ${
      sizeClasses[size] || sizeClasses.md
    } ${justify && !vertical ? "flex-1" : ""} ${
      disabled ? "opacity-40 cursor-not-allowed pointer-events-none" : "cursor-pointer"
    }`;

    // 1. Underline / Line Tab
    if (variant === "line") {
      return `${baseClasses} border-b-2 bg-transparent -mb-[1px] ${
        isSelected
          ? "border-primary-500 text-primary-600 font-semibold dark:border-primary-400 dark:text-primary-400"
          : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300 dark:text-slate-400 dark:hover:text-slate-200"
      }`;
    }

    // 2. Pill Tab
    if (variant === "pill") {
      return `${baseClasses} rounded-lg ${
        isSelected
          ? "bg-primary-500 text-white shadow-sm font-semibold"
          : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700/50"
      }`;
    }

    // 3. Bordered Tab
    if (variant === "bordered") {
      return `${baseClasses} rounded-lg border ${
        isSelected
          ? "border-primary-500 bg-primary-50/50 text-primary-600 font-semibold dark:border-primary-400 dark:bg-primary-900/20 dark:text-primary-300 shadow-sm"
          : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
      }`;
    }

    // 4. Boxed / Segmented Control
    if (variant === "boxed") {
      return `${baseClasses} rounded-md ${
        isSelected
          ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm font-semibold"
          : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
      }`;
    }

    return baseClasses;
  };

  return (
    <div
      className={`tab-container ${
        vertical ? "flex flex-col md:flex-row gap-6 items-start" : "space-y-4"
      } ${className}`}
    >
      <div
        className={`tab-list flex ${
          vertical
            ? "flex-col w-full md:w-64 space-y-1.5 flex-shrink-0"
            : variant === "line"
            ? "border-b border-slate-200 dark:border-slate-700 flex-wrap gap-2"
            : variant === "boxed"
            ? "p-1 bg-slate-100 dark:bg-slate-900 rounded-lg flex-wrap gap-1 border border-slate-200/80 dark:border-slate-800"
            : "flex-wrap gap-2"
        } ${tabListClass}`}
        role="tablist"
      >
        {items.map((item, index) => {
          const isSelected = currentIndex === index;
          return (
            <button
              key={index}
              type="button"
              role="tab"
              aria-selected={isSelected}
              disabled={item.disabled}
              onClick={() => handleTabClick(index, item)}
              className={getTabClasses(isSelected, item.disabled)}
            >
              {item.icon && (
                <span className="mr-2 flex-shrink-0 inline-flex items-center">
                  {typeof item.icon === "string" ? <Icon icon={item.icon} size={16} /> : item.icon}
                </span>
              )}
              <span>{item.title}</span>
              {item.badge !== undefined && (
                <span
                  className={`ml-2 px-1.5 py-0.5 text-[10px] font-semibold rounded-full ${
                    isSelected
                      ? variant === "pill"
                        ? "bg-white/25 text-white"
                        : "bg-primary-100 text-primary-800 dark:bg-primary-900/40 dark:text-primary-200"
                      : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className={`tab-content flex-1 w-full min-w-0 ${panelClass}`}>
        {items[currentIndex] && (
          <div
            key={currentIndex}
            role="tabpanel"
            className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed animate-[fadeIn_0.15s_ease-out]"
          >
            {typeof items[currentIndex].content === "function"
              ? items[currentIndex].content()
              : items[currentIndex].content}
          </div>
        )}
      </div>
    </div>
  );
};

export default Tab;