import { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ResultsProcessor } from '@libs/utils/results';
import type { AnalysisResultItem, ResultsFiltersType } from '@shared/results';

export const useResults = () => {
  const navigate = useNavigate();

  const [filters, setFilters] = useState<ResultsFiltersType>({
    selectedDataset: 'all',
    selectedType: 'all',
  });

  const {
    data: results,
    refetch,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['analysis', 'results', filters],
    queryFn: async (): Promise<AnalysisResultItem[]> => {
      // TODO: Replace with actual API call
      const mockResults: AnalysisResultItem[] = [
        {
          id: '1',
          type: 'similarity',
          datasetId: '1',
          datasetName: 'Customer Analysis Data',
          timestamp: Date.now() - 2 * 60 * 60 * 1000,
          result: {
            datasetId: 1,
            similarities: [
              {
                objectA: { id: 1, name: 'Customer A' },
                objectB: { id: 2, name: 'Customer B' },
                similarityPercentage: 87.5,
              },
              {
                objectA: { id: 3, name: 'Customer C' },
                objectB: { id: 4, name: 'Customer D' },
                similarityPercentage: 76.2,
              },
            ],
          },
        },
      ];

      return mockResults;
    },
    staleTime: 5 * 60 * 1000,
  });

  const processedResults = useMemo(() => {
    if (!results) return [];
    const filteredResults = ResultsProcessor.applyFilters(results, filters);
    return ResultsProcessor.sortResultsByDate(filteredResults);
  }, [results, filters]);

  const summaryStats = useMemo(() => {
    if (!processedResults.length) return null;
    return ResultsProcessor.calculateSummaryStats(processedResults);
  }, [processedResults]);

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
    refetch();
  }, [refetch]);

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
