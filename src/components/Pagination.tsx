import Link from "next/link";
import { ChevronRight, ChevronLeft } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

function getPageNumbers(current: number, total: number): (number | "...")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const around = new Set(
    [1, total, current - 1, current, current + 1].filter(
      (n) => n >= 1 && n <= total
    )
  );
  const sorted = [...around].sort((a, b) => a - b);

  const result: (number | "...")[] = [];
  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) result.push("...");
    result.push(sorted[i]);
  }
  return result;
}

export default function Pagination({
  currentPage,
  totalPages,
  basePath,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = getPageNumbers(currentPage, totalPages);
  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  const linkClass = (active: boolean) =>
    `inline-flex items-center justify-center min-w-[40px] h-10 px-3 rounded-lg text-sm font-medium transition-all ${
      active
        ? "bg-maccabi-yellow text-navy-950 font-bold"
        : "text-blue-200/70 hover:text-white hover:bg-navy-700 border border-navy-700 hover:border-navy-500"
    }`;

  const arrowClass = (enabled: boolean) =>
    `inline-flex items-center gap-1.5 h-10 px-4 rounded-lg text-sm font-medium border transition-all ${
      enabled
        ? "border-navy-600 text-blue-200/70 hover:text-white hover:bg-navy-700 hover:border-navy-500"
        : "border-navy-800 text-navy-700 cursor-not-allowed pointer-events-none"
    }`;

  return (
    <nav
      aria-label="ניווט עמודים"
      className="flex items-center justify-center gap-1.5 mt-10 flex-wrap"
    >
      {/* Previous */}
      {hasPrev ? (
        <Link href={`${basePath}/${currentPage - 1}`} className={arrowClass(true)}>
          <ChevronRight className="w-4 h-4" />
          הקודם
        </Link>
      ) : (
        <span className={arrowClass(false)}>
          <ChevronRight className="w-4 h-4" />
          הקודם
        </span>
      )}

      {/* Page numbers */}
      <div className="flex items-center gap-1.5">
        {pages.map((page, idx) =>
          page === "..." ? (
            <span key={`ellipsis-${idx}`} className="text-navy-600 px-1 select-none">
              ···
            </span>
          ) : (
            <Link
              key={page}
              href={`${basePath}/${page}`}
              className={linkClass(page === currentPage)}
              aria-current={page === currentPage ? "page" : undefined}
            >
              {page}
            </Link>
          )
        )}
      </div>

      {/* Next */}
      {hasNext ? (
        <Link href={`${basePath}/${currentPage + 1}`} className={arrowClass(true)}>
          הבא
          <ChevronLeft className="w-4 h-4" />
        </Link>
      ) : (
        <span className={arrowClass(false)}>
          הבא
          <ChevronLeft className="w-4 h-4" />
        </span>
      )}
    </nav>
  );
}
