import { useNavigate } from 'react-router-dom';
import { Eye } from 'lucide-react';
import { DatasetsContentError } from './Sections';
import { DatasetActions } from './DatasetActions';
import { CreateDatasetModal } from './CreateDatasetModal';
import { DatasetGrid } from '@components/Common/DatasetGrid';
import { PaginationFooter } from '@components/Ui/Pagination';
import type { DatasetDto } from '@api-types/dataset';
import { usePaginatedDatasets } from '@hooks/features/datasets';

interface DatasetsContentProps {
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

const DatasetsContent: React.FC<DatasetsContentProps> = ({
  datasets,
  isLoading,
  error,
  actions,
}) => {
  const navigate = useNavigate();
  const { paginatedDatasets, pagination, goToPage, nextPage, prevPage } =
    usePaginatedDatasets(datasets);

  const handleImportDataset = () => {
    // TODO: Implement import functionality
    console.log('Import dataset clicked');
  };

  const handleViewDataset = (dataset: DatasetDto) => {
    navigate(`/datasets/${dataset.id}`);
  };

  if (error) {
    return <DatasetsContentError />;
  }

  return (
    <div className="p-6 space-y-6">
      <DatasetActions
        searchQuery={actions.searchQuery}
        setSearchQuery={actions.setSearchQuery}
        sortBy={actions.sortBy}
        setSortBy={actions.setSortBy}
        onCreateDataset={() => actions.setShowCreateModal(true)}
        onImportDataset={handleImportDataset}
      />

      <DatasetGrid
        datasets={paginatedDatasets}
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

      {pagination.totalPages > 1 && (
        <div className="mt-8 pt-6 border-t border-gray-100">
          <PaginationFooter
            pagination={pagination}
            goToPage={goToPage}
            nextPage={nextPage}
            prevPage={prevPage}
            variant="clean"
          />
        </div>
      )}

      <CreateDatasetModal
        open={actions.showCreateModal}
        onOpenChange={actions.setShowCreateModal}
      />
    </div>
  );
};

export { DatasetsContent };
