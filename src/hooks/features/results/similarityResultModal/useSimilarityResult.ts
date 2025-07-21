import { useMemo, useState } from 'react';
import { SimilarityResultsProcessor } from '@libs/utils/results';
import type { SimilarityAnalysisResult } from '@api-types/analysis';
import {
  type ProcessedSimilarityPair,
  type SimilarityDistributionData,
  type SimilarityLoadingState,
} from '@shared/results/similarityResultModal';
import type { SimilarityStats } from '@shared/results';

interface UseSimilarityResultReturn {
  processedPairs: ProcessedSimilarityPair[];
  stats: SimilarityStats;
  exactMatches: ProcessedSimilarityPair[];
  distribution: SimilarityDistributionData[];
  loadingState: SimilarityLoadingState;
}

export const useSimilarityResult = (
  result: SimilarityAnalysisResult
): UseSimilarityResultReturn => {
  const [loadingState, setLoadingState] =
    useState<SimilarityLoadingState>('idle');

  const processedPairs = useMemo(() => {
    if (!result?.similarities) return [];

    setLoadingState('processing');

    const pairs = SimilarityResultsProcessor.processSimilarityData(
      result.similarities
    );

    setTimeout(() => setLoadingState('loaded'), 100);
    return pairs;
  }, [result.similarities]);

  const stats = useMemo(() => {
    return SimilarityResultsProcessor.calculateStats(processedPairs);
  }, [processedPairs]);

  const exactMatches = useMemo(() => {
    return SimilarityResultsProcessor.getExactMatches(processedPairs);
  }, [processedPairs]);

  const distribution = useMemo(() => {
    return SimilarityResultsProcessor.calculateDistribution(processedPairs);
  }, [processedPairs]);

  return {
    processedPairs,
    stats,
    exactMatches,
    distribution,
    loadingState,
  };
};
