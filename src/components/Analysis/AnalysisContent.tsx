import React from 'react';
import { AnalysisTypeDetails, AnalysisTypeGrid } from './AnalysisTypeGrid';
import { DatasetSection } from './DatasetGrid';
import { AnalysisModal } from './Modal';
import { ANALYSIS_TYPE_CONFIGS } from '@shared/analysis';
import type { DatasetDto } from '@api-types/dataset';

interface AnalysisContentProps {
  datasets: DatasetDto[] | undefined;
  isLoading: boolean;
  selectedDataset: DatasetDto | null;
  selectedAnalysisType: string;
  showAnalysisModal: boolean;
  setSelectedAnalysisType: (type: string) => void;
  setShowAnalysisModal: (show: boolean) => void;
  handleRunAnalysis: (dataset: DatasetDto, analysisType: string) => void;
}

export const AnalysisContent: React.FC<AnalysisContentProps> = ({
  datasets,
  isLoading,
  selectedDataset,
  selectedAnalysisType,
  showAnalysisModal,
  setSelectedAnalysisType,
  setShowAnalysisModal,
  handleRunAnalysis,
}) => {
  const currentAnalysisType = ANALYSIS_TYPE_CONFIGS.find(
    config => config.id === selectedAnalysisType
  );

  const handleDatasetAnalysis = (dataset: DatasetDto) => {
    handleRunAnalysis(dataset, selectedAnalysisType);
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4 mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Analysis Dashboard
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Select the type of analysis you want to run on your dataset and
            discover insights
          </p>
        </div>

        {/* Analysis Type Selection */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              Choose Analysis Type
            </h2>
            <div className="text-sm text-gray-500">
              {ANALYSIS_TYPE_CONFIGS.length} analysis types available
            </div>
          </div>

          <AnalysisTypeGrid
            selectedAnalysisType={selectedAnalysisType}
            onAnalysisTypeSelect={setSelectedAnalysisType}
          />
        </div>

        {/* Selected Analysis Details */}
        {currentAnalysisType && (
          <div className="animate-fade-in">
            <AnalysisTypeDetails
              analysisType={currentAnalysisType}
              hasDatasets={Boolean(datasets && datasets.length > 0)}
            />
          </div>
        )}

        {/* Dataset Selection */}
        {currentAnalysisType && (
          <div className="animate-fade-in">
            <DatasetSection
              datasets={datasets}
              isLoading={isLoading}
              analysisTypeName={currentAnalysisType.name}
              onRunAnalysis={handleDatasetAnalysis}
            />
          </div>
        )}

        {/* Analysis Modal */}
        {selectedDataset && (
          <AnalysisModal
            open={showAnalysisModal}
            onOpenChange={setShowAnalysisModal}
            dataset={selectedDataset}
          />
        )}
      </div>
    </div>
  );
};
