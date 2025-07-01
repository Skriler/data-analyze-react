import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import type {
  AnalysisResultItem,
  ResultsFiltersType,
} from '@components/Results/types';

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
  } = useQuery({
    queryKey: ['analysis', 'results', filters],
    queryFn: async (): Promise<AnalysisResultItem[]> => {
      // TODO: Replace with actual API call to get cached results
      // Mock data for demonstration
      const mockResults: AnalysisResultItem[] = [
        {
          id: '1',
          type: 'similarity',
          datasetId: '1',
          datasetName: 'Customer Analysis Data',
          timestamp: Date.now() - 2 * 60 * 60 * 1000, // 2 hours ago
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

      // Apply filters
      let filteredResults = mockResults;

      if (filters.selectedDataset !== 'all') {
        filteredResults = filteredResults.filter(
          result => result.datasetId === filters.selectedDataset
        );
      }

      if (filters.selectedType !== 'all') {
        filteredResults = filteredResults.filter(
          result => result.type === filters.selectedType
        );
      }

      return filteredResults;
    },
  });

  const onFiltersChange = (newFilters: ResultsFiltersType) => {
    setFilters(newFilters);
  };

  const onViewDetails = (id: string) => {
    // TODO: Implement view details functionality
    console.log('View details for result:', id);
  };

  const onExport = (id: string) => {
    // TODO: Implement export functionality
    console.log('Export result:', id);
  };

  const onGoToAnalysis = (datasetId?: string) => {
    const path = datasetId ? `/analysis/${datasetId}` : '/analysis';
    navigate(path);
  };

  const onRefresh = () => {
    refetch();
  };

  return {
    results,
    filters,
    isLoading,
    onFiltersChange,
    onViewDetails,
    onExport,
    onGoToAnalysis,
    onRefresh,
  };
};
