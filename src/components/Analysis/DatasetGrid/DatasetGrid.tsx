import React from 'react';
import { DatasetCard } from './DatasetCard';
import { DatasetLoadingSkeleton } from './DatasetLoadingSkeleton';
import { EmptyDatasetState } from './EmptyDatasetState';
import type { DatasetDto } from '@api-types/dataset';

interface DatasetGridProps {
  datasets: DatasetDto[] | undefined;
  isLoading: boolean;
  analysisTypeName: string;
  onRunAnalysis: (dataset: DatasetDto) => void;
}

export const DatasetGrid: React.FC<DatasetGridProps> = ({
  datasets,
  isLoading,
  analysisTypeName,
  onRunAnalysis,
}) => {
  if (isLoading) {
    return <DatasetLoadingSkeleton />;
  }

  if (!datasets || datasets.length === 0) {
    return <EmptyDatasetState />;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {datasets.map(dataset => (
        <DatasetCard
          key={dataset.id}
          dataset={dataset}
          analysisTypeName={analysisTypeName}
          onRunAnalysis={onRunAnalysis}
        />
      ))}
    </div>
  );
};
