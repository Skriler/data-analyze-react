import React from 'react';
import { Clock, Database, CheckCircle2, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@components/Ui/Card';
import { ActivityItem, type ActivityItemData } from './ActivityItem';

export interface RecentActivityProps {
  activities?: ActivityItemData[];
  isLoading?: boolean;
}

// TODO: Replace with real data from API
// TODO: Create useRecentActivity hook to fetch actual activity data
// TODO: Connect to backend endpoint for user activities/logs
const defaultActivities: ActivityItemData[] = [
  {
    id: 1,
    type: 'dataset_created',
    message: 'New dataset "Sales Q4" created',
    time: '2 hours ago',
    icon: Database,
    iconColor: 'text-blue-600',
    iconBg: 'bg-blue-100',
  },
  {
    id: 2,
    type: 'analysis_completed',
    message: 'Analysis completed for "Customer Data"',
    time: '4 hours ago',
    icon: CheckCircle2,
    iconColor: 'text-green-600',
    iconBg: 'bg-green-100',
  },
  {
    id: 3,
    type: 'analysis_started',
    message: 'Started analysis on "Product Performance"',
    time: '6 hours ago',
    icon: Activity,
    iconColor: 'text-orange-600',
    iconBg: 'bg-orange-100',
  },
];

const LoadingSkeleton: React.FC = () => (
  <div className="space-y-4">
    {Array.from({ length: 3 }).map((_, i) => (
      <div key={i} className="flex items-start gap-3 p-3 rounded-lg">
        <div className="w-8 h-8 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg animate-pulse" />
        <div className="flex-1">
          <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded mb-2 animate-pulse" />
          <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-1/3 animate-pulse" />
        </div>
      </div>
    ))}
  </div>
);

const RecentActivity: React.FC<RecentActivityProps> = ({
  activities = defaultActivities,
  isLoading = false,
}) => {
  const renderContent = () => {
    if (isLoading) {
      return <LoadingSkeleton />;
    }

    return (
      <div className="space-y-4">
        {activities.map(activity => (
          <ActivityItem key={activity.id} activity={activity} />
        ))}
      </div>
    );
  };

  return (
    <Card className="bg-gradient-to-br from-gray-50 to-white border-0 shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-gray-800">
          <Clock className="h-5 w-5 text-blue-600" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>{renderContent()}</CardContent>
    </Card>
  );
};

export { RecentActivity };
