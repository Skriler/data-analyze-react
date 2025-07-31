import { useSetLayout } from '@hooks/features/layout';
import { useDashboard } from '@hooks/features/dashboard';
import { DashboardContent } from '@components/Dashboard';

export default function DashboardPage() {
  const { data, isLoading, actions, welcomeMessage } = useDashboard();

  useSetLayout('Dashboard', welcomeMessage);

  return (
    <DashboardContent data={data} isLoading={isLoading} actions={actions} />
  );
}
