import React from 'react';
import { Badge } from '@components/Ui/Badge';
import type { SimilarityResult } from '@api-types/analysis';

interface SimilarityResultDisplayProps {
  result: SimilarityResult;
}

export const SimilarityResultDisplay: React.FC<
  SimilarityResultDisplayProps
> = ({ result }) => {
  const avgSimilarity =
    result.similarities.length > 0
      ? Math.round(
          result.similarities.reduce(
            (acc, s) => acc + s.similarityPercentage,
            0
          ) / result.similarities.length
        )
      : 0;

  const maxSimilarity =
    result.similarities.length > 0
      ? Math.round(
          Math.max(...result.similarities.map(s => s.similarityPercentage))
        )
      : 0;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-100">
          <div className="text-2xl font-bold text-blue-600">
            {result.similarities.length}
          </div>
          <div className="text-sm text-blue-600 font-medium">
            Similarity Pairs
          </div>
        </div>
        <div className="text-center p-4 bg-emerald-50 rounded-lg border border-emerald-100">
          <div className="text-2xl font-bold text-emerald-600">
            {avgSimilarity}%
          </div>
          <div className="text-sm text-emerald-600 font-medium">
            Avg Similarity
          </div>
        </div>
        <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-100">
          <div className="text-2xl font-bold text-purple-600">
            {maxSimilarity}%
          </div>
          <div className="text-sm text-purple-600 font-medium">
            Max Similarity
          </div>
        </div>
      </div>

      {result.similarities.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold mb-3 text-gray-900">
            Top Similarity Pairs
          </h4>
          <div className="space-y-2">
            {result.similarities.slice(0, 5).map((similarity, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-xs font-semibold text-blue-600">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-medium text-sm text-gray-900">
                      {similarity.objectA.name} ↔ {similarity.objectB.name}
                    </div>
                  </div>
                </div>
                <Badge
                  variant="secondary"
                  className="bg-blue-100 text-blue-700 hover:bg-blue-200"
                >
                  {similarity.similarityPercentage.toFixed(1)}%
                </Badge>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
