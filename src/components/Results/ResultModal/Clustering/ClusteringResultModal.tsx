import ReactDOM from 'react-dom';
import React, { useState } from 'react';
import { PaginationFooter } from '@components/Ui/Pagination';
import { ClusteringChart } from './Charts';
import { ClusteringList } from './List';
import { Header, QuickStats } from './Sections';
import type { ClusteringAnalysisResult } from '@api-types/analysis';
import type { ClusteringViewMode } from '@shared/results/clusteringResultModal';
import {
  useClusteringResult,
  usePaginatedClusters,
} from '@hooks/features/results';

interface ClusteringResultModalProps {
  result: ClusteringAnalysisResult;
  isOpen: boolean;
  onClose: () => void;
}

export const ClusteringResultModal: React.FC<ClusteringResultModalProps> = ({
  result,
  isOpen,
  onClose,
}) => {
  const [viewMode, setViewMode] = useState<ClusteringViewMode>('list');
  const [searchTerm, setSearchTerm] = useState('');
  const { processedClusters, stats } = useClusteringResult(result);

  const filteredClusters = searchTerm
    ? processedClusters.filter(cluster =>
        cluster.objects.some(obj =>
          obj.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    : processedClusters;

  const { paginatedClusters, pagination, goToPage, nextPage, prevPage } =
    usePaginatedClusters(filteredClusters);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-[88vw] h-[88vh] flex flex-col overflow-hidden">
        <Header
          viewMode={viewMode}
          searchTerm={searchTerm}
          onViewModeChange={setViewMode}
          onSearchChange={setSearchTerm}
          onClose={onClose}
        />

        {!searchTerm && <QuickStats stats={stats} />}

        <div className="flex-1 overflow-y-auto min-h-0">
          {viewMode === 'visualization' ? (
            <ClusteringChart clusters={processedClusters} />
          ) : (
            <ClusteringList
              clusters={paginatedClusters}
              searchTerm={searchTerm}
            />
          )}
        </div>

        {viewMode === 'list' && pagination.totalPages > 1 && (
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
