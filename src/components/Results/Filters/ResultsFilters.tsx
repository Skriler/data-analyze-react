import React from 'react';
import { FilterSection } from './FilterSection';
import { DatasetFilter } from './DatasetFilter';
import { TypeFilter } from './TypeFilter';
import type { ResultsFiltersType } from '@shared/results';
import type { DatasetDto } from '@api-types/dataset';

interface ResultsFiltersProps {
  filters: ResultsFiltersType;
  datasets: DatasetDto[];
  onFiltersChange: (filters: ResultsFiltersType) => void;
}

const ResultsFilters: React.FC<ResultsFiltersProps> = ({
  filters,
  datasets,
  onFiltersChange,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm hover:shadow-md transition-all duration-300">
      <FilterSection />

      <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-end">
        <DatasetFilter
          value={filters?.selectedDataset || 'all'}
          datasets={datasets}
          onChange={value =>
            onFiltersChange?.({ ...filters, selectedDataset: value })
          }
        />

        <TypeFilter
          value={filters?.selectedType || 'all'}
          onChange={value =>
            onFiltersChange?.({ ...filters, selectedType: value })
          }
        />
      </div>
    </div>
  );
};

export { ResultsFilters };
