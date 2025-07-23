import React from 'react';
import { Filter } from 'lucide-react';

const FilterSection: React.FC = () => {
  return (
    <div className="flex items-center space-x-4 mb-6">
      <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center shadow-sm">
        <Filter className="w-6 h-6 text-gray-600" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-900">Filter Results</h3>
        <p className="text-sm text-gray-500">
          Narrow down your analysis results
        </p>
      </div>
    </div>
  );
};

export { FilterSection };
