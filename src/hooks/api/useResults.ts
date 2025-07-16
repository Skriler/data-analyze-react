import { useQuery } from '@tanstack/react-query';
import { resultsApi } from '@api/endpoints/results';
import type {
  ClusteringAnalysisResult,
  SimilarityAnalysisResult,
  ClusteringAlgorithm,
} from '@api-types/analysis';

const RESULTS_QUERY_KEYS = {
  // Clustering results
  allClustering: ['results', 'clustering'] as const,
  clusteringByDataset: (datasetId: number) =>
    ['results', 'clustering', 'dataset', datasetId] as const,
  clusteringByAlgorithm: (datasetId: number, algorithm: ClusteringAlgorithm) =>
    [
      'results',
      'clustering',
      'dataset',
      datasetId,
      'algorithm',
      algorithm,
    ] as const,

  // Similarity results
  allSimilarity: ['results', 'similarity'] as const,
  similarityByDataset: (datasetId: number) =>
    ['results', 'similarity', 'dataset', datasetId] as const,
} as const;

// === Clustering Results Hooks ===

/**
 * Get all clustering analysis results.
 */
export const useAllClusteringResults = () => {
  return useQuery<ClusteringAnalysisResult[], Error>({
    queryKey: RESULTS_QUERY_KEYS.allClustering,
    queryFn: () => resultsApi.getAllClusteringResults(),
  });
};

/**
 * Get clustering analysis results by dataset ID.
 * Disabled if dataset ID <= 0.
 *
 * @param datasetId - Dataset ID.
 */
export const useClusteringResultsByDataset = (datasetId: number) => {
  return useQuery<ClusteringAnalysisResult[], Error>({
    queryKey: RESULTS_QUERY_KEYS.clusteringByDataset(datasetId),
    queryFn: () => resultsApi.getClusteringResultsByDataset(datasetId),
    enabled: datasetId > 0,
  });
};

/**
 * Get clustering analysis results by dataset ID and algorithm.
 * Disabled if dataset ID <= 0.
 *
 * @param datasetId - Dataset ID.
 * @param algorithm - Clustering algorithm to filter by.
 */
export const useClusteringResultsByAlgorithm = (
  datasetId: number,
  algorithm: ClusteringAlgorithm
) => {
  return useQuery<ClusteringAnalysisResult[], Error>({
    queryKey: RESULTS_QUERY_KEYS.clusteringByAlgorithm(datasetId, algorithm),
    queryFn: () =>
      resultsApi.getClusteringResultsByAlgorithm(datasetId, algorithm),
    enabled: datasetId > 0,
  });
};

// === Similarity Results Hooks ===

/**
 * Get all similarity analysis results.
 */
export const useAllSimilarityResults = () => {
  return useQuery<SimilarityAnalysisResult[], Error>({
    queryKey: RESULTS_QUERY_KEYS.allSimilarity,
    queryFn: () => resultsApi.getAllSimilarityResults(),
  });
};

/**
 * Get similarity analysis results by dataset ID.
 * Disabled if dataset ID <= 0.
 *
 * @param datasetId - Dataset ID.
 */
export const useSimilarityResultsByDataset = (datasetId: number) => {
  return useQuery<SimilarityAnalysisResult[], Error>({
    queryKey: RESULTS_QUERY_KEYS.similarityByDataset(datasetId),
    queryFn: () => resultsApi.getSimilarityResultsByDataset(datasetId),
    enabled: datasetId > 0,
  });
};

// === Combined Results Hooks ===

/**
 * Get all analysis results for a specific dataset.
 * Returns both clustering and similarity results.
 *
 * @param datasetId - Dataset ID.
 */
export const useDatasetAnalysisResults = (datasetId: number) => {
  const clusteringResults = useClusteringResultsByDataset(datasetId);
  const similarityResults = useSimilarityResultsByDataset(datasetId);

  return {
    clustering: clusteringResults,
    similarity: similarityResults,
    isLoading: clusteringResults.isLoading || similarityResults.isLoading,
    error: clusteringResults.error || similarityResults.error,
  };
};
