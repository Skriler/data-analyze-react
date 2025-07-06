import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Badge } from '@components/Ui/Badge';
import { ResultsFormatter } from '@libs/utils/results';
import type { SimilarityPairDto } from '@api-types/analysis/similarity';

interface SimilarityPairItemProps {
  pair: SimilarityPairDto;
  index: number;
}

const SimilarityPairItem: React.FC<SimilarityPairItemProps> = ({
  pair,
  index,
}) => (
  <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-200 hover:shadow-sm">
    <div className="flex items-center space-x-4">
      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-sm">
        {index + 1}
      </div>
      <div className="flex items-center space-x-3 text-sm">
        <span className="font-medium text-gray-900 bg-gray-100 px-3 py-1 rounded-full">
          {ResultsFormatter.truncateText(pair.objectA.name, 20)}
        </span>
        <ArrowRight className="w-4 h-4 text-gray-400" />
        <span className="font-medium text-gray-900 bg-gray-100 px-3 py-1 rounded-full">
          {ResultsFormatter.truncateText(pair.objectB.name, 20)}
        </span>
      </div>
    </div>
    <Badge
      variant="secondary"
      className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border-blue-300 hover:from-blue-200 hover:to-blue-300 font-bold text-sm px-3 py-1"
    >
      {ResultsFormatter.formatPercentage(pair.similarityPercentage)}
    </Badge>
  </div>
);

export { SimilarityPairItem };
