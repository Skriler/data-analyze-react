import React from 'react';
import { Layout } from '@components/Layout';
import { useDatasets } from '@hooks/api/useDatasets';
import { useAuthState } from '@hooks/api/useAuth';

// Dashboard components
import { DashboardStats } from '@components/Ui/DashboardStats';
import { RecentDatasets } from '@components/Ui/RecentDatasets';
import { QuickActions } from '@components/Ui/QuickActions';

export default function Dashboard() {
  const { data: datasets, isLoading } = useDatasets();
  const { data: authState } = useAuthState();

  const handleCreateDataset = React.useCallback(() => {
    // TODO: Implement create dataset navigation/modal
    console.log('Create dataset clicked');
  }, []);

  const handleRunAnalysis = React.useCallback(() => {
    // TODO: Implement run analysis navigation
    console.log('Run analysis clicked');
  }, []);

  const handleViewResults = React.useCallback(() => {
    // TODO: Implement view results navigation
    console.log('View results clicked');
  }, []);

  const welcomeMessage = React.useMemo(() => {
    const username = authState?.user?.username || 'User';
    return `Welcome back, ${username}`;
  }, [authState?.user?.username]);

  return (
    <Layout title="Dashboard" subtitle={welcomeMessage}>
      <div className="space-y-6">
        {/* Stats Grid */}
        <DashboardStats datasets={datasets} isLoading={isLoading} />

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentDatasets
            datasets={datasets}
            isLoading={isLoading}
            maxItems={5}
          />

          <QuickActions
            onCreateDataset={handleCreateDataset}
            onRunAnalysis={handleRunAnalysis}
            onViewResults={handleViewResults}
          />
        </div>
      </div>
    </Layout>
  );
}
