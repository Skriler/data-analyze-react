import { useMemo } from 'react';
import { ClusteringResultsProcessor } from '@libs/utils/results';
import type { ClusteringAnalysisResult } from '@api-types/analysis';
import type {
  ProcessedCluster,
  ClusteringStats,
} from '@shared/results/clusteringResultModal';

interface UseClusteringResultReturn {
  processedClusters: ProcessedCluster[];
  stats: ClusteringStats;
}

export const useClusteringResult = (
  result: ClusteringAnalysisResult
): UseClusteringResultReturn => {
  const processedClusters = useMemo(() => {
    return ClusteringResultsProcessor.processClusterData(result.clusters);
  }, [result.clusters]);

  const stats = useMemo(() => {
    return ClusteringResultsProcessor.calculateStats(processedClusters);
  }, [processedClusters]);

  return {
    processedClusters,
    stats,
  };
};
