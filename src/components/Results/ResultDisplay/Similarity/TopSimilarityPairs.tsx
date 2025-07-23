import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Target } from 'lucide-react';
import { SimilarityPairItem } from './SimilarityPairItem';
import { ResultsProcessor } from '@libs/utils/results';
import type { SimilarityAnalysisResult } from '@api-types/analysis';

interface TopSimilarityPairsProps {
  result: SimilarityAnalysisResult;
  defaultExpanded?: boolean;
}

const TopSimilarityPairs: React.FC<TopSimilarityPairsProps> = ({
  result,
  defaultExpanded = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const topPairs = ResultsProcessor.getTopSimilarityPairs(result, 5);

  if (topPairs.length === 0) {
    return null;
  }

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={toggleExpanded}
      >
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
            <Target className="w-4 h-4 text-white" />
          </div>
          <h4 className="font-semibold text-gray-900">Top Similarity Pairs</h4>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">{topPairs.length} pairs</span>
          {isExpanded ? (
            <ChevronDown className="w-5 h-5 text-gray-400 transition-transform duration-200" />
          ) : (
            <ChevronRight className="w-5 h-5 text-gray-400 transition-transform duration-200" />
          )}
        </div>
      </div>

      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isExpanded
            ? 'max-h-[2000px] opacity-100 mt-4'
            : 'max-h-0 opacity-0 mt-0'
        }`}
      >
        <div className="space-y-3">
          {topPairs.map((pair, index) => (
            <SimilarityPairItem key={index} pair={pair} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export { TopSimilarityPairs };
