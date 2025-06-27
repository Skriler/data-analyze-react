import React from 'react';
import type { DatasetDto } from '@api-types/dataset';
import { StatCard } from './StatCard';
import { getStatsFromDatasets } from './StatsCalculator';

export interface DashboardStatsProps {
  datasets?: DatasetDto[];
  isLoading: boolean;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({
  datasets,
  isLoading,
}) => {
  const stats = React.useMemo(() => getStatsFromDatasets(datasets), [datasets]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map(stat => (
        <StatCard key={stat.title} stat={stat} isLoading={isLoading} />
      ))}
    </div>
  );
};

export { DashboardStats };
