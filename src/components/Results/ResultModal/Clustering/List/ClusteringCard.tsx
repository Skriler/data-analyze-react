import React from 'react';
import { Grid3X3, Hash } from 'lucide-react';
import {
  CLUSTER_COLORS,
  type ProcessedCluster,
} from '@shared/results/clusteringResultModal';
import { ResultsFormatter } from '@libs/utils/results';

interface ClusteringCardProps {
  cluster: ProcessedCluster;
  searchTerm?: string;
}

const ClusteringCard: React.FC<ClusteringCardProps> = ({
  cluster,
  searchTerm = '',
}) => {
  const clusterColor =
    CLUSTER_COLORS[(cluster.number - 1) % CLUSTER_COLORS.length];

  const hasMatchingObjects = cluster.objects.some(obj =>
    obj.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayObjects = cluster.objects;

  const highlightText = (text: string, searchTerm: string) => {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 rounded px-1">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
      {/* Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center space-x-4">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-md"
            style={{ backgroundColor: clusterColor }}
          >
            #{cluster.number}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-lg">
              Cluster {cluster.number}
            </h3>
            <p className="text-sm text-gray-500 flex items-center space-x-2">
              <Hash className="w-3 h-3" />
              <span>
                {ResultsFormatter.formatNumber(cluster.objects.length)} objects
                {searchTerm && hasMatchingObjects && (
                  <span className="ml-2 text-emerald-600 font-medium">
                    (contains matches)
                  </span>
                )}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      {displayObjects.length > 0 && (
        <div className="p-4">
          <div className="flex items-center space-x-2 mb-4">
            <Grid3X3 className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">
              Objects in this cluster
            </span>
          </div>

          {/* Objects List */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3 max-h-96 overflow-y-auto">
            {displayObjects.map((obj, index) => (
              <div
                key={index}
                className="flex items-start space-x-3 p-3 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
              >
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5"
                  style={{ backgroundColor: clusterColor }}
                >
                  {index + 1}
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 text-xs mb-1 leading-tight">
                    {highlightText(obj.name, searchTerm)}
                  </h4>

                  {obj.parameterValues &&
                    Object.keys(obj.parameterValues).length > 0 && (
                      <div className="space-y-1">
                        {Object.entries(obj.parameterValues)
                          .slice(0, 2)
                          .map(([key, value]) => (
                            <div
                              key={key}
                              className="flex items-center justify-between text-xs bg-white rounded px-2 py-0.5 border"
                            >
                              <span className="text-gray-500 font-medium truncate text-xs">
                                {ResultsFormatter.truncateText(key, 8)}
                              </span>
                              <span className="text-gray-800 font-semibold ml-1 text-xs">
                                {ResultsFormatter.truncateText(
                                  String(value),
                                  8
                                )}
                              </span>
                            </div>
                          ))}
                        {Object.keys(obj.parameterValues).length > 2 && (
                          <div className="text-xs text-gray-400 italic text-center py-0.5">
                            +{Object.keys(obj.parameterValues).length - 2} more
                          </div>
                        )}
                      </div>
                    )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {displayObjects.length === 0 && searchTerm && (
        <div className="p-4 text-center text-gray-500">
          <p className="text-sm">No objects match your search</p>
        </div>
      )}
    </div>
  );
};

export { ClusteringCard };
