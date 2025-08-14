import React from 'react';
import { AnalysisTypeGrid } from '@components/Common/AnalysisTypeGrid';
import { AlgorithmDocumentation } from '../AlgorithmDocumentation';
import { ANALYSIS_TYPE_CONFIGS } from '@shared/analysis';

interface DocumentationModalContentProps {
  selectedAnalysisType: string;
  onAnalysisTypeChange: (type: string) => void;
}

const DocumentationModalContent: React.FC<DocumentationModalContentProps> = ({
  selectedAnalysisType,
  onAnalysisTypeChange,
}) => {
  const currentAnalysisType = ANALYSIS_TYPE_CONFIGS.find(
    config => config.id === selectedAnalysisType
  );

  return (
    <div className="flex-1 overflow-y-auto px-8 py-6">
      <div className="space-y-8">
        {/* Analysis Type Selection */}
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
            <h3 className="text-lg font-semibold text-slate-900">
              Choose Algorithm
            </h3>
          </div>
          <AnalysisTypeGrid
            selectedAnalysisType={selectedAnalysisType}
            onAnalysisTypeSelect={onAnalysisTypeChange}
            showDetails={false}
            variant="modal"
          />
        </div>

        {/* Algorithm Documentation */}
        {currentAnalysisType && (
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <h3 className="text-lg font-semibold text-slate-900">
                Documentation
              </h3>
            </div>
            <AlgorithmDocumentation analysisType={currentAnalysisType} />
          </div>
        )}
      </div>
    </div>
  );
};

export { DocumentationModalContent };
