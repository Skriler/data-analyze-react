import React from 'react';
import { Users, Package, BarChart3 } from 'lucide-react';
import { StatCard } from '../StatCard';
import { ResultsProcessor, ResultsFormatter } from '@libs/utils/results';
import type { ClusteringResult } from '@api-types/analysis';

interface ClusteringStatsProps {
  result: ClusteringResult;
}

const ClusteringStats: React.FC<ClusteringStatsProps> = ({ result }) => {
  const stats = ResultsProcessor.calculateClusterStats(result);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <StatCard
        icon={Users}
        value={ResultsFormatter.formatNumber(stats.totalClusters)}
        label="Clusters Found"
        bgColor="from-emerald-50 to-emerald-100"
        iconColor="bg-emerald-500"
        textColor="text-emerald-900"
        borderColor="border-emerald-200"
      />
      <StatCard
        icon={Package}
        value={ResultsFormatter.formatNumber(stats.totalObjects)}
        label="Total Objects"
        bgColor="from-blue-50 to-blue-100"
        iconColor="bg-blue-500"
        textColor="text-blue-900"
        borderColor="border-blue-200"
      />
      <StatCard
        icon={BarChart3}
        value={ResultsFormatter.formatNumber(stats.avgClusterSize)}
        label="Avg Cluster Size"
        bgColor="from-purple-50 to-purple-100"
        iconColor="bg-purple-500"
        textColor="text-purple-900"
        borderColor="border-purple-200"
      />
    </div>
  );
};

export { ClusteringStats };
