import React from 'react';
import type { ClusteringStats } from '@shared/results/clusteringResultModal';

interface QuickStatsProps {
  stats: ClusteringStats;
}

const QuickStats: React.FC<QuickStatsProps> = ({ stats }) => {
  const quickStatsItems = [
    {
      label: 'Total Clusters',
      value: stats.totalClusters,
      color: 'text-gray-900',
    },
    {
      label: 'Total Objects',
      value: stats.totalObjects,
      color: 'text-emerald-600',
    },
    {
      label: 'Avg Objects per Cluster',
      value: Math.round(stats.totalObjects / stats.totalClusters),
      color: 'text-blue-600',
    },
  ];

  return (
    <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-emerald-50 border-b border-gray-200">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {quickStatsItems.map(item => (
          <div
            key={item.label}
            className="bg-white rounded-lg p-3 border border-gray-200"
          >
            <div className="text-xs text-gray-500 uppercase tracking-wide">
              {item.label}
            </div>
            <div className={`text-lg font-bold ${item.color}`}>
              {item.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export { QuickStats };
