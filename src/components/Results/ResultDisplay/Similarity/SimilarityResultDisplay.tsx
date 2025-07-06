import React from 'react';
import { SimilarityStats } from './SimilarityStats';
import { TopSimilarityPairs } from './TopSimilarityPairs';
import type { SimilarityResult } from '@api-types/analysis';

interface SimilarityResultDisplayProps {
  result: SimilarityResult;
  showDetails?: boolean;
}

const SimilarityResultDisplay: React.FC<SimilarityResultDisplayProps> = ({
  result,
  showDetails = true,
}) => {
  return (
    <div className="space-y-6">
      <SimilarityStats result={result} />
      {showDetails && <TopSimilarityPairs result={result} />}
    </div>
  );
};

export { SimilarityResultDisplay };
