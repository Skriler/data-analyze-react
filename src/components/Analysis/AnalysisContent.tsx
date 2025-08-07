import React from 'react';
import {
  AnalysisHeader,
  DatasetSection,
  AnalysisTypeSection,
} from './Sections';
import { AnalysisModal } from './Modal';
import { ANALYSIS_TYPE_CONFIGS, type AnalysisActions } from '@shared/analysis';
import type { DatasetDto } from '@api-types/dataset';

interface AnalysisContentProps {
  datasets: DatasetDto[] | undefined;
  isLoading: boolean;
  selectedDataset: DatasetDto | null;
  selectedAnalysisType: string;
  showAnalysisModal: boolean;
  setSelectedAnalysisType: (type: string) => void;
  setShowAnalysisModal: (show: boolean) => void;
  actions: AnalysisActions;
}

const AnalysisContent: React.FC<AnalysisContentProps> = ({
  datasets,
  isLoading,
  selectedDataset,
  selectedAnalysisType,
  showAnalysisModal,
  setSelectedAnalysisType,
  setShowAnalysisModal,
  actions,
}) => {
  const currentAnalysisType = ANALYSIS_TYPE_CONFIGS.find(
    config => config.id === selectedAnalysisType
  );

  return (
    <div className="min-h-screen bg-gray-50/50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <AnalysisHeader />

        <AnalysisTypeSection
          selectedAnalysisType={selectedAnalysisType}
          onAnalysisTypeSelect={setSelectedAnalysisType}
        />

        {currentAnalysisType && (
          <DatasetSection
            datasets={datasets}
            isLoading={isLoading}
            analysisTypeName={currentAnalysisType.name}
            actions={actions}
          />
        )}

        {selectedDataset && (
          <AnalysisModal
            open={showAnalysisModal}
            onOpenChange={setShowAnalysisModal}
            dataset={selectedDataset}
            selectedAnalysisType={selectedAnalysisType}
            onAnalysisTypeChange={setSelectedAnalysisType}
          />
        )}
      </div>
    </div>
  );
};

export { AnalysisContent };
