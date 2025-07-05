import React from 'react';
import { AnalysisTypeCard } from './AnalysisTypeCard';
import { ANALYSIS_TYPE_CONFIGS } from '@shared/analysis';

interface AnalysisTypeGridProps {
  selectedAnalysisType: string;
  onAnalysisTypeSelect: (id: string) => void;
}

export const AnalysisTypeGrid: React.FC<AnalysisTypeGridProps> = ({
  selectedAnalysisType,
  onAnalysisTypeSelect,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {ANALYSIS_TYPE_CONFIGS.map(analysisType => (
        <AnalysisTypeCard
          key={analysisType.id}
          analysisType={analysisType}
          isSelected={selectedAnalysisType === analysisType.id}
          onSelect={onAnalysisTypeSelect}
        />
      ))}
    </div>
  );
};
