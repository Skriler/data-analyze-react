import React from 'react';
import { MainContentSection } from './MainContentSection';
import { DashboardStats } from '../Stats';
import type { DashboardActions, DashboardData } from '@shared/dashboard';

interface DashboardSectionsProps {
  data: DashboardData;
  isLoading: boolean;
  actions: DashboardActions;
}

const StatsSection: React.FC<{
  datasets: DashboardData['datasets'];
  isLoading: boolean;
}> = ({ datasets, isLoading }) => (
  <div className="animate-fade-in">
    <DashboardStats datasets={datasets} isLoading={isLoading} />
  </div>
);

const DashboardContent: React.FC<DashboardSectionsProps> = ({
  data,
  isLoading,
  actions,
}) => (
  <div className="space-y-6">
    <StatsSection datasets={data.datasets} isLoading={isLoading} />
    <MainContentSection
      datasets={data.datasets}
      isLoading={isLoading}
      actions={actions}
    />
    {/* TODO: get recent activity
    <ActivitySection activities={data.activities} /> */}
  </div>
);

export { DashboardContent };
