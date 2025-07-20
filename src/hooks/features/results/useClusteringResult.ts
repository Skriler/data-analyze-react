import { useMemo } from 'react';
import { ClusteringResultsProcessor } from '@libs/utils/results/clusteringResultsProcessor';
import type { ClusteringAnalysisResult } from '@api-types/analysis';
import type {
  ProcessedCluster,
  ClusteringStats,
} from '@shared/results/clusteringResultModal';

interface UseClusteringResultReturn {
  processedClusters: ProcessedCluster[];
  stats: ClusteringStats;
  topClusters: ProcessedCluster[];
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

  const topClusters = useMemo(() => {
    return ClusteringResultsProcessor.getTopClusters(processedClusters, 10);
  }, [processedClusters]);

  return {
    processedClusters,
    stats,
    topClusters,
  };
};
