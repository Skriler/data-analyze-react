import type { SimilarityStats } from '@shared/results';
import type { ProcessedSimilarityPair } from '@shared/results/similarityResultModal';
import React from 'react';

interface QuickStatsProps {
  stats: SimilarityStats;
  exactMatches: ProcessedSimilarityPair[];
}

const QuickStats: React.FC<QuickStatsProps> = ({ stats, exactMatches }) => {
  return (
    <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-200">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          {
            label: 'Total Pairs',
            value: stats.totalPairs,
            color: 'text-gray-900',
          },
          {
            label: 'Average',
            value: `${stats.avgSimilarity.toFixed(2)}%`,
            color: 'text-blue-600',
          },
          {
            label: 'Range',
            value: `${stats.minSimilarity.toFixed(2)}% - ${stats.maxSimilarity.toFixed(2)}%`,
            color: 'text-purple-600',
          },
          {
            label: 'Highest',
            value: `${stats.maxSimilarity.toFixed(2)}%`,
            color: 'text-green-600',
          },
          {
            label: 'Exact Matches',
            value: exactMatches.length,
            color: 'text-red-600',
          },
        ].map(item => (
          <div
            key={item.label}
            className="bg-white rounded-lg p-3 border border-gray-200"
          >
            <div className="text-xs text-gray-500 uppercase tracking-wide">
              {item.label}
            </div>
            <div className={`text-lg font-bold ${item.color}`}>
              {item.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export { QuickStats };
