import React from 'react';
import { AnalysisTypeCard } from './AnalysisTypeCard';
import { AnalysisTypeDetails } from './AnalysisTypeDetails';
import { ANALYSIS_TYPE_CONFIGS } from '@shared/analysis';
import type { AnalysisCardVariant } from '@shared/common/analysisTypeGrid';
import { getGridClasses } from '@libs/utils/common/analysisTypeGrid/utils';

export interface AnalysisTypeGridProps {
  selectedAnalysisType: string;
  onAnalysisTypeSelect: (id: string) => void;
  showDetails?: boolean;
  variant?: AnalysisCardVariant;
  className?: string;
}

const AnalysisTypeGrid: React.FC<AnalysisTypeGridProps> = ({
  selectedAnalysisType,
  onAnalysisTypeSelect,
  showDetails = false,
  variant = 'default',
  className = '',
}) => {
  const currentAnalysisType = ANALYSIS_TYPE_CONFIGS.find(
    config => config.id === selectedAnalysisType
  );

  const gridClasses = getGridClasses(variant);

  return (
    <div className={`space-y-8 ${className}`}>
      <div className={gridClasses}>
        {ANALYSIS_TYPE_CONFIGS.map(analysisType => (
          <AnalysisTypeCard
            key={analysisType.id}
            analysisType={analysisType}
            isSelected={selectedAnalysisType === analysisType.id}
            onSelect={onAnalysisTypeSelect}
            variant={variant}
          />
        ))}
      </div>

      {showDetails && currentAnalysisType && (
        <div className="animate-fade-in">
          <AnalysisTypeDetails analysisType={currentAnalysisType} />
        </div>
      )}
    </div>
  );
};

export { AnalysisTypeGrid };
