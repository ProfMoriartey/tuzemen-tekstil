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
      <div className="text-theme-text/70 text-center text-sm md:text-left">
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
          <span className="text-theme-text/70 text-sm">Per page:</span>
          <select
            value={currentLimit}
            onChange={handleLimitChange}
            // Changed: Slightly smaller height on mobile
            className="bg-theme-bg border-theme-primary/30 text-theme-text focus:ring-theme-accent h-8 rounded-md border px-3 py-1 text-sm focus:ring-2 focus:outline-none sm:h-9"
          >
            <option value="24">24</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>

        <nav className="flex items-center gap-1">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            // Changed: Smaller hit targets (h-8/w-8) for mobile
            className="bg-theme-bg border-theme-primary/30 text-theme-text/70 hover:bg-theme-secondary/10 focus:ring-theme-accent flex h-8 w-8 items-center justify-center rounded-md border focus:ring-2 focus:outline-none disabled:opacity-50 disabled:hover:bg-theme-bg sm:h-9 sm:w-9"
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>

          {getPageNumbers().map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              // Changed: Adjusted padding and min-width for mobile
              className={`focus:ring-theme-accent h-8 min-w-8 rounded-md border px-2 text-xs font-medium transition-colors focus:ring-2 focus:outline-none sm:h-9 sm:min-w-9 sm:px-3 sm:text-sm ${
                currentPage === pageNum
                  ? "bg-theme-text border-theme-text text-theme-bg"
                  : "bg-theme-bg border-theme-primary/30 text-theme-text/80 hover:bg-theme-secondary/10"
              }`}
            >
              {pageNum}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            // Changed: Smaller hit targets (h-8/w-8) for mobile
            className="bg-theme-bg border-theme-primary/30 text-theme-text/70 hover:bg-theme-secondary/10 focus:ring-theme-accent flex h-8 w-8 items-center justify-center rounded-md border focus:ring-2 focus:outline-none disabled:opacity-50 disabled:hover:bg-theme-bg sm:h-9 sm:w-9"
            aria-label="Next page"
          >
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </nav>
      </div>
    </div>
  );
}
