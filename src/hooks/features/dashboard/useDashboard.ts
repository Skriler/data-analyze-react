import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from '@hooks/api/useAuth';
import { useDatasets } from '@hooks/api/useDatasets';
import type {
  DashboardState,
  DashboardActions,
  DashboardData,
} from '@shared/dashboard/types';
import {
  calculateDashboardStats,
  generateWelcomeMessage,
} from '@libs/utils/dashboard/utils';
import { DEFAULT_ACTIVITIES } from '@shared/dashboard/constants';
import type { DatasetDto } from '@api-types/dataset';

/**
 * Main dashboard hook that manages all dashboard state and actions
 */
export const useDashboard = (): DashboardState & {
  welcomeMessage: string;
  authState: ReturnType<typeof useAuthState>['data'];
} => {
  const navigate = useNavigate();
  const { data: authState } = useAuthState();
  const { data: datasets, isLoading, error } = useDatasets();

  // Calculate dashboard statistics
  const stats = useMemo(() => {
    return calculateDashboardStats(datasets);
  }, [datasets]);

  // Generate welcome message
  const welcomeMessage = useMemo(() => {
    return generateWelcomeMessage(authState?.user?.username);
  }, [authState?.user?.username]);

  // Dashboard actions
  const actions: DashboardActions = useMemo(
    () => ({
      handleCreateDataset: () => {
        navigate('/datasets/create');
      },
      handleRunAnalysis: () => {
        navigate('/analysis');
      },
      handleViewResults: () => {
        navigate('/results');
      },
      handleViewDataset: (datasetId: number) => {
        navigate(`/datasets/${datasetId}`);
      },
    }),
    [navigate]
  );

  // Combined dashboard data
  const data: DashboardData = useMemo(
    () => ({
      datasets: datasets || [],
      stats,
      activities: DEFAULT_ACTIVITIES, // TODO: Replace with API call
    }),
    [datasets, stats]
  );

  return {
    data,
    isLoading,
    error: error?.message || null,
    actions,
    welcomeMessage,
    authState,
  };
};

/**
 * Hook for dashboard actions only
 */
export const useDashboardActions = (): DashboardActions => {
  const navigate = useNavigate();

  return useMemo(
    () => ({
      handleCreateDataset: () => navigate('/datasets/create'),
      handleRunAnalysis: () => navigate('/analysis'),
      handleViewResults: () => navigate('/results'),
      handleViewDataset: (datasetId: number) =>
        navigate(`/datasets/${datasetId}`),
    }),
    [navigate]
  );
};

/**
 * Hook for dashboard stats calculation
 */
export const useDashboardStats = (datasets?: DatasetDto[]) => {
  return useMemo(() => {
    return calculateDashboardStats(datasets);
  }, [datasets]);
};

/**
 * Hook for welcome message generation
 */
export const useWelcomeMessage = () => {
  const { data: authState } = useAuthState();

  return useMemo(() => {
    return generateWelcomeMessage(authState?.user?.username);
  }, [authState?.user?.username]);
};
