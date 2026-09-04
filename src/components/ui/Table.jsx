import React, { useState, useMemo } from "react";
import Icon from "./Icon";
import Pagination from "./Pagination";

const Table = ({
  columns = [], // [{ key: 'id', label: '#', sortable: true, render: (val, row) => JSX, align: 'left' | 'center' | 'right' }]
  data = [],
  striped = false,
  hoverable = true,
  bordered = false,
  compact = false,
  selectable = false,
  selectedRows = [],
  onSelectionChange,
  searchable = false,
  searchPlaceholder = "Tìm kiếm trong bảng...",
  isLoading = false,
  emptyText = "Không có dữ liệu hiển thị",
  pageSize = 10,
  showPagination = true,
  className = "",
  headerSlot,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);

  // 1. Search Filtering
  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return data;
    const term = searchTerm.toLowerCase();
    return data.filter((row) =>
      columns.some((col) => {
        const val = row[col.key];
        return val !== undefined && String(val).toLowerCase().includes(term);
      })
    );
  }, [data, searchTerm, columns]);

  // 2. Sorting
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;
    return [...filteredData].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];
      if (aVal === bVal) return 0;
      if (aVal === null || aVal === undefined) return 1;
      if (bVal === null || bVal === undefined) return -1;
      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      return sortConfig.direction === "asc" ? 1 : -1;
    });
  }, [filteredData, sortConfig]);

  // 3. Pagination
  const totalPages = Math.ceil(sortedData.length / pageSize) || 1;
  const paginatedData = useMemo(() => {
    if (!showPagination) return sortedData;
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize, showPagination]);

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const handleSelectAll = (e) => {
    if (!onSelectionChange) return;
    if (e.target.checked) {
      onSelectionChange(paginatedData.map((row) => row.id || row));
    } else {
      onSelectionChange([]);
    }
  };

  const handleSelectRow = (rowId) => {
    if (!onSelectionChange) return;
    const isSelected = selectedRows.includes(rowId);
    if (isSelected) {
      onSelectionChange(selectedRows.filter((id) => id !== rowId));
    } else {
      onSelectionChange([...selectedRows, rowId]);
    }
  };

  const isAllSelected =
    paginatedData.length > 0 &&
    paginatedData.every((row) => selectedRows.includes(row.id || row));

  return (
    <div className={`table-wrapper rounded-xl border border-slate-200/80 dark:border-slate-700/80 bg-white dark:bg-slate-800 shadow-sm overflow-hidden ${className}`}>
      {/* Table Toolbar */}
      {(searchable || headerSlot) && (
        <div className="p-4 border-b border-slate-100 dark:border-slate-700/80 flex flex-wrap items-center justify-between gap-3 bg-slate-50/50 dark:bg-slate-800/50">
          {searchable && (
            <div className="relative w-full sm:w-72">
              <Icon
                icon="search"
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder={searchPlaceholder}
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:outline-none focus:border-primary-500 text-slate-800 dark:text-slate-200 placeholder:text-slate-400 transition-all"
              />
            </div>
          )}
          {headerSlot && <div className="flex items-center gap-2">{headerSlot}</div>}
        </div>
      )}

      {/* Responsive Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm text-slate-700 dark:text-slate-300">
          {/* Header */}
          <thead className="bg-slate-50 dark:bg-slate-900/60 text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider border-b border-slate-200 dark:border-slate-700">
            <tr>
              {selectable && (
                <th className="p-4 w-10 text-center">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={handleSelectAll}
                    className="rounded border-slate-300 text-primary-500 focus:ring-primary-500"
                  />
                </th>
              )}
              {columns.map((col) => {
                const isSorted = sortConfig.key === col.key;
                return (
                  <th
                    key={col.key}
                    onClick={() => col.sortable && handleSort(col.key)}
                    style={{ width: col.width }}
                    className={`p-4 select-none ${col.sortable ? "cursor-pointer hover:text-primary-500" : ""} ${
                      col.align === "right"
                        ? "text-right"
                        : col.align === "center"
                        ? "text-center"
                        : "text-left"
                    } ${bordered ? "border-r border-slate-200 dark:border-slate-700 last:border-r-0" : ""}`}
                  >
                    <div
                      className={`inline-flex items-center gap-1.5 ${
                        col.align === "right"
                          ? "justify-end"
                          : col.align === "center"
                          ? "justify-center"
                          : "justify-start"
                      }`}
                    >
                      <span>{col.label}</span>
                      {col.sortable && (
                        <span className={`text-slate-400 ${isSorted ? "text-primary-500" : ""}`}>
                          {isSorted ? (
                            sortConfig.direction === "asc" ? (
                              <Icon icon="chevron-up" size={14} />
                            ) : (
                              <Icon icon="chevron-down" size={14} />
                            )
                          ) : (
                            <Icon icon="chevron-down" size={14} className="opacity-40" />
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>

          {/* Body */}
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700/80">
            {isLoading ? (
              // Skeleton loading rows
              Array.from({ length: 4 }).map((_, rIdx) => (
                <tr key={rIdx} className="animate-pulse">
                  {selectable && <td className="p-4 text-center"><div className="w-4 h-4 bg-slate-200 dark:bg-slate-700 rounded mx-auto" /></td>}
                  {columns.map((col, cIdx) => (
                    <td key={cIdx} className="p-4">
                      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4" />
                    </td>
                  ))}
                </tr>
              ))
            ) : paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (selectable ? 1 : 0)}
                  className="p-8 text-center text-slate-400 text-sm"
                >
                  <Icon icon="search" size={28} className="mx-auto mb-2 opacity-40" />
                  <p>{emptyText}</p>
                </td>
              </tr>
            ) : (
              paginatedData.map((row, rIdx) => {
                const rowId = row.id || row;
                const isSelected = selectedRows.includes(rowId);

                return (
                  <tr
                    key={rowId || rIdx}
                    className={`transition-colors duration-100 ${
                      isSelected
                        ? "bg-primary-50/60 dark:bg-primary-950/20"
                        : striped && rIdx % 2 === 1
                        ? "bg-slate-50/50 dark:bg-slate-800/40"
                        : "bg-white dark:bg-slate-800"
                    } ${hoverable ? "hover:bg-slate-50 dark:hover:bg-slate-700/50" : ""}`}
                  >
                    {selectable && (
                      <td className="p-4 w-10 text-center">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleSelectRow(rowId)}
                          className="rounded border-slate-300 text-primary-500 focus:ring-primary-500"
                        />
                      </td>
                    )}
                    {columns.map((col) => {
                      const cellValue = row[col.key];
                      return (
                        <td
                          key={col.key}
                          className={`${compact ? "px-4 py-2.5" : "p-4"} ${
                            col.align === "right"
                              ? "text-right"
                              : col.align === "center"
                              ? "text-center"
                              : "text-left"
                          } ${bordered ? "border-r border-slate-100 dark:border-slate-700/80 last:border-r-0" : ""}`}
                        >
                          {col.render ? col.render(cellValue, row, rIdx) : cellValue}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {showPagination && sortedData.length > 0 && (
        <div className="p-4 border-t border-slate-100 dark:border-slate-700/80 flex flex-wrap items-center justify-between gap-3 bg-slate-50/30 dark:bg-slate-800/30">
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Hiển thị {(currentPage - 1) * pageSize + 1} - {Math.min(currentPage * pageSize, sortedData.length)} trên tổng số {sortedData.length} kết quả
          </span>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            size="sm"
          />
        </div>
      )}
    </div>
  );
};

export default Table;
