import { DatasetGrid } from '../DatasetGrid';
import { DatasetActions } from '../DatasetActions';
import { CreateDatasetModal } from '../CreateDatasetModal';
import type { DatasetDto } from '@api-types/dataset';
import { Button } from '@components/Ui/Button';

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
    return (
      <div className="text-center py-16">
        <div className="mx-auto w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-6">
          <div className="text-4xl">⚠️</div>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          Failed to load datasets
        </h3>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          {error instanceof Error
            ? error.message
            : 'An error occurred while loading datasets. Please try again.'}
        </p>
      </div>
    );
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

      {datasets.length > 12 && (
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Showing <span className="font-medium">1</span> to{' '}
            <span className="font-medium">{Math.min(12, datasets.length)}</span>{' '}
            of <span className="font-medium">{datasets.length}</span> datasets
          </p>

          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
            >
              1
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      )}

      <CreateDatasetModal
        open={actions.showCreateModal}
        onOpenChange={actions.setShowCreateModal}
      />
    </div>
  );
}
