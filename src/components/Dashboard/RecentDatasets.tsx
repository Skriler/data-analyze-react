import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@components/Ui/Card';
import { Database, Folder } from 'lucide-react';
import type { DatasetDto } from '@api-types/dataset';

export interface RecentDatasetsProps {
  datasets?: DatasetDto[];
  isLoading: boolean;
  maxItems?: number;
}

const LoadingSkeleton: React.FC = () => (
  <div className="space-y-4">
    {Array.from({ length: 5 }).map((_, i) => (
      <div key={i} className="flex items-center space-x-4 p-3 rounded-lg">
        <div className="w-12 h-12 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-xl animate-pulse" />
        <div className="flex-1">
          <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded mb-2 animate-pulse" />
          <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-2/3 animate-pulse" />
        </div>
      </div>
    ))}
  </div>
);

const EmptyState: React.FC = () => (
  <div className="text-center py-8">
    <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
      <Folder className="h-8 w-8 text-gray-400" />
    </div>
    <p className="text-gray-500 font-medium">No datasets found</p>
    <p className="text-sm text-gray-400 mt-1">
      Create your first dataset to get started
    </p>
  </div>
);

const DatasetItem: React.FC<{ dataset: DatasetDto }> = ({ dataset }) => (
  <div className="flex items-center space-x-4 p-3 rounded-xl hover:bg-white/60 transition-all duration-200 cursor-pointer group">
    <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
      <Database className="h-6 w-6 text-white" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
        {dataset.Name}
      </p>
      <p className="text-sm text-gray-500 leading-relaxed">
        <span className="font-medium">{dataset.Objects.length}</span> objects •{' '}
        <span className="font-medium">{dataset.Parameters.length}</span>{' '}
        parameters
      </p>
    </div>
    <div className="text-gray-400 group-hover:text-gray-600 transition-colors">
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5l7 7-7 7"
        />
      </svg>
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
      <div className="space-y-2">
        {displayedDatasets.map(dataset => (
          <DatasetItem key={dataset.Id} dataset={dataset} />
        ))}
      </div>
    );
  };

  return (
    <Card className="bg-gradient-to-br from-white to-gray-50 border-0 shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-gray-800">
          <Database className="h-5 w-5 text-blue-600" />
          Recent Datasets
        </CardTitle>
      </CardHeader>
      <CardContent>{renderContent()}</CardContent>
    </Card>
  );
};
