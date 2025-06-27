import { useSetLayout } from '@components/Layout';
import { useDatasetsPage } from '@hooks/features/useDatasetsPage';
import { DatasetsList } from '@components/Dataset';

export default function DatasetsPage() {
  const { filteredDatasets, isLoading, error, layoutSubtitle, actions } =
    useDatasetsPage();

  useSetLayout('Datasets', layoutSubtitle);

  return (
    <div className="p-6">
      <DatasetsList
        datasets={filteredDatasets}
        isLoading={isLoading}
        error={error}
        actions={actions}
      />
    </div>
  );
}
