import React from 'react';
import { Pagination } from '@components/Ui/Pagination';
import type { PaginationData } from '@shared/ui/pagination';

interface PaginationFooterProps {
  pagination: PaginationData;
  goToPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
}

const PaginationFooter: React.FC<PaginationFooterProps> = ({
  pagination,
  goToPage,
  nextPage,
  prevPage,
}) => (
  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
    <Pagination
      {...pagination}
      goToPage={goToPage}
      nextPage={nextPage}
      prevPage={prevPage}
      maxVisiblePages={5}
      showInfo={true}
    />
  </div>
);

export { PaginationFooter };
