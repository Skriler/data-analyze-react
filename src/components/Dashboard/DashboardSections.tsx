import React from 'react';
import { DashboardStats } from './DashboardStats';
import { RecentDatasets } from './RecentDatasets';
import { QuickActions } from './QuickActions';
import { RecentActivity } from './RecentActivity';
import type { DatasetDto } from '@api-types/dataset';
import type { DashboardActions } from '@hooks/features/useDashboard';

interface DashboardSectionsProps {
  datasets: DatasetDto[];
  isLoading: boolean;
  actions: DashboardActions;
}

const StatsSection: React.FC<
  Pick<DashboardSectionsProps, 'datasets' | 'isLoading'>
> = ({ datasets, isLoading }) => (
  <div className="animate-fade-in">
    <DashboardStats datasets={datasets} isLoading={isLoading} />
  </div>
);

const MainContentSection: React.FC<DashboardSectionsProps> = ({
  datasets,
  isLoading,
  actions,
}) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <RecentDatasets datasets={datasets} isLoading={isLoading} maxItems={5} />
    <QuickActions
      onCreateDataset={actions.handleCreateDataset}
      onRunAnalysis={actions.handleRunAnalysis}
      onViewResults={actions.handleViewResults}
    />
  </div>
);

const ActivitySection: React.FC = () => (
  <div className="animate-fade-in">
    <RecentActivity />
  </div>
);

export const DashboardSections: React.FC<DashboardSectionsProps> = ({
  datasets,
  isLoading,
  actions,
}) => (
  <div className="space-y-6">
    <StatsSection datasets={datasets} isLoading={isLoading} />
    <MainContentSection
      datasets={datasets}
      isLoading={isLoading}
      actions={actions}
    />
    <ActivitySection />
  </div>
);
