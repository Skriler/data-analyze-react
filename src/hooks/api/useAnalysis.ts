import { useMutation, useQueryClient } from '@tanstack/react-query';
import { analysisApi } from '@api/endpoints/analysis';
import {
  ClusteringAlgorithm,
  type SimilarityAnalysisResult,
  type ClusteringAnalysisResult,
  type BaseAnalysisResult,
  type KMeansClusteringRequest,
  type DBSCANClusteringRequest,
  type AgglomerativeClusteringRequest,
} from '@api-types/analysis';
import type {
  ClusteringMutationVariables,
  SimilarityMutationVariables,
  SimilarityCache,
  ClusteringCache,
} from './types';

const ANALYSIS_QUERY_KEYS = {
  results: (datasetId: number) => ['analysis', 'results', datasetId] as const,

  similarity: (datasetId: number) =>
    ['analysis', 'similarity', datasetId] as const,

  clustering: (datasetId: number, algorithm: ClusteringAlgorithm) =>
    ['analysis', 'clustering', datasetId, algorithm] as const,
} as const;

/**
 * Generate cache state representing a loading operation.
 */
const createLoadingState = <T>(): T =>
  ({
    isLoading: true,
    result: null,
  }) as T;

/**
 * Generate cache state for successful result.
 */
const createSuccessState = <T>(
  result: BaseAnalysisResult,
  timestamp = Date.now()
): T =>
  ({
    isLoading: false,
    result,
    timestamp,
  }) as T;

/**
 * Generate cache state for error result.
 */
const createErrorState = <T>(errorMessage: string): T =>
  ({
    isLoading: false,
    result: null,
    error: errorMessage,
  }) as T;

/**
 * Run similarity analysis on a dataset.
 * Stores result in query cache.
 */
export const useSimilarityAnalysis = () => {
  const queryClient = useQueryClient();

  return useMutation<
    SimilarityAnalysisResult,
    Error,
    SimilarityMutationVariables
  >({
    mutationFn: ({ datasetId, request }: SimilarityMutationVariables) =>
      analysisApi.runSimilarityAnalysis(datasetId, request),

    onMutate: async ({ datasetId }: SimilarityMutationVariables) => {
      const queryKey = ANALYSIS_QUERY_KEYS.similarity(datasetId);
      queryClient.setQueryData(queryKey, createLoadingState<SimilarityCache>());
    },

    onSuccess: (
      result: SimilarityAnalysisResult,
      { datasetId }: SimilarityMutationVariables
    ) => {
      const queryKey = ANALYSIS_QUERY_KEYS.similarity(datasetId);

      queryClient.setQueryData(
        queryKey,
        createSuccessState<SimilarityCache>(result)
      );
      queryClient.invalidateQueries({
        queryKey: ANALYSIS_QUERY_KEYS.results(datasetId),
      });
    },

    onError: (error: Error, { datasetId }: SimilarityMutationVariables) => {
      const queryKey = ANALYSIS_QUERY_KEYS.similarity(datasetId);
      queryClient.setQueryData(
        queryKey,
        createErrorState<SimilarityCache>(error.message)
      );
    },
  });
};

/**
 * Internal clustering hook for selected algorithm.
 * Stores result per algorithm and dataset.
 */
const useClustering = (algorithm: ClusteringAlgorithm) => {
  const queryClient = useQueryClient();

  const clusteringApiMap = {
    [ClusteringAlgorithm.KMeans]:
      analysisApi.runKMeansClustering.bind(analysisApi),
    [ClusteringAlgorithm.DBSCAN]:
      analysisApi.runDBSCANClustering.bind(analysisApi),
    [ClusteringAlgorithm.Agglomerative]:
      analysisApi.runAgglomerativeClustering.bind(analysisApi),
  } as const;

  const apiFunction = clusteringApiMap[algorithm];

  return useMutation<
    ClusteringAnalysisResult,
    Error,
    ClusteringMutationVariables
  >({
    mutationFn: ({ datasetId, request }: ClusteringMutationVariables) =>
      apiFunction(
        datasetId,
        request as KMeansClusteringRequest &
          DBSCANClusteringRequest &
          AgglomerativeClusteringRequest
      ),

    onMutate: async ({ datasetId }: ClusteringMutationVariables) => {
      const queryKey = ANALYSIS_QUERY_KEYS.clustering(datasetId, algorithm);
      queryClient.setQueryData(queryKey, createLoadingState<ClusteringCache>());
    },

    onSuccess: (
      result: ClusteringAnalysisResult,
      { datasetId }: ClusteringMutationVariables
    ) => {
      const queryKey = ANALYSIS_QUERY_KEYS.clustering(datasetId, algorithm);

      queryClient.setQueryData(
        queryKey,
        createSuccessState<ClusteringCache>(result)
      );
      queryClient.invalidateQueries({
        queryKey: ANALYSIS_QUERY_KEYS.results(datasetId),
      });
    },

    onError: (error: Error, { datasetId }) => {
      const queryKey = ANALYSIS_QUERY_KEYS.clustering(datasetId, algorithm);

      queryClient.setQueryData<ClusteringCache>(queryKey, {
        isLoading: false,
        result: null,
        timestamp: Date.now(),
        error: error.message,
      });
    },
  });
};

/**
 * Run KMeans clustering analysis.
 */
export const useKMeansClustering = () =>
  useClustering(ClusteringAlgorithm.KMeans);

/**
 * Run DBSCAN clustering analysis.
 */
export const useDBSCANClustering = () =>
  useClustering(ClusteringAlgorithm.DBSCAN);

/**
 * Run Agglomerative clustering analysis.
 */
export const useAgglomerativeClustering = () =>
  useClustering(ClusteringAlgorithm.Agglomerative);
