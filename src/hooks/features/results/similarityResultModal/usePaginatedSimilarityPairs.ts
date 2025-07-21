import {
  SIMILARITY_CONFIG,
  type ProcessedSimilarityPair,
} from '@shared/results/similarityResultModal';
import { usePagination } from '@hooks/features/ui/usePagination';

export const usePaginatedSimilarityPairs = (
  pairs: ProcessedSimilarityPair[],
  itemsPerPage: number = SIMILARITY_CONFIG.ITEMS_PER_PAGE
) => {
  const { paginatedData, pagination, controls } = usePagination(pairs, {
    itemsPerPage,
    resetOnDataChange: true,
  });

  return {
    paginatedPairs: paginatedData,
    pagination,
    ...controls,
  };
};
