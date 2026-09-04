import React from "react";
import Icon from "./Icon";

const Breadcrumb = ({
  items = [], // [{ label: 'Home', link: '/', icon: 'home', onClick: () => {} }]
  separator = "slash", // 'slash' | 'chevron' | 'arrow' | custom JSX
  className = "",
}) => {
  const renderSeparator = () => {
    if (separator === "chevron") {
      return <Icon icon="chevron-right" size={14} className="text-slate-400" />;
    }
    if (separator === "arrow") {
      return <Icon icon="arrow-right" size={14} className="text-slate-400" />;
    }
    if (separator === "slash") {
      return <span className="text-slate-400 select-none">/</span>;
    }
    return separator;
  };

  return (
    <nav className={`flex items-center text-xs font-medium ${className}`} aria-label="Breadcrumb">
      <ol className="inline-flex items-center flex-wrap gap-1.5 sm:gap-2">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;

          return (
            <li key={idx} className="inline-flex items-center gap-1.5 sm:gap-2">
              {idx > 0 && renderSeparator()}

              {isLast ? (
                <span className="inline-flex items-center gap-1.5 text-slate-900 dark:text-white font-semibold">
                  {item.icon && <Icon icon={item.icon} size={14} />}
                  <span>{item.label}</span>
                </span>
              ) : item.link ? (
                <a
                  href={item.link}
                  onClick={item.onClick}
                  className="inline-flex items-center gap-1.5 text-slate-500 hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400 transition-colors"
                >
                  {item.icon && <Icon icon={item.icon} size={14} />}
                  <span>{item.label}</span>
                </a>
              ) : (
                <button
                  type="button"
                  onClick={item.onClick}
                  className="inline-flex items-center gap-1.5 text-slate-500 hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400 transition-colors"
                >
                  {item.icon && <Icon icon={item.icon} size={14} />}
                  <span>{item.label}</span>
                </button>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
