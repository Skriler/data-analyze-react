import React from 'react';
import { RefreshCw } from 'lucide-react';
import { Button } from '@components/Ui/Button';
import { FilterSection } from './FilterSection';
import { DatasetFilter } from './DatasetFilter';
import { TypeFilter } from './TypeFilter';
import type { ResultsFiltersType } from '@shared/results';
import type { DatasetDto } from '@api-types/dataset';

interface ResultsFiltersProps {
  filters: ResultsFiltersType;
  datasets: DatasetDto[] | undefined;
  onFiltersChange: (filters: ResultsFiltersType) => void;
  onRefresh: () => void;
}

const ResultsFilters: React.FC<ResultsFiltersProps> = ({
  filters,
  datasets,
  onFiltersChange,
  onRefresh,
}) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <FilterSection />

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <DatasetFilter
            value={filters.selectedDataset}
            datasets={datasets}
            onChange={value =>
              onFiltersChange({ ...filters, selectedDataset: value })
            }
          />

          <TypeFilter
            value={filters.selectedType}
            onChange={value =>
              onFiltersChange({ ...filters, selectedType: value })
            }
          />
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

export { ResultsFilters };
