import { useState } from 'react';
import type { DatasetDto } from '@api-types/dataset';
import { DatasetGridEmpty } from './DatasetGridEmpty';
import { DatasetGridSkeleton } from './DatasetGridSkeleton';
import { DatasetCard } from '../DatasetCard';
import { CreateDatasetModal } from '../CreateDatasetModal';

interface DatasetGridProps {
  datasets: DatasetDto[];
  isLoading?: boolean;
}

function DatasetGrid({ datasets, isLoading }: DatasetGridProps) {
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
    return <DatasetGridSkeleton />;
  }

  if (datasets.length === 0) {
    return (
      <DatasetGridEmpty onCreateDataset={() => setShowCreateModal(true)} />
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

export { DatasetGrid };
