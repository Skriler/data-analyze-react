import type { PaginationData } from '@shared/ui/pagination';

export class PaginationUtils {
  static calculatePaginationData(
    currentPage: number,
    totalItems: number,
    itemsPerPage: number
  ): PaginationData {
    const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
    const safePage = Math.max(1, Math.min(currentPage, totalPages));
    const startItem = totalItems > 0 ? (safePage - 1) * itemsPerPage + 1 : 0;
    const endItem = Math.min(safePage * itemsPerPage, totalItems);

    return {
      currentPage: safePage,
      totalPages,
      totalItems,
      itemsPerPage,
      startItem,
      endItem,
    };
  }

  static getVisiblePages(
    currentPage: number,
    totalPages: number,
    maxVisiblePages: number = 5
  ): number[] {
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const halfVisible = Math.floor(maxVisiblePages / 2);
    let startPage = Math.max(1, currentPage - halfVisible);
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  }

  static shouldShowEllipsis(
    visiblePages: number[],
    totalPages: number,
    position: 'start' | 'end'
  ): boolean {
    if (position === 'start') {
      return visiblePages[0] > 1 && visiblePages[0] > 2;
    }
    return (
      visiblePages[visiblePages.length - 1] < totalPages &&
      visiblePages[visiblePages.length - 1] < totalPages - 1
    );
  }

  static shouldShowFirstPage(visiblePages: number[]): boolean {
    return visiblePages[0] > 1;
  }

  static shouldShowLastPage(
    visiblePages: number[],
    totalPages: number
  ): boolean {
    return visiblePages[visiblePages.length - 1] < totalPages;
  }

  static paginateArray<T>(
    array: T[],
    currentPage: number,
    itemsPerPage: number
  ): T[] {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return array.slice(startIndex, endIndex);
  }
}
