import React from 'react';
import type { ActivityItemData } from '@shared/dashboard';

interface ActivityItemProps {
  activity: ActivityItemData;
}

const ActivityItem: React.FC<ActivityItemProps> = ({ activity }) => (
  <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
    <div className={`p-2 rounded-lg ${activity.iconBg} flex-shrink-0`}>
      <activity.icon className={`h-4 w-4 ${activity.iconColor}`} />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-medium text-gray-900 leading-relaxed">
        {activity.message}
      </p>
      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
    </div>
  </div>
);

export { ActivityItem };
