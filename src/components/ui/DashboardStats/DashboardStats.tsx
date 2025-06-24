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
}

interface DashboardStatsProps {
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
      },
      {
        title: 'Data Objects',
        value: 0,
        icon: Users,
        description: 'Total data objects',
      },
      {
        title: 'Parameters',
        value: 0,
        icon: Activity,
        description: 'Total parameters tracked',
      },
      {
        title: 'Avg Objects/Dataset',
        value: 0,
        icon: TrendingUp,
        description: 'Average objects per dataset',
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
    },
    {
      title: 'Data Objects',
      value: totalObjects,
      icon: Users,
      description: 'Total data objects',
    },
    {
      title: 'Parameters',
      value: totalParameters,
      icon: Activity,
      description: 'Total parameters tracked',
    },
    {
      title: 'Avg Objects/Dataset',
      value: avgObjects,
      icon: TrendingUp,
      description: 'Average objects per dataset',
    },
  ];
};

const LoadingSkeleton: React.FC = () => (
  <div className="h-8 bg-gray-200 rounded animate-pulse" />
);

export const DashboardStats: React.FC<DashboardStatsProps> = ({
  datasets,
  isLoading,
}) => {
  const stats = React.useMemo(() => getStatsFromDatasets(datasets), [datasets]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map(stat => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? <LoadingSkeleton /> : stat.value.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
