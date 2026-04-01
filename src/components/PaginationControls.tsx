"use client";

import { usePathname, useRouter } from "~/i18n/routing";
import { useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  currentLimit: number;
  totalCount: number;
}

export default function PaginationControls({
  currentPage,
  totalPages,
  currentLimit,
  totalCount,
}: PaginationControlsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);
    return params.toString();
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    router.push(`${pathname}?${createQueryString("page", newPage.toString())}`);
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLimit = e.target.value;
    const params = new URLSearchParams(searchParams.toString());
    params.set("limit", newLimit);
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

  const getPageNumbers = () => {
    const pages = [];
    // Show fewer buttons on mobile to save space
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    // Changed: Stack everything on mobile, row on md screens
    <div className="flex w-full flex-col items-center justify-between gap-6 md:flex-row md:gap-4">
      {/* Changed: Concise text format for mobile, full text for desktop */}
      <div className="text-center text-sm text-slate-500 md:text-left">
        <span className="hidden sm:inline">Showing </span>
        <span className="font-medium">
          {(currentPage - 1) * currentLimit + 1}
        </span>
        <span className="mx-1 sm:hidden">-</span>
        <span className="hidden sm:inline"> to </span>
        <span className="font-medium">
          {Math.min(currentPage * currentLimit, totalCount)}
        </span>
        <span> of </span>
        <span className="font-medium">{totalCount}</span>
        <span className="hidden sm:inline"> designs</span>
      </div>

      {/* Changed: Allow dropdown and nav buttons to stack on very small screens */}
      <div className="flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row">
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-500">Per page:</span>
          <select
            value={currentLimit}
            onChange={handleLimitChange}
            // Changed: Slightly smaller height on mobile
            className="h-8 rounded-md border border-slate-200 bg-white px-3 py-1 text-sm text-slate-900 focus:ring-2 focus:ring-slate-400 focus:outline-none sm:h-9"
          >
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>

        <nav className="flex items-center gap-1">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            // Changed: Smaller hit targets (h-8/w-8) for mobile
            className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 focus:ring-2 focus:ring-slate-400 focus:outline-none disabled:opacity-50 disabled:hover:bg-white sm:h-9 sm:w-9"
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>

          {getPageNumbers().map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              // Changed: Adjusted padding and min-width for mobile
              className={`h-8 min-w-8 rounded-md border px-2 text-xs font-medium transition-colors focus:ring-2 focus:ring-slate-400 focus:outline-none sm:h-9 sm:min-w-9 sm:px-3 sm:text-sm ${
                currentPage === pageNum
                  ? "border-slate-900 bg-slate-900 text-white"
                  : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              }`}
            >
              {pageNum}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            // Changed: Smaller hit targets (h-8/w-8) for mobile
            className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 focus:ring-2 focus:ring-slate-400 focus:outline-none disabled:opacity-50 disabled:hover:bg-white sm:h-9 sm:w-9"
            aria-label="Next page"
          >
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </nav>
      </div>
    </div>
  );
}
