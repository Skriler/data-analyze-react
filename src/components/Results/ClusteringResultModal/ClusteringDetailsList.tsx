import React from 'react';
import { ClusterDetailsCard } from './ClusterDetailsCard';
import type { ProcessedCluster } from '@shared/results/clusteringResultModal';

interface ClusteringDetailsListProps {
  clusters: ProcessedCluster[];
}

const ClusteringDetailsList: React.FC<ClusteringDetailsListProps> = ({
  clusters,
}) => {
  return (
    <div className="h-full overflow-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {clusters.map(cluster => (
          <ClusterDetailsCard key={cluster.number} cluster={cluster} />
        ))}
      </div>
    </div>
  );
};

export { ClusteringDetailsList };
