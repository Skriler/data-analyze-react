import React from 'react';
import { ResultsFilters } from './Filters';
import { ResultCard } from './Card';
import { SummaryStats } from './Summary';
import {
  EmptyResultsState,
  LoadingSkeleton,
  ResultsHeader,
  ResultsListHeader,
} from './Common';
import type { DatasetDto } from '@api-types/dataset';
import type { AnalysisResultItem, ResultsFiltersType } from '@shared/results';

interface ResultsContentProps {
  datasets: DatasetDto[] | undefined;
  isDatasetsLoading: boolean;
  results: AnalysisResultItem[];
  summaryStats: any;
  filters: ResultsFiltersType;
  isLoading: boolean;
  error: any;
  onFiltersChange: (filters: ResultsFiltersType) => void;
  onExport: (id: string) => void;
  onGoToAnalysis: () => void;
  onRefresh: () => void;
}

const ResultsContent: React.FC<ResultsContentProps> = ({
  datasets,
  isDatasetsLoading,
  results,
  summaryStats,
  filters,
  isLoading,
  error,
  onFiltersChange,
  onExport,
  onGoToAnalysis,
  onRefresh,
}) => {
  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">Error loading resultsв</p>
        <button
          onClick={onRefresh}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <ResultsHeader />

      <ResultsFilters
        filters={filters}
        datasets={datasets}
        onFiltersChange={onFiltersChange}
        onRefresh={onRefresh}
      />

      {summaryStats && <SummaryStats stats={summaryStats} />}

      <div className="space-y-6">
        {results.length === 0 ? (
          <EmptyResultsState onGoToAnalysis={onGoToAnalysis} />
        ) : (
          <>
            <ResultsListHeader count={results.length} />
            <div className="space-y-6">
              {results.map((resultItem, index) => (
                <ResultCard
                  key={`${resultItem.id}-${index}`}
                  resultItem={resultItem}
                  onExport={onExport}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export { ResultsContent };
