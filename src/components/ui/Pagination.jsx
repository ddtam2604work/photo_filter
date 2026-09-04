import React from "react";
import Icon from "./Icon";

const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  showFirstLast = true,
  size = "md", // 'sm' | 'md' | 'lg'
  rounded = false,
  className = "",
}) => {
  if (totalPages <= 1) return null;

  const sizeClasses = {
    sm: "w-7 h-7 text-xs",
    md: "w-9 h-9 text-sm",
    lg: "w-11 h-11 text-base",
  };

  const getPageNumbers = () => {
    const pages = [];
    const delta = 2;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== "...") {
        pages.push("...");
      }
    }
    return pages;
  };

  const handlePageClick = (page) => {
    if (typeof page === "number" && page !== currentPage && page >= 1 && page <= totalPages) {
      if (onPageChange) onPageChange(page);
    }
  };

  const buttonClass = `inline-flex items-center justify-center font-medium transition-all duration-150 select-none ${
    rounded ? "rounded-full" : "rounded-lg"
  } ${sizeClasses[size] || sizeClasses.md}`;

  return (
    <nav className={`inline-flex items-center gap-1 ${className}`} aria-label="Pagination">
      {/* First Page Button */}
      {showFirstLast && (
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() => handlePageClick(1)}
          className={`${buttonClass} text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 disabled:opacity-40 disabled:pointer-events-none`}
          title="Trang đầu"
        >
          <Icon icon="chevrons-left" size={14} />
        </button>
      )}

      {/* Prev Page Button */}
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => handlePageClick(currentPage - 1)}
        className={`${buttonClass} text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 disabled:opacity-40 disabled:pointer-events-none`}
        title="Trang trước"
      >
        <Icon icon="chevron-left" size={14} />
      </button>

      {/* Page Numbers */}
      {getPageNumbers().map((page, idx) => {
        if (page === "...") {
          return (
            <span
              key={`ellipsis-${idx}`}
              className={`${sizeClasses[size] || sizeClasses.md} inline-flex items-center justify-center text-slate-400`}
            >
              …
            </span>
          );
        }

        const isCurrent = page === currentPage;
        return (
          <button
            key={page}
            type="button"
            onClick={() => handlePageClick(page)}
            className={`${buttonClass} ${
              isCurrent
                ? "bg-primary-500 text-white shadow-sm font-semibold"
                : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            }`}
          >
            {page}
          </button>
        );
      })}

      {/* Next Page Button */}
      <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={() => handlePageClick(currentPage + 1)}
        className={`${buttonClass} text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 disabled:opacity-40 disabled:pointer-events-none`}
        title="Trang kế tiếp"
      >
        <Icon icon="chevron-right" size={14} />
      </button>

      {/* Last Page Button */}
      {showFirstLast && (
        <button
          type="button"
          disabled={currentPage === totalPages}
          onClick={() => handlePageClick(totalPages)}
          className={`${buttonClass} text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 disabled:opacity-40 disabled:pointer-events-none`}
          title="Trang cuối"
        >
          <Icon icon="chevrons-right" size={14} />
        </button>
      )}
    </nav>
  );
};

export default Pagination;
