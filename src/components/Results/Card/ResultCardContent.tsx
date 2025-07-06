import React from 'react';
import {
  SimilarityResultDisplay,
  ClusteringResultDisplay,
} from '../ResultDisplay';
import type { AnalysisResultItem } from '@shared/results';
import type { SimilarityResult, ClusteringResult } from '@api-types/analysis';

interface ResultCardContentProps {
  resultItem: AnalysisResultItem;
}

const ResultCardContent: React.FC<ResultCardContentProps> = ({
  resultItem,
}) => {
  if (resultItem.type === 'similarity') {
    return (
      <SimilarityResultDisplay
        result={resultItem.result as SimilarityResult}
        showDetails={true}
      />
    );
  }

  return (
    <ClusteringResultDisplay
      result={resultItem.result as ClusteringResult}
      showDetails={true}
    />
  );
};

export { ResultCardContent };
