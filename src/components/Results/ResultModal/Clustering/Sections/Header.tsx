import React from 'react';
import { X, BarChart3, List, Search } from 'lucide-react';
import type { ClusteringViewMode } from '@shared/results/clusteringResultModal';

interface HeaderProps {
  viewMode: ClusteringViewMode;
  searchTerm: string;
  onViewModeChange: (mode: ClusteringViewMode) => void;
  onSearchChange: (term: string) => void;
  onClose: () => void;
}

const Header: React.FC<HeaderProps> = ({
  viewMode,
  searchTerm,
  onViewModeChange,
  onSearchChange,
  onClose,
}) => {
  return (
    <div className="flex items-center justify-between p-6 border-b border-gray-200">
      <div className="flex items-center space-x-4">
        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
          <BarChart3 className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Clustering Analysis Results
          </h2>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {viewMode === 'list' && (
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
        )}

        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => onViewModeChange('list')}
            className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 flex items-center space-x-2 ${
              viewMode === 'list'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <List className="w-4 h-4" />
            <span>List</span>
          </button>
          <button
            onClick={() => onViewModeChange('visualization')}
            className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 flex items-center space-x-2 ${
              viewMode === 'visualization'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Chart</span>
          </button>
        </div>

        <button
          onClick={onClose}
          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export { Header };
