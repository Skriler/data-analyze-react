import React from 'react';
import {
  X,
  TrendingUp,
  List,
  BarChart3,
  Search,
  Filter,
  SortAsc,
} from 'lucide-react';
import {
  FILTER_OPTIONS,
  SORT_OPTIONS,
} from '@shared/results/similarityResultModal';
import type {
  SimilarityFilter,
  SimilaritySortOption,
  SimilarityViewMode,
} from '@shared/results/similarityResultModal';

interface HeaderProps {
  viewMode: SimilarityViewMode;
  setViewMode: (mode: SimilarityViewMode) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filter: SimilarityFilter;
  setFilter: (filter: SimilarityFilter) => void;
  sortOption: SimilaritySortOption;
  setSortOption: (option: SimilaritySortOption) => void;
  onClose: () => void;
}

const Header: React.FC<HeaderProps> = ({
  viewMode,
  setViewMode,
  searchTerm,
  setSearchTerm,
  filter,
  setFilter,
  sortOption,
  setSortOption,
  onClose,
}) => (
  <div className="flex items-center justify-between p-6 border-b border-gray-200">
    <div className="flex items-center space-x-4">
      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
        <TrendingUp className="w-5 h-5 text-white" />
      </div>
      <div>
        <h2 className="text-xl font-semibold text-gray-900">
          Similarity Analysis Results
        </h2>
      </div>
    </div>

    <div className="flex items-center space-x-3">
      {viewMode === 'list' && (
        <>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by keyword or pair"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 w-80"
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select
              value={filter}
              onChange={e => setFilter(e.target.value as SimilarityFilter)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg text-sm bg-white cursor-pointer min-w-[140px]"
            >
              {FILTER_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="relative">
            <SortAsc className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select
              value={sortOption}
              onChange={e =>
                setSortOption(e.target.value as SimilaritySortOption)
              }
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg text-sm bg-white cursor-pointer min-w-[160px]"
            >
              {SORT_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </>
      )}

      <div className="flex bg-gray-100 rounded-lg p-1 w-36">
        <button
          onClick={() => setViewMode('list')}
          className={`flex items-center justify-center space-x-1 flex-1 px-2 py-2 text-xs font-medium rounded-md transition ${
            viewMode === 'list'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <List className="w-3 h-3" />
          <span>List</span>
        </button>
        <button
          onClick={() => setViewMode('chart')}
          className={`flex items-center justify-center space-x-1 flex-1 px-2 py-2 text-xs font-medium rounded-md transition ${
            viewMode === 'chart'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <BarChart3 className="w-3 h-3" />
          <span>Chart</span>
        </button>
      </div>

      <button
        onClick={onClose}
        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  </div>
);

export { Header };
