import React from 'react';
import { Users } from 'lucide-react';
import { ClusterItem } from './ClusterItem';
import { ResultsProcessor } from '@libs/utils/results';
import type { ClusteringResult } from '@api-types/analysis';

interface ClusterDistributionProps {
  result: ClusteringResult;
}

const ClusterDistribution: React.FC<ClusterDistributionProps> = ({
  result,
}) => {
  const topClusters = ResultsProcessor.getTopClusters(result, 10);

  if (topClusters.length === 0) {
    return null;
  }

  return (
    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
          <Users className="w-4 h-4 text-white" />
        </div>
        <h4 className="font-semibold text-gray-900">Cluster Distribution</h4>
      </div>
      <div className="space-y-4">
        {topClusters.map((cluster, index) => (
          <ClusterItem key={index} cluster={cluster} index={index} />
        ))}
      </div>
    </div>
  );
};

export { ClusterDistribution };
