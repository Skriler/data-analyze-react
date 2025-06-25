import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@components/Ui/Card';
import { Database } from 'lucide-react';
import type { DatasetDto } from '@api-types/dataset';

export interface RecentDatasetsProps {
  datasets?: DatasetDto[];
  isLoading: boolean;
  maxItems?: number;
}

const LoadingSkeleton: React.FC = () => (
  <div className="space-y-3">
    {Array.from({ length: 5 }).map((_, i) => (
      <div key={i} className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gray-200 rounded animate-pulse" />
        <div className="flex-1">
          <div className="h-4 bg-gray-200 rounded mb-2 animate-pulse" />
          <div className="h-3 bg-gray-200 rounded w-2/3 animate-pulse" />
        </div>
      </div>
    ))}
  </div>
);

const EmptyState: React.FC = () => (
  <p className="text-gray-500 text-center py-4">No datasets found</p>
);

const DatasetItem: React.FC<{ dataset: DatasetDto }> = ({ dataset }) => (
  <div className="flex items-center space-x-3">
    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
      <Database className="h-5 w-5 text-primary" />
    </div>
    <div className="flex-1">
      <p className="font-medium text-gray-900">{dataset.Name}</p>
      <p className="text-sm text-gray-500">
        {dataset.Objects.length} objects, {dataset.Parameters.length} parameters
      </p>
    </div>
  </div>
);

export const RecentDatasets: React.FC<RecentDatasetsProps> = ({
  datasets,
  isLoading,
  maxItems = 5,
}) => {
  const displayedDatasets = React.useMemo(() => {
    return datasets?.slice(0, maxItems) || [];
  }, [datasets, maxItems]);

  const renderContent = () => {
    if (isLoading) {
      return <LoadingSkeleton />;
    }

    if (!datasets || datasets.length === 0) {
      return <EmptyState />;
    }

    return (
      <div className="space-y-3">
        {displayedDatasets.map(dataset => (
          <DatasetItem key={dataset.Id} dataset={dataset} />
        ))}
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Datasets</CardTitle>
      </CardHeader>
      <CardContent>{renderContent()}</CardContent>
    </Card>
  );
};
