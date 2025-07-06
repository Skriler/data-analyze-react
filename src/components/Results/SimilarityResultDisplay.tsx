import React from 'react';
import { TrendingUp, Target, Zap, ArrowRight } from 'lucide-react';
import { Badge } from '@components/Ui/Badge';
import type { SimilarityResult } from '@api-types/analysis';
import { ResultsProcessor, ResultsFormatter } from '@libs/utils/results';

interface SimilarityResultDisplayProps {
  result: SimilarityResult;
  showDetails?: boolean;
}

export const SimilarityResultDisplay: React.FC<
  SimilarityResultDisplayProps
> = ({ result, showDetails = true }) => {
  const stats = ResultsProcessor.calculateSimilarityStats(result);
  const topPairs = ResultsProcessor.getTopSimilarityPairs(result, 5);

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-900">
                {ResultsFormatter.formatNumber(stats.totalPairs)}
              </div>
              <div className="text-sm font-medium text-blue-700">
                Similarity Pairs
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-4 border border-emerald-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-emerald-900">
                {ResultsFormatter.formatPercentage(stats.avgSimilarity, 0)}
              </div>
              <div className="text-sm font-medium text-emerald-700">
                Avg Similarity
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-900">
                {ResultsFormatter.formatPercentage(stats.maxSimilarity, 0)}
              </div>
              <div className="text-sm font-medium text-purple-700">
                Max Similarity
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Pairs */}
      {showDetails && topPairs.length > 0 && (
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Target className="w-4 h-4 text-white" />
            </div>
            <h4 className="font-semibold text-gray-900">
              Top Similarity Pairs
            </h4>
          </div>
          <div className="space-y-3">
            {topPairs.map((similarity, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-200 hover:shadow-sm"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-sm">
                    {index + 1}
                  </div>
                  <div className="flex items-center space-x-3 text-sm">
                    <span className="font-medium text-gray-900 bg-gray-100 px-3 py-1 rounded-full">
                      {ResultsFormatter.truncateText(
                        similarity.objectA.name,
                        20
                      )}
                    </span>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                    <span className="font-medium text-gray-900 bg-gray-100 px-3 py-1 rounded-full">
                      {ResultsFormatter.truncateText(
                        similarity.objectB.name,
                        20
                      )}
                    </span>
                  </div>
                </div>
                <Badge
                  variant="secondary"
                  className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border-blue-300 hover:from-blue-200 hover:to-blue-300 font-bold text-sm px-3 py-1"
                >
                  {ResultsFormatter.formatPercentage(
                    similarity.similarityPercentage
                  )}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
