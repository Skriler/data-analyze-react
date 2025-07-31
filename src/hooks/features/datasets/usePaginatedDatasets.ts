import type { DatasetDto } from '@api-types/dataset';
import { usePagination } from '@hooks/features/ui/usePagination';

export const usePaginatedDatasets = (
  datasets: DatasetDto[],
  itemsPerPage: number = 6
) => {
  const { paginatedData, pagination, controls } = usePagination(datasets, {
    itemsPerPage,
    resetOnDataChange: true,
  });

  return {
    paginatedDatasets: paginatedData,
    pagination,
    ...controls,
  };
};
