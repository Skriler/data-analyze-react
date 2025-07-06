import React from 'react';
import { ResultsFilters } from './filters/ResultsFilters';
import { ResultCard } from './card/ResultCard';
import { EmptyResultsState } from './empty/EmptyResultsState';
import { SummaryStats } from './summary/SummaryStats';
import { LoadingSkeleton } from './skeleton/LoadingSkeleton';
import { ResultsHeader } from './header/ResultsHeader';
import type { DatasetDto } from '@api-types/dataset';
import type { AnalysisResultItem, ResultsFiltersType } from '@shared/results';
import { ResultsProcessor } from '@libs/utils/results';

interface ResultsContentProps {
  datasets: DatasetDto[] | undefined;
  results: AnalysisResultItem[] | undefined;
  filters: ResultsFiltersType;
  isLoading: boolean;
  isDatasetsLoading: boolean;
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
  const processedResults = React.useMemo(() => {
    if (!results) return [];
    const filteredResults = ResultsProcessor.applyFilters(results, filters);
    return ResultsProcessor.sortResultsByDate(filteredResults);
  }, [results, filters]);

  const summaryStats = React.useMemo(() => {
    if (!processedResults.length) return null;
    return ResultsProcessor.calculateSummaryStats(processedResults);
  }, [processedResults]);

  if (isLoading) {
    return <LoadingSkeleton />;
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
        {processedResults.length === 0 ? (
          <EmptyResultsState onGoToAnalysis={onGoToAnalysis} />
        ) : (
          <>
            <ResultsListHeader count={processedResults.length} />
            <div className="space-y-6">
              {processedResults.map(resultItem => (
                <ResultCard
                  key={resultItem.id}
                  resultItem={resultItem}
                  onViewDetails={onViewDetails}
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
