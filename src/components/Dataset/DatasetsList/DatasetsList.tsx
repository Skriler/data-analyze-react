import type { DatasetDto } from '@api-types/dataset';
import { DatasetsListError } from './DatasetsListError';
import { DatasetsListPagination } from './DatasetsListPagination';
import { DatasetGrid } from '../DatasetGrid';
import { DatasetActions } from '../DatasetActions';
import { CreateDatasetModal } from '../CreateDatasetModal';

interface DatasetsListProps {
  datasets: DatasetDto[];
  isLoading: boolean;
  error: unknown;
  actions: {
    searchQuery: string;
    setSearchQuery: (q: string) => void;
    sortBy: string;
    setSortBy: (sort: string) => void;
    showCreateModal: boolean;
    setShowCreateModal: (v: boolean) => void;
  };
}

export function DatasetsList({
  datasets,
  isLoading,
  error,
  actions,
}: DatasetsListProps) {
  const handleImportDataset = () => {
    // TODO: Implement import functionality
    console.log('Import dataset clicked');
  };

  if (error) {
    return <DatasetsListError error={error} />;
  }

  return (
    <div className="space-y-6">
      <DatasetActions
        searchQuery={actions.searchQuery}
        setSearchQuery={actions.setSearchQuery}
        sortBy={actions.sortBy}
        setSortBy={actions.setSortBy}
        onCreateDataset={() => actions.setShowCreateModal(true)}
        onImportDataset={handleImportDataset}
      />

      <DatasetGrid datasets={datasets} isLoading={isLoading} />

      <DatasetsListPagination
        totalDatasets={datasets.length}
        currentPage={1}
        itemsPerPage={12}
      />

      <CreateDatasetModal
        open={actions.showCreateModal}
        onOpenChange={actions.setShowCreateModal}
      />
    </div>
  );
}
