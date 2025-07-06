import React from 'react';
import { Filter } from 'lucide-react';

const FilterSection: React.FC = () => {
  return (
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
  );
};

export { FilterSection };
