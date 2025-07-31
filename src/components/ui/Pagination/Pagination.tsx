import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PaginationUtils } from '@libs/utils/ui';
import type { PaginationControls, PaginationData } from '@shared/ui/pagination';

interface PaginationProps extends PaginationData, PaginationControls {
  maxVisiblePages?: number;
  showInfo?: boolean;
  className?: string;
  variant?: 'default' | 'clean';
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  startItem,
  endItem,
  goToPage,
  nextPage,
  prevPage,
  maxVisiblePages = 5,
  showInfo = true,
  className = '',
  variant = 'default',
}) => {
  const [inputPage, setInputPage] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Calculate visible pages and UI state
  const visiblePages = PaginationUtils.getVisiblePages(
    currentPage,
    totalPages,
    maxVisiblePages
  );
  const showFirstPage = PaginationUtils.shouldShowFirstPage(visiblePages);
  const showLastPage = PaginationUtils.shouldShowLastPage(
    visiblePages,
    totalPages
  );
  const showStartEllipsis = PaginationUtils.shouldShowEllipsis(
    visiblePages,
    totalPages,
    'start'
  );
  const showEndEllipsis = PaginationUtils.shouldShowEllipsis(
    visiblePages,
    totalPages,
    'end'
  );
  const shouldShowPageInput = totalPages > 10;

  // Input handlers
  const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d+$/.test(value)) {
      setInputPage(value);
    }
  };

  const handlePageInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const pageNumber = parseInt(inputPage, 10);

    if (
      pageNumber >= 1 &&
      pageNumber <= totalPages &&
      pageNumber !== currentPage
    ) {
      goToPage(pageNumber);
    }

    setInputPage('');
    setIsInputFocused(false);
    inputRef.current?.blur();
  };

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setInputPage('');
      setIsInputFocused(false);
      inputRef.current?.blur();
    }
  };

  // Clear input when page changes or focus is lost
  useEffect(() => {
    if (!isInputFocused) {
      setInputPage('');
    }
  }, [currentPage, isInputFocused]);

  // Don't render if there's only one page or less
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className={`flex items-center justify-between ${className}`}>
      {/* Items info */}
      {showInfo && (
        <div
          className={`text-sm ${variant === 'clean' ? 'text-gray-500 text-center mb-4' : 'text-gray-600'}`}
        >
          {variant === 'clean'
            ? `${totalItems} datasets • Page ${currentPage} of ${totalPages}`
            : `Showing ${startItem} to ${endItem} of ${totalItems} results`}
        </div>
      )}
      {/* Pagination controls */}
      <div
        className={`flex items-center space-x-1 ${variant === 'clean' ? 'justify-center' : ''}`}
      >
        {/* Previous button */}
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className={`p-2 transition-colors ${
            variant === 'clean'
              ? 'text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg disabled:opacity-30'
              : 'text-gray-400 hover:text-gray-600'
          } disabled:cursor-not-allowed`}
          aria-label="Previous page"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-1">
          {/* First page */}
          {showFirstPage && (
            <>
              <button
                onClick={() => goToPage(1)}
                className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                  variant === 'clean'
                    ? 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                aria-label="Go to page 1"
              >
                1
              </button>
              {showStartEllipsis && (
                <span className="px-2 text-gray-400">...</span>
              )}
            </>
          )}

          {/* Visible page numbers */}
          {visiblePages.map(page => (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                currentPage === page
                  ? `text-white ${variant === 'clean' ? 'bg-blue-600 shadow-sm' : 'bg-blue-500'}`
                  : `text-gray-600 hover:bg-gray-100 ${variant === 'clean' ? 'hover:text-gray-900' : ''}`
              }`}
              aria-label={`Go to page ${page}`}
              aria-current={currentPage === page ? 'page' : undefined}
            >
              {page}
            </button>
          ))}

          {/* Page input and last page */}
          {shouldShowPageInput && showLastPage && (
            <div className="flex items-center space-x-2">
              {showEndEllipsis && (
                <span className="px-2 text-gray-400">...</span>
              )}
              <div className="flex items-center space-x-1">
                <span className="text-sm text-gray-500">Go to:</span>
                <form onSubmit={handlePageInputSubmit} className="inline-block">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputPage}
                    onChange={handlePageInputChange}
                    onFocus={() => setIsInputFocused(true)}
                    onBlur={() => setIsInputFocused(false)}
                    onKeyDown={handleInputKeyDown}
                    placeholder={`1-${totalPages}`}
                    className="w-16 px-2 py-1 text-sm text-center border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    maxLength={totalPages.toString().length}
                    aria-label="Go to page number"
                  />
                </form>
              </div>
            </div>
          )}

          {/* Last page */}
          {showLastPage && (
            <>
              {!shouldShowPageInput && showEndEllipsis && (
                <span className="px-2 text-gray-400">...</span>
              )}
              <button
                onClick={() => goToPage(totalPages)}
                className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                  currentPage === totalPages
                    ? `text-white ${variant === 'clean' ? 'bg-blue-600 shadow-sm' : 'bg-blue-500'}`
                    : `text-gray-600 hover:bg-gray-100 ${variant === 'clean' ? 'hover:text-gray-900' : ''}`
                }`}
                aria-label={`Go to page ${totalPages}`}
              >
                {totalPages}
              </button>
            </>
          )}
        </div>

        {/* Next button */}
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className={`p-2 transition-colors ${
            variant === 'clean'
              ? 'text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg disabled:opacity-30'
              : 'text-gray-400 hover:text-gray-600'
          } disabled:cursor-not-allowed`}
          aria-label="Next page"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export { Pagination };
