import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Users } from 'lucide-react';
import { ClusterItem } from './ClusterItem';
import { ResultsProcessor } from '@libs/utils/results';
import type { ClusteringAnalysisResult } from '@api-types/analysis';

interface ClusterDistributionProps {
  result: ClusteringAnalysisResult;
  defaultExpanded?: boolean;
}

const ClusterDistribution: React.FC<ClusterDistributionProps> = ({
  result,
  defaultExpanded = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const topClusters = ResultsProcessor.getTopClusters(result, 10);

  if (topClusters.length === 0) {
    return null;
  }

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={toggleExpanded}
      >
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
            <Users className="w-4 h-4 text-white" />
          </div>
          <h4 className="font-semibold text-gray-900">Cluster Distribution</h4>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">
            {topClusters.length} clusters
          </span>
          {isExpanded ? (
            <ChevronDown className="w-5 h-5 text-gray-400 transition-transform duration-200" />
          ) : (
            <ChevronRight className="w-5 h-5 text-gray-400 transition-transform duration-200" />
          )}
        </div>
      </div>

      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isExpanded
            ? 'max-h-[2000px] opacity-100 mt-4'
            : 'max-h-0 opacity-0 mt-0'
        }`}
      >
        <div className="space-y-4">
          {topClusters.map((cluster, index) => (
            <ClusterItem key={index} cluster={cluster} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export { ClusterDistribution };
