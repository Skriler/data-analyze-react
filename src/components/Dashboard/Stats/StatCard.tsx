import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@components/Ui/Card';

export interface StatItem {
  title: string;
  value: number;
  icon: LucideIcon;
  description: string;
  iconColor: string;
  iconBg: string;
  gradientBg: string;
}

interface StatCardProps {
  stat: StatItem;
  isLoading: boolean;
}

const LoadingSkeleton: React.FC = () => (
  <div
    className="h-8 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-pulse"
    style={{ backgroundSize: '200% 100%' }}
  />
);

const StatCard: React.FC<StatCardProps> = ({ stat, isLoading }) => (
  <Card
    className={`${stat.gradientBg} border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group`}
  >
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
      <CardTitle className="text-sm font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">
        {stat.title}
      </CardTitle>
      <div
        className={`p-2 rounded-xl ${stat.iconBg} shadow-lg group-hover:scale-110 transition-transform duration-200`}
      >
        <stat.icon className={`h-5 w-5 ${stat.iconColor}`} />
      </div>
    </CardHeader>
    <CardContent>
      <div className="text-3xl font-bold text-gray-900 mb-1">
        {isLoading ? <LoadingSkeleton /> : stat.value.toLocaleString()}
      </div>
      <p className="text-sm text-gray-600 leading-relaxed">
        {stat.description}
      </p>
    </CardContent>
  </Card>
);

export { StatCard };
