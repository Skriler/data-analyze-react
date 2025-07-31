import { useSetLayout } from '@hooks/features/layout';
import { useDatasetsPage } from '@hooks/features/datasets';
import { DatasetsContent } from '@components/Datasets';

export default function DatasetsPage() {
  const { filteredDatasets, isLoading, error, layoutSubtitle, actions } =
    useDatasetsPage();

  useSetLayout('Datasets', layoutSubtitle);

  return (
    <DatasetsContent
      datasets={filteredDatasets}
      isLoading={isLoading}
      error={error}
      actions={actions}
    />
  );
}
