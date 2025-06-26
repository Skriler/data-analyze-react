import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@components/Ui/Card';
import {
  Database,
  Users,
  Activity,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react';
import type { DatasetDto } from '@api-types/dataset';

interface StatItem {
  title: string;
  value: number;
  icon: LucideIcon;
  description: string;
  iconColor: string;
  iconBg: string;
  gradientBg: string;
}

export interface DashboardStatsProps {
  datasets?: DatasetDto[];
  isLoading: boolean;
}

const getStatsFromDatasets = (datasets?: DatasetDto[]): StatItem[] => {
  if (!datasets) {
    return [
      {
        title: 'Total Datasets',
        value: 0,
        icon: Database,
        description: 'Active datasets in system',
        iconColor: 'text-white',
        iconBg: 'bg-blue-500',
        gradientBg: 'bg-gradient-to-br from-blue-50 to-blue-100',
      },
      {
        title: 'Data Objects',
        value: 0,
        icon: Users,
        description: 'Total data objects',
        iconColor: 'text-white',
        iconBg: 'bg-green-500',
        gradientBg: 'bg-gradient-to-br from-green-50 to-green-100',
      },
      {
        title: 'Parameters',
        value: 0,
        icon: Activity,
        description: 'Total parameters tracked',
        iconColor: 'text-white',
        iconBg: 'bg-purple-500',
        gradientBg: 'bg-gradient-to-br from-purple-50 to-purple-100',
      },
      {
        title: 'Avg Objects/Dataset',
        value: 0,
        icon: TrendingUp,
        description: 'Average objects per dataset',
        iconColor: 'text-white',
        iconBg: 'bg-orange-500',
        gradientBg: 'bg-gradient-to-br from-orange-50 to-orange-100',
      },
    ];
  }

  const totalObjects = datasets.reduce((acc, ds) => acc + ds.Objects.length, 0);
  const totalParameters = datasets.reduce(
    (acc, ds) => acc + ds.Parameters.length,
    0
  );
  const avgObjects =
    datasets.length > 0 ? Math.round(totalObjects / datasets.length) : 0;

  return [
    {
      title: 'Total Datasets',
      value: datasets.length,
      icon: Database,
      description: 'Active datasets in system',
      iconColor: 'text-white',
      iconBg: 'bg-blue-500',
      gradientBg: 'bg-gradient-to-br from-blue-50 to-blue-100',
    },
    {
      title: 'Data Objects',
      value: totalObjects,
      icon: Users,
      description: 'Total data objects',
      iconColor: 'text-white',
      iconBg: 'bg-green-500',
      gradientBg: 'bg-gradient-to-br from-green-50 to-green-100',
    },
    {
      title: 'Parameters',
      value: totalParameters,
      icon: Activity,
      description: 'Total parameters tracked',
      iconColor: 'text-white',
      iconBg: 'bg-purple-500',
      gradientBg: 'bg-gradient-to-br from-purple-50 to-purple-100',
    },
    {
      title: 'Avg Objects/Dataset',
      value: avgObjects,
      icon: TrendingUp,
      description: 'Average objects per dataset',
      iconColor: 'text-white',
      iconBg: 'bg-orange-500',
      gradientBg: 'bg-gradient-to-br from-orange-50 to-orange-100',
    },
  ];
};

const LoadingSkeleton: React.FC = () => (
  <div
    className="h-8 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-pulse"
    style={{ backgroundSize: '200% 100%' }}
  />
);

const StatCard: React.FC<{ stat: StatItem; isLoading: boolean }> = ({
  stat,
  isLoading,
}) => (
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

export const DashboardStats: React.FC<DashboardStatsProps> = ({
  datasets,
  isLoading,
}) => {
  const stats = React.useMemo(() => getStatsFromDatasets(datasets), [datasets]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map(stat => (
        <StatCard key={stat.title} stat={stat} isLoading={isLoading} />
      ))}
    </div>
  );
};
