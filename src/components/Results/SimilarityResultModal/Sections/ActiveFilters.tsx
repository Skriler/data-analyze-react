import React from 'react';
import { Badge } from '@components/Ui/Badge';
import { FILTER_OPTIONS } from '@shared/results/similarityResultModal';
import type { SimilarityFilter } from '@shared/results/similarityResultModal';

interface ActiveFiltersProps {
  searchTerm: string;
  filter: SimilarityFilter;
}

const ActiveFilters: React.FC<ActiveFiltersProps> = ({
  searchTerm,
  filter,
}) => {
  const filterOption = FILTER_OPTIONS.find(opt => opt.value === filter);

  return (
    <div className="flex items-center space-x-2">
      {searchTerm && (
        <Badge variant="outline" className="text-xs">
          Search: "{searchTerm}"
        </Badge>
      )}
      {filter !== 'all' && filterOption && (
        <Badge
          variant="outline"
          className="text-xs"
          style={{
            borderColor: filterOption.color,
            color: filterOption.color,
          }}
        >
          {filterOption.label}
        </Badge>
      )}
    </div>
  );
};

export { ActiveFilters };
