import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Language } from '../../data/translations';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
  lang: Language;
  prevLabel: string;
  nextLabel: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  disabled = false,
  lang,
  prevLabel,
  nextLabel,
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-12 flex items-center justify-center gap-2 sm:gap-3">
      {/* Prev Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1 || disabled}
        className={`flex items-center gap-1 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
          currentPage === 1 || disabled
            ? 'text-stone-300 dark:text-stone-600 bg-stone-100 dark:bg-stone-900 cursor-not-allowed'
            : 'text-stone-800 dark:text-stone-200 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 hover:border-amber-400 dark:hover:border-amber-500 hover:bg-amber-50 dark:hover:bg-stone-800 cursor-pointer shadow-xs'
        }`}
      >
        {lang === 'ar' ? (
          <>
            <span>{prevLabel}</span>
            <ChevronRight className="w-4 h-4" />
          </>
        ) : (
          <>
            <ChevronLeft className="w-4 h-4" />
            <span>{prevLabel}</span>
          </>
        )}
      </button>

      {/* Page Number Buttons */}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
        <button
          key={pageNum}
          disabled={disabled}
          onClick={() => onPageChange(pageNum)}
          className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            currentPage === pageNum
              ? 'bg-amber-400 text-stone-900 shadow-sm scale-105'
              : 'bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 hover:border-amber-300 dark:hover:border-amber-500 hover:bg-amber-50/50 dark:hover:bg-stone-800'
          }`}
        >
          {pageNum}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || disabled}
        className={`flex items-center gap-1 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
          currentPage === totalPages || disabled
            ? 'text-stone-300 dark:text-stone-600 bg-stone-100 dark:bg-stone-900 cursor-not-allowed'
            : 'text-stone-800 dark:text-stone-200 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 hover:border-amber-400 dark:hover:border-amber-500 hover:bg-amber-50 dark:hover:bg-stone-800 cursor-pointer shadow-xs'
        }`}
      >
        {lang === 'ar' ? (
          <>
            <ChevronLeft className="w-4 h-4" />
            <span>{nextLabel}</span>
          </>
        ) : (
          <>
            <span>{nextLabel}</span>
            <ChevronRight className="w-4 h-4" />
          </>
        )}
      </button>
    </div>
  );
};
