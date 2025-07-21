import React from 'react';
import { Search } from 'lucide-react';

interface ActiveFiltersProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const ActiveFilters: React.FC<ActiveFiltersProps> = ({
  searchTerm,
  onSearchChange,
}) => {
  return (
    <div className="px-6 py-3 bg-gray-50 border-b border-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search objects..."
              value={searchTerm}
              onChange={e => onSearchChange(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 w-80"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export { ActiveFilters };
