import ReactDOM from 'react-dom';
import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { PaginationFooter } from '@components/Ui/Pagination';
import { Header, QuickStats, EmptyState } from './Sections';
import { SimilarityList } from './List';
import { SimilarityChart } from './Charts';
import type {
  SimilarityViewMode,
  SimilarityFilter,
  SimilaritySortOption,
} from '@shared/results/similarityResultModal';
import type { SimilarityAnalysisResult } from '@api-types/analysis';
import {
  useSimilarityResult,
  useFilteredSimilarityPairs,
  usePaginatedSimilarityPairs,
} from '@hooks/features/results';

interface SimilarityResultModalProps {
  result: SimilarityAnalysisResult;
  isOpen: boolean;
  onClose: () => void;
}

const SimilarityResultModal: React.FC<SimilarityResultModalProps> = ({
  result,
  isOpen,
  onClose,
}) => {
  const [viewMode, setViewMode] = useState<SimilarityViewMode>('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<SimilarityFilter>('all');
  const [sortOption, setSortOption] =
    useState<SimilaritySortOption>('similarity-desc');

  const { processedPairs, stats, exactMatches, distribution, loadingState } =
    useSimilarityResult(result);
  const { filteredPairs } = useFilteredSimilarityPairs({
    pairs: processedPairs,
    searchTerm,
    filter,
    sortOption,
  });

  const { paginatedPairs, pagination, goToPage, nextPage, prevPage } =
    usePaginatedSimilarityPairs(filteredPairs);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className=" fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-[88vw] h-[88vh] flex flex-col overflow-hidden">
        <Header
          viewMode={viewMode}
          setViewMode={setViewMode}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filter={filter}
          setFilter={setFilter}
          sortOption={sortOption}
          setSortOption={setSortOption}
          onClose={onClose}
        />

        {!searchTerm && (
          <QuickStats stats={stats} exactMatches={exactMatches} />
        )}

        <div className="flex-1 overflow-y-auto min-h-0">
          {loadingState === 'processing' ? (
            <div className="h-full flex items-center justify-center">
              <div className="flex flex-col items-center space-y-4">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                <p className="text-gray-600">Processing similarity data...</p>
              </div>
            </div>
          ) : viewMode === 'list' ? (
            filteredPairs.length > 0 ? (
              <SimilarityList pairs={paginatedPairs} searchTerm={searchTerm} />
            ) : (
              <EmptyState />
            )
          ) : (
            <SimilarityChart
              pairs={processedPairs}
              distribution={distribution}
            />
          )}
        </div>

        {viewMode === 'list' &&
          loadingState === 'loaded' &&
          pagination.totalPages > 1 && (
            <PaginationFooter
              pagination={pagination}
              goToPage={goToPage}
              nextPage={nextPage}
              prevPage={prevPage}
            />
          )}
      </div>
    </div>,
    document.body
  );
};

export { SimilarityResultModal };
