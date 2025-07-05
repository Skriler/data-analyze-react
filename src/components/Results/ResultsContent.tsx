import React from 'react';
import { BarChart3, TrendingUp, Activity } from 'lucide-react';
import { ResultsFilters } from './ResultsFilters';
import { ResultCard } from './ResultCard';
import { EmptyResultsState } from './EmptyResultsState';
import type { DatasetDto } from '@api-types/dataset';
import type { AnalysisResultItem, ResultsFiltersType } from '@shared/results';
import { ResultsProcessor } from '@libs/utils/results/utils';

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
  // Process and filter results
  const processedResults = React.useMemo(() => {
    if (!results) return [];

    const filteredResults = ResultsProcessor.filterResults(results, filters);
    return ResultsProcessor.sortResultsByDate(filteredResults);
  }, [results, filters]);

  // Calculate summary stats
  const summaryStats = React.useMemo(() => {
    if (!processedResults.length) return null;

    const totalAnalyses = processedResults.length;
    const uniqueDatasets = new Set(processedResults.map(r => r.datasetId)).size;
    const analysisTypes = new Set(processedResults.map(r => r.type)).size;

    return {
      totalAnalyses,
      uniqueDatasets,
      analysisTypes,
    };
  }, [processedResults]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        {/* Header skeleton */}
        <div className="text-center space-y-4">
          <div className="w-64 h-8 bg-gray-200 rounded mx-auto animate-pulse"></div>
          <div className="w-96 h-5 bg-gray-200 rounded mx-auto animate-pulse"></div>
        </div>

        {/* Filters skeleton */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-[200px] h-10 bg-gray-200 rounded animate-pulse"></div>
          <div className="w-[200px] h-10 bg-gray-200 rounded animate-pulse"></div>
          <div className="w-24 h-10 bg-gray-200 rounded animate-pulse"></div>
        </div>

        {/* Stats skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-24 bg-gray-200 rounded-lg animate-pulse"
            ></div>
          ))}
        </div>

        {/* Results skeleton */}
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
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl shadow-lg">
          <BarChart3 className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Analysis Results
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            View and analyze your completed analysis results. Track insights,
            export data, and compare different analysis approaches.
          </p>
        </div>
      </div>

      {/* Filters */}
      <ResultsFilters
        filters={filters}
        datasets={datasets}
        onFiltersChange={onFiltersChange}
        onRefresh={onRefresh}
      />

      {/* Summary Stats */}
      {summaryStats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-900">
                  {summaryStats.totalAnalyses}
                </div>
                <div className="text-sm font-medium text-blue-700">
                  Total Analyses
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-6 border border-emerald-200">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-emerald-500 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-emerald-900">
                  {summaryStats.uniqueDatasets}
                </div>
                <div className="text-sm font-medium text-emerald-700">
                  Unique Datasets
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-900">
                  {summaryStats.analysisTypes}
                </div>
                <div className="text-sm font-medium text-purple-700">
                  Analysis Types
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      <div className="space-y-6">
        {processedResults.length === 0 ? (
          <EmptyResultsState onGoToAnalysis={onGoToAnalysis} />
        ) : (
          <>
            {/* Results header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Your Analysis Results
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  {processedResults.length} result
                  {processedResults.length !== 1 ? 's' : ''} found
                </p>
              </div>
            </div>

            {/* Results list */}
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
