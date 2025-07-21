import {
  CLUSTERING_CONFIG,
  type ProcessedCluster,
} from '@shared/results/clusteringResultModal';
import { usePagination } from '@hooks/features/ui/usePagination';

export const usePaginatedClusters = (
  clusters: ProcessedCluster[],
  itemsPerPage: number = CLUSTERING_CONFIG.ITEMS_PER_PAGE
) => {
  const { paginatedData, pagination, controls } = usePagination(clusters, {
    itemsPerPage,
    resetOnDataChange: true,
  });

  return {
    paginatedClusters: paginatedData,
    pagination,
    ...controls,
  };
};
