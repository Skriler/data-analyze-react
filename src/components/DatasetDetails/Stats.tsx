import { Card, CardContent } from '@components/Ui/Card';
import { STATS_CONFIG, type DatasetStatsData } from '@shared/datasetDetails';

interface DatasetDetailsStatsProps {
  stats: DatasetStatsData;
}

const DatasetDetailsStats: React.FC<DatasetDetailsStatsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {STATS_CONFIG.map((config, index) => {
        const Icon = config.icon;
        const value = stats[config.key];

        return (
          <Card
            key={index}
            className="bg-white rounded-xl border border-gray-200 shadow-sm"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    {config.title}
                  </p>
                  <p className="text-3xl font-bold text-gray-900">{value}</p>
                </div>
                <div
                  className={`w-12 h-12 rounded-xl ${config.bgColor} flex items-center justify-center`}
                >
                  <Icon className={`h-6 w-6 ${config.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export { DatasetDetailsStats };
