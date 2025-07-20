import React, { useState } from 'react';
import { Eye } from 'lucide-react';
import { ClusteringStats } from './ClusteringStats';
import { ClusterDistribution } from './ClusterDistribution';
import { ClusteringResultModal } from '@components/Results/ClusteringResultModal';
import type { ClusteringAnalysisResult } from '@api-types/analysis';

interface ClusteringResultDisplayProps {
  result: ClusteringAnalysisResult;
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
