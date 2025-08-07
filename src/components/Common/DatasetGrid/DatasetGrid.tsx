import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { DatasetCard } from './DatasetCard';
import { DatasetLoadingSkeleton } from './DatasetLoadingSkeleton';
import { EmptyDatasetState } from './EmptyDatasetState';
import type { DatasetDto } from '@api-types/dataset';

interface DatasetGridAction {
  text: string;
  icon: LucideIcon;
  onClick: (dataset: DatasetDto, analysisType: string) => void;
  className?: string;
}

interface DatasetGridProps {
  datasets: DatasetDto[] | undefined;
  isLoading: boolean;
  action: DatasetGridAction;
  onCreateDataset?: () => void;
  showCreatedDate?: boolean;
  showDescription?: boolean;
}

const DatasetGrid: React.FC<DatasetGridProps> = ({
  datasets,
  isLoading,
  action,
  onCreateDataset,
  showCreatedDate = false,
  showDescription = true,
}) => {
  if (isLoading) {
    return <DatasetLoadingSkeleton />;
  }

  if (!datasets || datasets.length === 0) {
    return <EmptyDatasetState onCreateDataset={onCreateDataset} />;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {datasets.map(dataset => (
        <DatasetCard
          key={dataset.id}
          dataset={dataset}
          action={action}
          showCreatedDate={showCreatedDate}
          showDescription={showDescription}
        />
      ))}
    </div>
  );
};

export { DatasetGrid };
