import React from 'react';
import type { DatasetDto } from '@api-types/dataset';
import type { DashboardActions } from '@hooks/features/useDashboard';
import { MainContentSection } from './MainContentSection';
import { ActivitySection } from './ActivitySection';
import { DashboardStats } from '../Stats';

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

const DashboardSections: React.FC<DashboardSectionsProps> = ({
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

export { DashboardSections };
