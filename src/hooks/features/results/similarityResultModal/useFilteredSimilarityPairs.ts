import { useMemo } from 'react';
import type { SimilarityStats } from '@shared/results';
import type {
  ProcessedSimilarityPair,
  SimilarityFilter,
  SimilaritySortOption,
} from '@shared/results/similarityResultModal';
import { SimilarityResultsProcessor } from '@libs/utils/results';

interface UseFilteredSimilarityPairsProps {
  pairs: ProcessedSimilarityPair[];
  searchTerm: string;
  filter: SimilarityFilter;
  sortOption: SimilaritySortOption;
}

interface UseFilteredSimilarityPairsReturn {
  filteredPairs: ProcessedSimilarityPair[];
  filteredStats: SimilarityStats;
}

export const useFilteredSimilarityPairs = ({
  pairs,
  searchTerm,
  filter,
  sortOption,
}: UseFilteredSimilarityPairsProps): UseFilteredSimilarityPairsReturn => {
  const filteredPairs = useMemo(() => {
    let filtered = pairs;

    // Apply range filter
    filtered = SimilarityResultsProcessor.filterByRange(filtered, filter);

    // Apply search filter
    filtered = SimilarityResultsProcessor.filterBySearch(filtered, searchTerm);

    // Apply sorting
    filtered = SimilarityResultsProcessor.sortPairs(filtered, sortOption);

    return filtered;
  }, [pairs, searchTerm, filter, sortOption]);

  const filteredStats = useMemo(() => {
    return SimilarityResultsProcessor.calculateStats(filteredPairs);
  }, [filteredPairs]);

  return {
    filteredPairs,
    filteredStats,
  };
};
