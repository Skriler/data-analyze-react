import React from 'react';
import { Button } from '@components/Ui/Button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/Ui/Select';
import { RefreshCw } from 'lucide-react';
import type { DatasetDto } from '@api-types/dataset';
import type { ResultsFiltersType } from './types';

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
    <div className="flex flex-col sm:flex-row gap-4">
      <Select
        value={filters.selectedDataset}
        onValueChange={handleDatasetChange}
      >
        <SelectTrigger className="w-[200px]">
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

      <Select value={filters.selectedType} onValueChange={handleTypeChange}>
        <SelectTrigger className="w-[200px]">
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

      <Button
        variant="outline"
        size="sm"
        className="flex items-center space-x-2"
        onClick={onRefresh}
      >
        <RefreshCw className="h-4 w-4" />
        <span>Refresh</span>
      </Button>
    </div>
  );
};
