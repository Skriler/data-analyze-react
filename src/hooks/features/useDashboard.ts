import React from 'react';
import { useDatasets } from '@hooks/api/useDatasets';
import { useAuthState } from '@hooks/api/useAuth';

export interface DashboardActions {
  handleCreateDataset: () => void;
  handleRunAnalysis: () => void;
  handleViewResults: () => void;
}

export const useDashboard = (): {
  datasets: any[];
  isLoading: boolean;
  authState: any;
  actions: DashboardActions;
} => {
  const { data: datasets, isLoading } = useDatasets();
  const { data: authState } = useAuthState();

  const actions: DashboardActions = React.useMemo(
    () => ({
      handleCreateDataset: () => {
        // TODO: Implement create dataset navigation/modal
        console.log('Create dataset clicked');
      },
      handleRunAnalysis: () => {
        // TODO: Implement run analysis navigation
        console.log('Run analysis clicked');
      },
      handleViewResults: () => {
        // TODO: Implement view results navigation
        console.log('View results clicked');
      },
    }),
    []
  );

  return {
    datasets: datasets || [],
    isLoading,
    authState,
    actions,
  };
};
