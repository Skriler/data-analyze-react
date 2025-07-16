import { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useAllClusteringResults,
  useAllSimilarityResults,
} from '@hooks/api/useResults';
import { ResultsProcessor } from '@libs/utils/results';
import type { AnalysisResultItem, ResultsFiltersType } from '@shared/results';

export const useResults = () => {
  const navigate = useNavigate();

  const [filters, setFilters] = useState<ResultsFiltersType>({
    selectedDataset: 'all',
    selectedType: 'all',
  });

  // Get real data using hooks
  const {
    data: clusteringResults,
    isLoading: isClusteringLoading,
    error: clusteringError,
    refetch: refetchClustering,
  } = useAllClusteringResults();

  const {
    data: similarityResults,
    isLoading: isSimilarityLoading,
    error: similarityError,
    refetch: refetchSimilarity,
  } = useAllSimilarityResults();

  // Combine results and transform to required format
  const results = useMemo((): AnalysisResultItem[] => {
    const combinedResults: AnalysisResultItem[] = [];

    // Add clustering results with specific algorithm types
    if (clusteringResults) {
      clusteringResults.forEach(result => {
        let algorithmType: 'KMeans' | 'DBSCAN' | 'Agglomerative';

        // Map algorithm enum values to type names
        switch (result.algorithm) {
          case 0: // ClusteringAlgorithm.KMeans
            algorithmType = 'KMeans';
            break;
          case 1: // ClusteringAlgorithm.DBSCAN
            algorithmType = 'DBSCAN';
            break;
          case 2: // ClusteringAlgorithm.Agglomerative
            algorithmType = 'Agglomerative';
            break;
          default:
            algorithmType = 'KMeans'; // fallback
        }

        combinedResults.push({
          id: `clustering_${algorithmType}_${result.datasetId}_${Date.now()}`,
          type: algorithmType,
          datasetId: result.datasetId.toString(),
          datasetName: `Dataset ${result.datasetId}`, // TODO: get real dataset name from datasets
          timestamp: Date.now(), // TODO: add timestamp to API results
          result: result,
        });
      });
    }

    // Add similarity analysis results
    if (similarityResults) {
      similarityResults.forEach(result => {
        combinedResults.push({
          id: `similarity_${result.datasetId}_${Date.now()}`,
          type: 'similarity',
          datasetId: result.datasetId.toString(),
          datasetName: `Dataset ${result.datasetId}`, // TODO: get real dataset name from datasets
          timestamp: Date.now(), // TODO: add timestamp to API results
          result: result,
        });
      });
    }

    return combinedResults;
  }, [clusteringResults, similarityResults]);

  const processedResults = useMemo(() => {
    if (!results) return [];
    const filteredResults = ResultsProcessor.applyFilters(results, filters);
    return ResultsProcessor.sortResultsByDate(filteredResults);
  }, [results, filters]);

  const summaryStats = useMemo(() => {
    if (!processedResults.length) return null;
    return ResultsProcessor.calculateSummaryStats(processedResults);
  }, [processedResults]);

  const isLoading = isClusteringLoading || isSimilarityLoading;
  const error = clusteringError || similarityError;

  const onFiltersChange = useCallback((newFilters: ResultsFiltersType) => {
    setFilters(newFilters);
  }, []);

  const onViewDetails = useCallback((id: string) => {
    console.log('View details for result:', id);
    // TODO: Implement actual view details logic
  }, []);

  const onExport = useCallback((id: string) => {
    console.log('Export result:', id);
    // TODO: Implement actual export logic
  }, []);

  const onGoToAnalysis = useCallback(
    (datasetId?: string) => {
      const path = datasetId ? `/analysis/${datasetId}` : '/analysis';
      navigate(path);
    },
    [navigate]
  );

  const onRefresh = useCallback(() => {
    refetchClustering();
    refetchSimilarity();
  }, [refetchClustering, refetchSimilarity]);

  return {
    results: processedResults,
    summaryStats,
    filters,
    isLoading,
    error,
    onFiltersChange,
    onViewDetails,
    onExport,
    onGoToAnalysis,
    onRefresh,
  };
};
