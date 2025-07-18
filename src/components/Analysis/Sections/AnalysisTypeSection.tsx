import React from 'react';
import { AnalysisTypeGrid } from '../TypeGrid';
import { ANALYSIS_TYPE_CONFIGS } from '@shared/analysis';

interface AnalysisTypeSectionProps {
  selectedAnalysisType: string;
  onAnalysisTypeSelect: (type: string) => void;
}

const AnalysisTypeSection: React.FC<AnalysisTypeSectionProps> = ({
  selectedAnalysisType,
  onAnalysisTypeSelect,
}) => {
  return (
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
        onAnalysisTypeSelect={onAnalysisTypeSelect}
      />
    </div>
  );
};

export { AnalysisTypeSection };
