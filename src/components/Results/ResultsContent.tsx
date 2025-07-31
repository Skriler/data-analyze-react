import React from 'react';
import { ResultsFilters } from './Filters';
import { ResultCard } from './Card';
import { SummaryStats } from './Summary';
import { EmptyResultsState, LoadingSkeleton, ResultsHeader } from './Common';
import type { DatasetDto } from '@api-types/dataset';
import type { AnalysisResultItem, ResultsFiltersType } from '@shared/results';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ResultsContentProps {
  datasets: DatasetDto[];
  isDatasetsLoading: boolean;
  results: AnalysisResultItem[];
  summaryStats: {
    totalAnalyses: number;
    uniqueDatasets: number;
    analysisTypes: number;
  } | null;
  filters: ResultsFiltersType;
  isLoading: boolean;
  error: unknown;
  onFiltersChange: (filters: ResultsFiltersType) => void;
  onGoToAnalysis: () => void;
  onRefresh: () => void;
}

const ResultsContent: React.FC<ResultsContentProps> = ({
  datasets,
  results,
  summaryStats,
  filters,
  isLoading,
  error,
  onFiltersChange,
  onGoToAnalysis,
  onRefresh,
}) => {
  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="flex flex-col items-center space-y-6">
          <div className="inline-flex items-center gap-2 px-6 py-3 text-white font-semibold rounded-xl bg-red-400 hover:bg-red-500 shadow-lg transition-all duration-200">
            <AlertCircle className="h-5 w-5" />
            Error loading results
          </div>

          <button
            onClick={onRefresh}
            className="inline-flex items-center gap-2 px-6 py-3 text-white font-semibold rounded-xl bg-blue-500 hover:bg-blue-600 shadow-lg transition-all duration-200"
          >
            <RefreshCw className="h-5 w-5" />
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <ResultsHeader />

      <ResultsFilters
        filters={filters}
        datasets={datasets as DatasetDto[]}
        onFiltersChange={onFiltersChange}
      />

      {summaryStats && <SummaryStats stats={summaryStats} />}

      <div className="space-y-6">
        {results.length === 0 ? (
          <EmptyResultsState onGoToAnalysis={onGoToAnalysis} />
        ) : (
          <>
            <div className="space-y-6">
              {results.map((resultItem, index) => (
                <ResultCard
                  key={`${resultItem.id}-${index}`}
                  resultItem={resultItem}
                  dataset={datasets.find(d => d.id === resultItem.datasetId)!}
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
