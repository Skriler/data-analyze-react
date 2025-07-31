import React from 'react';
import { Pagination } from '@components/Ui/Pagination';
import type { PaginationData } from '@shared/ui/pagination';

interface PaginationFooterProps {
  pagination: PaginationData;
  goToPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  variant?: 'default' | 'clean';
}

const PaginationFooter: React.FC<PaginationFooterProps> = ({
  pagination,
  goToPage,
  nextPage,
  prevPage,
  variant = 'default',
}) => (
  <div
    className={`px-6 py-4 ${variant === 'default' ? 'border-t border-gray-200' : ''}`}
  >
    <Pagination
      {...pagination}
      goToPage={goToPage}
      nextPage={nextPage}
      prevPage={prevPage}
      maxVisiblePages={5}
      showInfo={true}
      variant={variant}
    />
  </div>
);

export { PaginationFooter };
