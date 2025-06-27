import { Database, Users, Activity, TrendingUp } from 'lucide-react';
import type { DatasetDto } from '@api-types/dataset';
import type { StatItem } from './StatCard';

export const getStatsFromDatasets = (datasets?: DatasetDto[]): StatItem[] => {
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

  const totalObjects = datasets.reduce((acc, ds) => acc + ds.objects.length, 0);
  const totalParameters = datasets.reduce(
    (acc, ds) => acc + ds.parameters.length,
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
