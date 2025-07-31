import { ParameterAveragesChart, ParameterTypesChart } from '../Charts';
import type { DatasetDto } from '@api-types/dataset';
import type { DatasetStatsData } from '@shared/datasetDetails';

interface DatasetChartsSectionProps {
  dataset: DatasetDto;
  stats: DatasetStatsData;
}

const DatasetChartsSection: React.FC<DatasetChartsSectionProps> = ({
  dataset,
  stats,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <ParameterAveragesChart dataset={dataset} />
      <ParameterTypesChart stats={stats} />
    </div>
  );
};

export { DatasetChartsSection };
