import React from 'react';
import { Badge } from '@components/Ui/Badge';
import type { ClusteringResult } from '@api-types/analysis';

interface ClusteringResultDisplayProps {
  result: ClusteringResult;
}

export const ClusteringResultDisplay: React.FC<
  ClusteringResultDisplayProps
> = ({ result }) => {
  const totalObjects = result.clusters.reduce(
    (acc, cluster) => acc + cluster.objects.length,
    0
  );

  const avgClusterSize =
    result.clusters.length > 0
      ? Math.round(totalObjects / result.clusters.length)
      : 0;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="text-center p-4 bg-emerald-50 rounded-lg border border-emerald-100">
          <div className="text-2xl font-bold text-emerald-600">
            {result.clusters.length}
          </div>
          <div className="text-sm text-emerald-600 font-medium">
            Clusters Found
          </div>
        </div>
        <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-100">
          <div className="text-2xl font-bold text-blue-600">{totalObjects}</div>
          <div className="text-sm text-blue-600 font-medium">Total Objects</div>
        </div>
        <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-100">
          <div className="text-2xl font-bold text-purple-600">
            {avgClusterSize}
          </div>
          <div className="text-sm text-purple-600 font-medium">
            Avg Cluster Size
          </div>
        </div>
      </div>

      {result.clusters.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold mb-3 text-gray-900">
            Cluster Distribution
          </h4>
          <div className="space-y-3">
            {result.clusters.map((cluster, index) => (
              <div
                key={index}
                className="p-4 bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <h5 className="font-medium text-gray-900">{cluster.name}</h5>
                  <Badge variant="outline" className="bg-gray-50">
                    {cluster.objects.length} objects
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cluster.objects.slice(0, 10).map((obj, objIndex) => (
                    <span
                      key={objIndex}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium hover:bg-gray-200 transition-colors"
                    >
                      {obj.name}
                    </span>
                  ))}
                  {cluster.objects.length > 10 && (
                    <span className="px-3 py-1 text-gray-500 text-xs font-medium">
                      +{cluster.objects.length - 10} more
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
