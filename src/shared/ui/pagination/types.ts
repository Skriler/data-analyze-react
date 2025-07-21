export interface PaginationData {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  startItem: number;
  endItem: number;
}

export interface PaginationControls {
  goToPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
}

export interface PaginationConfig {
  itemsPerPage?: number;
  maxVisiblePages?: number;
  showInfo?: boolean;
}

export interface UsePaginationOptions {
  itemsPerPage?: number;
  resetOnDataChange?: boolean;
}

export interface UsePaginationReturn<T> {
  paginatedData: T[];
  pagination: PaginationData;
  controls: PaginationControls;
}
