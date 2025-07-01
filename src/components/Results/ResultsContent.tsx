import React from 'react';
import { ResultsFilters } from './ResultsFilters';
import { ResultCard } from './ResultCard';
import { EmptyResultsState } from './EmptyResultsState';
import type { DatasetDto } from '@api-types/dataset';
import type {
  AnalysisResultItem,
  ResultsFiltersType,
} from './types';

interface ResultsContentProps {
  datasets: DatasetDto[] | undefined;
  results: AnalysisResultItem[] | undefined;
  filters: ResultsFiltersType;
  isLoading: boolean;
  onFiltersChange: (filters: ResultsFiltersType) => void;
  onViewDetails: (id: string) => void;
  onExport: (id: string) => void;
  onGoToAnalysis: () => void;
  onRefresh: () => void;
}

export const ResultsContent: React.FC<ResultsContentProps> = ({
  datasets,
  results,
  filters,
  isLoading,
  onFiltersChange,
  onViewDetails,
  onExport,
  onGoToAnalysis,
  onRefresh,
}) => {
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-[200px] h-10 bg-gray-200 rounded animate-pulse"></div>
          <div className="w-[200px] h-10 bg-gray-200 rounded animate-pulse"></div>
          <div className="w-24 h-10 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-64 bg-gray-200 rounded-lg animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ResultsFilters
        filters={filters}
        datasets={datasets}
        onFiltersChange={onFiltersChange}
        onRefresh={onRefresh}
      />

      <div className="space-y-6">
        {!results || results.length === 0 ? (
          <EmptyResultsState onGoToAnalysis={onGoToAnalysis} />
        ) : (
          <div className="space-y-6">
            {results.map(resultItem => (
              <ResultCard
                key={resultItem.id}
                resultItem={resultItem}
                onViewDetails={onViewDetails}
                onExport={onExport}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
