import { useCallback, useEffect, useMemo, useState } from 'react';
import { PaginationUtils } from '@libs/utils/ui';
import type {
  UsePaginationOptions,
  UsePaginationReturn,
  PaginationData,
  PaginationControls,
} from '@shared/ui/pagination';

const DEFAULT_ITEMS_PER_PAGE = 10;

export const usePagination = <T>(
  data: T[],
  options: UsePaginationOptions = {}
): UsePaginationReturn<T> => {
  const { itemsPerPage = DEFAULT_ITEMS_PER_PAGE, resetOnDataChange = true } =
    options;

  const [currentPage, setCurrentPage] = useState(1);

  // Calculate pagination data
  const pagination = useMemo((): PaginationData => {
    return PaginationUtils.calculatePaginationData(
      currentPage,
      data.length,
      itemsPerPage
    );
  }, [currentPage, data.length, itemsPerPage]);

  // Get paginated data
  const paginatedData = useMemo((): T[] => {
    return PaginationUtils.paginateArray(
      data,
      pagination.currentPage,
      itemsPerPage
    );
  }, [data, pagination.currentPage, itemsPerPage]);

  // Control functions
  const goToPage = useCallback(
    (page: number) => {
      const totalPages = Math.ceil(data.length / itemsPerPage) || 1;
      const safePage = Math.max(1, Math.min(page, totalPages));
      setCurrentPage(safePage);
    },
    [data.length, itemsPerPage]
  );

  const nextPage = useCallback(() => {
    goToPage(currentPage + 1);
  }, [currentPage, goToPage]);

  const prevPage = useCallback(() => {
    goToPage(currentPage - 1);
  }, [currentPage, goToPage]);

  const controls: PaginationControls = useMemo(
    () => ({
      goToPage,
      nextPage,
      prevPage,
    }),
    [goToPage, nextPage, prevPage]
  );

  // Reset to first page when data changes (if enabled)
  useEffect(() => {
    if (resetOnDataChange) {
      setCurrentPage(1);
    }
  }, [data.length, resetOnDataChange]);

  // Ensure current page is valid when data changes
  useEffect(() => {
    const totalPages = Math.ceil(data.length / itemsPerPage) || 1;
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [data.length, itemsPerPage, currentPage]);

  return {
    paginatedData,
    pagination,
    controls,
  };
};
