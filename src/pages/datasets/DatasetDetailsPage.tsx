import { useSetLayout } from '@components/Layout';
import { useDatasetDetails } from '@hooks/features/datasetDetails';
import { DatasetDetailsContent } from '@components/DatasetDetails';

export default function DatasetDetailsPage() {
  const {
    dataset,
    isLoading,
    error,
    layoutTitle,
    layoutSubtitle,
    createdAt,
    stats,
    actions,
  } = useDatasetDetails();

  useSetLayout(layoutTitle, layoutSubtitle);

  return (
    <div className="p-6">
      <DatasetDetailsContent
        dataset={dataset}
        isLoading={isLoading}
        error={error}
        createdAt={createdAt}
        stats={stats}
        actions={actions}
      />
    </div>
  );
}
