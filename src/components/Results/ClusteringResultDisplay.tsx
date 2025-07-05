import React from 'react';
import { Users, Package, BarChart3, Hash } from 'lucide-react';
import { Badge } from '@components/Ui/Badge';
import type { ClusteringResult } from '@api-types/analysis';
import { ResultsProcessor } from '@libs/utils/results/utils';
import { FormattingUtils } from '@libs/utils/formatting';

interface ClusteringResultDisplayProps {
  result: ClusteringResult;
  showDetails?: boolean;
}

export const ClusteringResultDisplay: React.FC<
  ClusteringResultDisplayProps
> = ({ result, showDetails = true }) => {
  const stats = ResultsProcessor.calculateClusterStats(result);
  const topClusters = ResultsProcessor.getTopClusters(result, 10);

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-4 border border-emerald-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-emerald-900">
                {FormattingUtils.formatNumber(stats.totalClusters)}
              </div>
              <div className="text-sm font-medium text-emerald-700">
                Clusters Found
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-900">
                {FormattingUtils.formatNumber(stats.totalObjects)}
              </div>
              <div className="text-sm font-medium text-blue-700">
                Total Objects
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-900">
                {FormattingUtils.formatNumber(stats.avgClusterSize)}
              </div>
              <div className="text-sm font-medium text-purple-700">
                Avg Cluster Size
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cluster Distribution */}
      {showDetails && topClusters.length > 0 && (
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <Users className="w-4 h-4 text-white" />
            </div>
            <h4 className="font-semibold text-gray-900">
              Cluster Distribution
            </h4>
          </div>
          <div className="space-y-4">
            {topClusters.map((cluster, index) => (
              <div
                key={index}
                className="p-4 bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-all duration-200 hover:shadow-sm"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-sm">
                      <Hash className="w-3 h-3" />
                    </div>
                    <h5 className="font-medium text-gray-900">
                      {cluster.name}
                    </h5>
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-gradient-to-r from-emerald-100 to-emerald-200 text-emerald-800 border-emerald-300 hover:from-emerald-200 hover:to-emerald-300 font-bold text-sm px-3 py-1"
                  >
                    {FormattingUtils.formatNumber(cluster.objects.length)}{' '}
                    objects
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cluster.objects.slice(0, 10).map((obj, objIndex) => (
                    <span
                      key={objIndex}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium hover:bg-gray-200 transition-colors cursor-default"
                      title={obj.name}
                    >
                      {FormattingUtils.truncateText(obj.name, 20)}
                    </span>
                  ))}
                  {cluster.objects.length > 10 && (
                    <span className="px-3 py-1 text-gray-500 text-xs font-medium bg-gray-50 rounded-full border border-gray-200">
                      +
                      {FormattingUtils.formatNumber(
                        cluster.objects.length - 10
                      )}{' '}
                      more
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
