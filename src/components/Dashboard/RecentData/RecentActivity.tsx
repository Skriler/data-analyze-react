import React from 'react';
import { Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@components/Ui/Card';
import { ActivityItem } from './ActivityItem';
import { DEFAULT_ACTIVITIES, type ActivityItemData } from '@shared/dashboard';

export interface RecentActivityProps {
  activities?: ActivityItemData[];
  isLoading?: boolean;
}

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
  activities = DEFAULT_ACTIVITIES,
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
