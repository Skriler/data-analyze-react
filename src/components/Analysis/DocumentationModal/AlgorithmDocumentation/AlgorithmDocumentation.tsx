import React from 'react';
import type { AnalysisTypeConfig } from '@shared/analysis';
import { getAlgorithmDocumentation } from '@libs/utils/analysis/documentation';
import { Overview } from './Overview';
import { Steps } from './Steps';
import { ParametersConfiguration } from './ParametersConfiguration';
import { UseCases } from './UseCases';

interface AlgorithmDocumentationProps {
  analysisType: AnalysisTypeConfig;
}

const AlgorithmDocumentation: React.FC<AlgorithmDocumentationProps> = ({
  analysisType,
}) => {
  const documentation = getAlgorithmDocumentation(analysisType.id);

  return (
    <div className="space-y-6">
      <Overview
        analysisType={analysisType}
        documentation={{
          overview: documentation.overview,
          dataType: documentation.dataType,
          outputType: documentation.outputType,
          complexity: documentation.complexity,
        }}
      />

      <Steps analysisType={analysisType} steps={documentation.steps} />

      <ParametersConfiguration
        commonParameters={documentation.commonParameters}
        algorithmParameters={documentation.algorithmParameters}
      />

      <UseCases
        bestFor={documentation.bestFor}
        limitations={documentation.limitations}
      />
    </div>
  );
};

export { AlgorithmDocumentation };
