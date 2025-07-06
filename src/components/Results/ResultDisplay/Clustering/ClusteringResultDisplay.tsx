import React from 'react';
import { ClusteringStats } from './ClusteringStats';
import { ClusterDistribution } from './ClusterDistribution';
import type { ClusteringResult } from '@api-types/analysis';

interface ClusteringResultDisplayProps {
  result: ClusteringResult;
  showDetails?: boolean;
}

const ClusteringResultDisplay: React.FC<ClusteringResultDisplayProps> = ({
  result,
  showDetails = true,
}) => {
  return (
    <div className="space-y-6">
      <ClusteringStats result={result} />
      {showDetails && <ClusterDistribution result={result} />}
    </div>
  );
};

export { ClusteringResultDisplay };
