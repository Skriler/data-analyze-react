import React from 'react';
import { Target } from 'lucide-react';
import { SimilarityPairItem } from './SimilarityPairItem';
import { ResultsProcessor } from '@libs/utils/results';
import type { SimilarityAnalysisResult } from '@api-types/analysis';

interface TopSimilarityPairsProps {
  result: SimilarityAnalysisResult;
}

const TopSimilarityPairs: React.FC<TopSimilarityPairsProps> = ({ result }) => {
  const topPairs = ResultsProcessor.getTopSimilarityPairs(result, 5);

  if (topPairs.length === 0) {
    return null;
  }

  return (
    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
          <Target className="w-4 h-4 text-white" />
        </div>
        <h4 className="font-semibold text-gray-900">Top Similarity Pairs</h4>
      </div>
      <div className="space-y-3">
        {topPairs.map((pair, index) => (
          <SimilarityPairItem key={index} pair={pair} index={index} />
        ))}
      </div>
    </div>
  );
};

export { TopSimilarityPairs };
