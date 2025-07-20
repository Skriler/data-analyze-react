import React, { useState } from 'react';
import { X, BarChart3, Grid3x3 } from 'lucide-react';
import { ClusteringVisualization } from './ClusteringVisualization';
import { ClusteringDetailsList } from './ClusteringDetailsList';
import { useClusteringResult } from '@hooks/features/results';
import type { ClusteringAnalysisResult } from '@api-types/analysis';

interface ClusteringResultModalProps {
  result: ClusteringAnalysisResult;
  isOpen: boolean;
  onClose: () => void;
}

type ViewMode = 'visualization' | 'list';

const ClusteringResultModal: React.FC<ClusteringResultModalProps> = ({
  result,
  isOpen,
  onClose,
}) => {
  const [viewMode, setViewMode] = useState<ViewMode>('visualization');
  const { processedClusters, stats } = useClusteringResult(result);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <Grid3x3 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Clustering Analysis Details
              </h2>
              <p className="text-sm text-gray-500">
                {stats.totalClusters} clusters • {stats.totalObjects} objects
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* View Mode Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('visualization')}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 flex items-center space-x-2 ${
                  viewMode === 'visualization'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span>Chart</span>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 flex items-center space-x-2 ${
                  viewMode === 'list'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Grid3x3 className="w-4 h-4" />
                <span>List</span>
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

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          {viewMode === 'visualization' ? (
            <ClusteringVisualization clusters={processedClusters} />
          ) : (
            <ClusteringDetailsList clusters={processedClusters} />
          )}
        </div>
      </div>
    </div>
  );
};

export { ClusteringResultModal };
