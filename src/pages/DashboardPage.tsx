import { useSetLayout } from '@components/Layout';
import { useDashboard } from '@hooks/features/dashboard/useDashboard';
import { DashboardSections } from '@components/Dashboard';

export default function Dashboard() {
  const { data, isLoading, actions, welcomeMessage } = useDashboard();

  useSetLayout('Dashboard', welcomeMessage);

  return (
    <DashboardSections data={data} isLoading={isLoading} actions={actions} />
  );
}
