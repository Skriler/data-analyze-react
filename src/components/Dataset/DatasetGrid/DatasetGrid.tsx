import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@components/Ui/Button';
import type { DatasetDto } from '@api-types/dataset';
import { DatasetCard } from '../DatasetCard';
import { CreateDatasetModal } from '../CreateDatasetModal';

interface DatasetGridProps {
  datasets: DatasetDto[];
  isLoading?: boolean;
}

export function DatasetGrid({ datasets, isLoading }: DatasetGridProps) {
  const [selectedDataset, setSelectedDataset] = useState<DatasetDto | null>(
    null
  );
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showAnalysisModal, setShowAnalysisModal] = useState(false);

  const handleView = (dataset: DatasetDto) => {
    setSelectedDataset(dataset);
    console.log('View dataset:', dataset);
  };

  const handleAnalyze = (dataset: DatasetDto) => {
    setSelectedDataset(dataset);
    setShowAnalysisModal(true);
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-pulse"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-32"></div>
                <div className="h-3 bg-gray-200 rounded w-24"></div>
              </div>
            </div>
            <div className="space-y-3 mb-4">
              <div className="h-3 bg-gray-200 rounded"></div>
              <div className="h-3 bg-gray-200 rounded"></div>
              <div className="h-3 bg-gray-200 rounded"></div>
            </div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (datasets.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="mx-auto w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
          <div className="text-4xl">📊</div>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          No datasets found
        </h3>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          Get started by creating your first dataset. Add your data and start
          analyzing patterns.
        </p>
        <Button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Create Dataset</span>
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {datasets.map(dataset => (
          <DatasetCard
            key={dataset.id}
            dataset={dataset}
            onView={handleView}
            onAnalyze={handleAnalyze}
          />
        ))}
      </div>

      <CreateDatasetModal
        open={showCreateModal}
        onOpenChange={setShowCreateModal}
      />
    </>
  );
}
