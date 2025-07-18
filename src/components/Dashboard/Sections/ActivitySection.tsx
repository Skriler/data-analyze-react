import React from 'react';
import { RecentActivity } from '../RecentData';
import type { ActivityItemData } from '@shared/dashboard';

interface ActivitySectionProps {
  activities?: ActivityItemData[];
  isLoading?: boolean;
}

const ActivitySection: React.FC<ActivitySectionProps> = ({
  activities,
  isLoading,
}) => (
  <div className="animate-fade-in">
    <RecentActivity activities={activities} isLoading={isLoading} />
  </div>
);

export { ActivitySection };
