import React from 'react';
import { ChevronRight, Database } from 'lucide-react';
import type { DatasetDto } from '@api-types/dataset';

interface DatasetItemProps {
  dataset: DatasetDto;
  onItemClick?: (datasetId: number) => void;
}

const DatasetItem: React.FC<DatasetItemProps> = ({ dataset, onItemClick }) => {
  const handleClick = () => {
    onItemClick?.(dataset.id);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      className="flex items-center space-x-4 p-3 rounded-xl hover:bg-white/60 transition-all duration-200 cursor-pointer group"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${dataset.name}`}
    >
      <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
        <Database className="h-6 w-6 text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
          {dataset.name}
        </p>
        <p className="text-sm text-gray-500 leading-relaxed">
          <span className="font-medium">{dataset.objects.length}</span> objects
          • <span className="font-medium">{dataset.parameters.length}</span>{' '}
          parameters
        </p>
      </div>
      <div className="text-gray-400 group-hover:text-gray-600 transition-colors">
        <ChevronRight className="w-5 h-5" />
      </div>
    </div>
  );
};

export { DatasetItem };
