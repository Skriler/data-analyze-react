import React from 'react';
import { ClusteringStats } from './ClusteringStats';
import { ClusterDistribution } from './ClusterDistribution';
import type { ClusteringAnalysisResult } from '@api-types/analysis';

interface ClusteringResultDisplayProps {
  result: ClusteringAnalysisResult;
  showDetails?: boolean;
  expandedByDefault?: boolean;
}

const ClusteringResultDisplay: React.FC<ClusteringResultDisplayProps> = ({
  result,
  showDetails = true,
  expandedByDefault = false,
}) => {
  return (
    <div className="space-y-6">
      <ClusteringStats result={result} />
      {showDetails && (
        <ClusterDistribution
          result={result}
          defaultExpanded={expandedByDefault}
        />
      )}
    </div>
  );
};

export { ClusteringResultDisplay };
