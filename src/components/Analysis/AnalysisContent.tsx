import React from 'react';
import { AnalysisTypeGrid } from './AnalysisTypeGrid';
import { AnalysisTypeDetails } from './AnalysisTypeDetails';
import { DatasetSection } from './DatasetSection';
import { AnalysisModal } from '../Modal';
import { ANALYSIS_TYPES } from '@shared/constants/analysisTypes';
import type { DatasetDto } from '@api-types/dataset';

interface AnalysisContentProps {
  datasets: DatasetDto[] | undefined;
  isLoading: boolean;
  selectedDataset: DatasetDto | null;
  selectedAnalysisType: string;
  showAnalysisModal: boolean;
  setSelectedAnalysisType: (type: string) => void;
  setShowAnalysisModal: (show: boolean) => void;
  handleAnalyzeDataset: (dataset: DatasetDto, analysisType: string) => void;
}

export const AnalysisContent: React.FC<AnalysisContentProps> = ({
  datasets,
  isLoading,
  selectedDataset,
  selectedAnalysisType,
  showAnalysisModal,
  setSelectedAnalysisType,
  setShowAnalysisModal,
  handleAnalyzeDataset,
}) => {
  const currentAnalysisType = ANALYSIS_TYPES.find(
    t => t.id === selectedAnalysisType
  );

  const handleDatasetAnalysis = (dataset: DatasetDto) => {
    handleAnalyzeDataset(dataset, selectedAnalysisType);
  };

  return (
    <div className="space-y-6">
      <AnalysisTypeGrid
        selectedAnalysisType={selectedAnalysisType}
        onAnalysisTypeSelect={setSelectedAnalysisType}
      />

      {currentAnalysisType && (
        <AnalysisTypeDetails
          analysisType={currentAnalysisType}
          hasDatasets={Boolean(datasets && datasets.length > 0)}
        />
      )}

      <DatasetSection
        datasets={datasets}
        isLoading={isLoading}
        analysisTypeName={currentAnalysisType?.name || ''}
        onAnalyzeDataset={handleDatasetAnalysis}
      />

      {selectedDataset && (
        <AnalysisModal
          open={showAnalysisModal}
          onOpenChange={setShowAnalysisModal}
          dataset={selectedDataset}
        />
      )}
    </div>
  );
};
