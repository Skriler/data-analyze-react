import { useParams } from 'react-router-dom';
import { useSetLayout } from '@components/Layout';
import { Spinner } from '@components/Ui/Spinner';
import {
  DatasetDetailsHeader,
  DatasetDetailsStats,
  DatasetParametersTable,
  DatasetObjectsTable,
} from '@components/DatasetDetails';
import { useDataset } from '@hooks/api/useDatasets';

export default function DatasetDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const datasetId = parseInt(id || '0', 10);

  const { data: dataset, isLoading, error } = useDataset(datasetId);

  useSetLayout(
    dataset?.name || 'Dataset Details',
    dataset
      ? `${dataset.objects.length} objects • ${dataset.parameters.length} parameters`
      : ''
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  if (error || !dataset) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-600">Failed to load dataset details</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <DatasetDetailsHeader dataset={dataset} />
      <DatasetDetailsStats dataset={dataset} />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <DatasetParametersTable parameters={dataset.parameters} />
        <DatasetObjectsTable
          objects={dataset.objects}
          parameters={dataset.parameters}
        />
      </div>
    </div>
  );
}
