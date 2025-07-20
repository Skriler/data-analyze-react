import React from 'react';
import { FilterSection } from './FilterSection';
import { DatasetFilter } from './DatasetFilter';
import { TypeFilter } from './TypeFilter';
import type { ResultsFiltersType } from '@shared/results';
import type { DatasetDto } from '@api-types/dataset';

interface ResultsFiltersProps {
  filters: ResultsFiltersType;
  datasets: DatasetDto[] | undefined;
  onFiltersChange: (filters: ResultsFiltersType) => void;
}

const ResultsFilters: React.FC<ResultsFiltersProps> = ({
  filters,
  datasets,
  onFiltersChange,
}) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <FilterSection />

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
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
    </div>
  );
};

export { ResultsFilters };
