import React from 'react';
import { AnalysisTypeCard } from './AnalysisTypeCard';
import { analysisTypes } from './analysisTypes';

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
      {analysisTypes.map(analysisType => (
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
