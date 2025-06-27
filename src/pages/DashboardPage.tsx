import React from 'react';
import { useSetLayout } from '@components/Layout';
import { useDashboard } from '@hooks/features/useDashboard';
import { DashboardSections } from '@components/Dashboard';

export default function Dashboard() {
  const { datasets, isLoading, authState, actions } = useDashboard();

  const getGreeting = (hour = new Date().getHours()) => {
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const welcomeMessage = React.useMemo(() => {
    const username = authState?.user?.username || 'User';
    const greeting = getGreeting();

    return `${greeting}, ${username}`;
  }, [authState?.user?.username]);

  useSetLayout('Dashboard', welcomeMessage);

  return (
    <DashboardSections
      datasets={datasets}
      isLoading={isLoading}
      actions={actions}
    />
  );
}
