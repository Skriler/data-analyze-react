import React from 'react';
import { AnalysisHeader } from './AnalysisHeader';
import { AnalysisTypeSection } from './AnalysisTypeSection';
import { AnalysisTypeDetails } from '../TypeGrid';
import { AnalysisModal } from '../Modal';
import { DatasetSection } from './DatasetSection';
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
  handleViewDocumentation: () => void;
}

const AnalysisContent: React.FC<AnalysisContentProps> = ({
  datasets,
  isLoading,
  selectedDataset,
  selectedAnalysisType,
  showAnalysisModal,
  setSelectedAnalysisType,
  setShowAnalysisModal,
  handleRunAnalysis,
  handleViewDocumentation,
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
        <AnalysisHeader />

        <AnalysisTypeSection
          selectedAnalysisType={selectedAnalysisType}
          onAnalysisTypeSelect={setSelectedAnalysisType}
        />

        {currentAnalysisType && (
          <div className="animate-fade-in">
            <AnalysisTypeDetails analysisType={currentAnalysisType} />
          </div>
        )}

        {currentAnalysisType && (
          <div className="animate-fade-in">
            <DatasetSection
              datasets={datasets}
              isLoading={isLoading}
              analysisTypeName={currentAnalysisType.name}
              onRunAnalysis={handleDatasetAnalysis}
              onViewDocumentation={handleViewDocumentation}
            />
          </div>
        )}

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

export { AnalysisContent };
