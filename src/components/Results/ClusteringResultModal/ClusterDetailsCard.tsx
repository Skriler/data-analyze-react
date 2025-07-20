import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Users } from 'lucide-react';
import { Badge } from '@components/Ui/Badge';
import { ClusterObjectDetailsGrid } from './ClusterObjectDetailsGrid';
import {
  CLUSTER_COLORS,
  type ProcessedCluster,
} from '@shared/results/clusteringResultModal';
import { ResultsFormatter } from '@libs/utils/results';

interface ClusterDetailsCardProps {
  cluster: ProcessedCluster;
}

const ClusterDetailsCard: React.FC<ClusterDetailsCardProps> = ({ cluster }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const clusterColor =
    CLUSTER_COLORS[(cluster.number - 1) % CLUSTER_COLORS.length];

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
      {/* Header */}
      <div
        className="p-4 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-sm"
              style={{ backgroundColor: clusterColor }}
            >
              {cluster.number}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">
                Cluster {cluster.number}
              </h3>
              <p className="text-sm text-gray-500">
                {ResultsFormatter.formatNumber(cluster.objects.length)} objects
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Badge
              variant="secondary"
              className="bg-gray-100 text-gray-700 font-medium"
            >
              {ResultsFormatter.formatNumber(cluster.objects.length)}
            </Badge>
            {isExpanded ? (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronRight className="w-5 h-5 text-gray-400" />
            )}
          </div>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="border-t border-gray-200">
          <div className="p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Users className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">
                Objects in this cluster
              </span>
            </div>
            <ClusterObjectDetailsGrid objects={cluster.objects} />
          </div>
        </div>
      )}
    </div>
  );
};

export { ClusterDetailsCard };
