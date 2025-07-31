import { Spinner } from '@components/Ui/Spinner';
import {
  DatasetDetailsHeader,
  DatasetDetailsStats,
  DatasetObjectsTable,
  DatasetParametersTable,
  DatasetChartsSection,
} from './Sections';
import type { DatasetStatsData, DatasetActions } from '@shared/datasetDetails';
import type { DatasetDto } from '@api-types/dataset';

interface DatasetDetailsContentProps {
  dataset: DatasetDto | undefined;
  isLoading: boolean;
  error: unknown;
  createdAt: string;
  stats: DatasetStatsData | null;
  actions: DatasetActions;
}

const DatasetDetailsContent: React.FC<DatasetDetailsContentProps> = ({
  dataset,
  isLoading,
  error,
  createdAt,
  stats,
  actions,
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  if (error || !dataset || !stats) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-600">Failed to load dataset details</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <DatasetDetailsHeader
          dataset={dataset}
          createdAt={createdAt}
          actions={actions}
        />

        <DatasetDetailsStats stats={stats} />

        <DatasetChartsSection dataset={dataset} stats={stats} />

        <div className="space-y-6">
          <DatasetParametersTable parameters={dataset.parameters} />
          <DatasetObjectsTable
            objects={dataset.objects}
            parameters={dataset.parameters}
          />
        </div>
      </div>
    </div>
  );
};

export { DatasetDetailsContent };
