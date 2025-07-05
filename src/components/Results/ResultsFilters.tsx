import React from 'react';
import { RefreshCw, Filter, Database, Zap } from 'lucide-react';
import { Button } from '@components/Ui/Button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/Ui/Select';
import type { DatasetDto } from '@api-types/dataset';
import type { ResultsFiltersType } from '@shared/results';

interface ResultsFiltersProps {
  filters: ResultsFiltersType;
  datasets: DatasetDto[] | undefined;
  onFiltersChange: (filters: ResultsFiltersType) => void;
  onRefresh: () => void;
}

export const ResultsFilters: React.FC<ResultsFiltersProps> = ({
  filters,
  datasets,
  onFiltersChange,
  onRefresh,
}) => {
  const handleDatasetChange = (value: string) => {
    onFiltersChange({ ...filters, selectedDataset: value });
  };

  const handleTypeChange = (value: string) => {
    onFiltersChange({ ...filters, selectedType: value });
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
          <Filter className="w-5 h-5 text-gray-600" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">Filter Results</h3>
          <p className="text-sm text-gray-500">
            Narrow down your analysis results
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
              <Database className="w-4 h-4" />
              <span>Dataset</span>
            </label>
            <Select
              value={filters.selectedDataset}
              onValueChange={handleDatasetChange}
            >
              <SelectTrigger className="w-[200px] bg-white border-gray-300 hover:border-gray-400 focus:border-blue-500 focus:ring-blue-500">
                <SelectValue placeholder="Select dataset" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Datasets</SelectItem>
                {datasets?.map(dataset => (
                  <SelectItem key={dataset.id} value={dataset.id.toString()}>
                    {dataset.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
              <Zap className="w-4 h-4" />
              <span>Analysis Type</span>
            </label>
            <Select
              value={filters.selectedType}
              onValueChange={handleTypeChange}
            >
              <SelectTrigger className="w-[200px] bg-white border-gray-300 hover:border-gray-400 focus:border-blue-500 focus:ring-blue-500">
                <SelectValue placeholder="Analysis type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="similarity">Similarity Analysis</SelectItem>
                <SelectItem value="KMeans">K-Means Clustering</SelectItem>
                <SelectItem value="DBSCAN">DBSCAN Clustering</SelectItem>
                <SelectItem value="Agglomerative">
                  Agglomerative Clustering
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          className="flex items-center space-x-2 bg-white border-gray-300 hover:bg-gray-50 hover:border-gray-400 text-gray-700 font-medium"
          onClick={onRefresh}
        >
          <RefreshCw className="h-4 w-4" />
          <span>Refresh</span>
        </Button>
      </div>
    </div>
  );
};
