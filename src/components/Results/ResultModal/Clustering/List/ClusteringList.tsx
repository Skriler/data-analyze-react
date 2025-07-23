import React from 'react';
import { ClusteringCard } from './ClusteringCard';
import { EmptyState } from '../Sections/EmptyState';
import type { ProcessedCluster } from '@shared/results/clusteringResultModal';

interface ClusteringListProps {
  clusters: ProcessedCluster[];
  searchTerm?: string;
}

const ClusteringList: React.FC<ClusteringListProps> = ({
  clusters,
  searchTerm = '',
}) => {
  if (clusters.length === 0) {
    return <EmptyState searchTerm={searchTerm} />;
  }

  return (
    <div className="h-full overflow-auto p-6">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {clusters.map(cluster => (
          <ClusteringCard
            key={cluster.number}
            cluster={cluster}
            searchTerm={searchTerm}
          />
        ))}
      </div>
    </div>
  );
};

export { ClusteringList };
