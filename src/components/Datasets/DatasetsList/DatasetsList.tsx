import { useNavigate } from 'react-router-dom';
import type { DatasetDto } from '@api-types/dataset';
import { DatasetsListError } from './DatasetsListError';
import { DatasetsListPagination } from './DatasetsListPagination';
import { DatasetGrid } from '@components/Common/DatasetGrid';
import { DatasetActions } from '../DatasetActions';
import { CreateDatasetModal } from '../CreateDatasetModal';
import { Eye } from 'lucide-react';

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
  const navigate = useNavigate();

  const handleImportDataset = () => {
    // TODO: Implement import functionality
    console.log('Import dataset clicked');
  };

  const handleViewDataset = (dataset: DatasetDto) => {
    navigate(`/datasets/${dataset.id}`);
  };

  if (error) {
    return <DatasetsListError />;
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

      <DatasetGrid
        datasets={datasets}
        isLoading={isLoading}
        action={{
          text: 'View Dataset',
          icon: Eye,
          onClick: handleViewDataset,
          className:
            'w-full text-sm bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg shadow-sm transition-all duration-200 flex items-center justify-center space-x-2',
        }}
        showCreatedDate={true}
        showDescription={false}
      />

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
