import { Database, Users, Settings } from 'lucide-react';
import { Card, CardContent } from '@components/Ui/Card';
import type { DatasetDto } from '@api-types/dataset';

interface DatasetDetailsStatsProps {
  dataset: DatasetDto;
}

function DatasetDetailsStats({ dataset }: DatasetDetailsStatsProps) {
  const numericParams = dataset.parameters.filter(
    p => p.type === 'Numeric'
  ).length;
  const categoricalParams = dataset.parameters.filter(
    p => p.type === 'Categorical'
  ).length;

  const stats = [
    {
      title: 'Total Objects',
      value: dataset.objects.length,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Parameters',
      value: dataset.parameters.length,
      icon: Settings,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Numeric Parameters',
      value: numericParams,
      icon: Database,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Categorical Parameters',
      value: categoricalParams,
      icon: Database,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card
            key={index}
            className="bg-white border border-gray-200 shadow-sm"
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
                <div
                  className={`w-10 h-10 rounded-lg ${stat.bgColor} flex items-center justify-center`}
                >
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

export { DatasetDetailsStats };
