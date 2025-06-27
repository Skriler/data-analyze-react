import React from 'react';
import type { DatasetDto } from '@api-types/dataset';
import type { DashboardActions } from '@hooks/features/useDashboard';
import { RecentDatasets } from '../RecentData';
import { QuickActions } from '../QuickActions';

interface MainContentSectionProps {
  datasets: DatasetDto[];
  isLoading: boolean;
  actions: DashboardActions;
}

const MainContentSection: React.FC<MainContentSectionProps> = ({
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

export { MainContentSection };
