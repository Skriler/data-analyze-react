import React from 'react';
import { ArrowLeftRight, Package } from 'lucide-react';
import { Badge } from '@components/Ui/Badge';
import type { ProcessedSimilarityPair } from '@shared/results/similarityResultModal';
import { SimilarityResultsProcessor } from '@libs/utils/results';
import { ResultsFormatter } from '@libs/utils/results';

interface SimilarityPairCardProps {
  pair: ProcessedSimilarityPair;
  searchTerm?: string;
}

const SimilarityPairCard: React.FC<SimilarityPairCardProps> = ({
  pair,
  searchTerm = '',
}) => {
  const similarityColor = SimilarityResultsProcessor.getSimilarityColor(
    pair.similarityPercentage
  );

  const highlightText = (text: string, searchTerm: string) => {
    if (!searchTerm.trim()) return text;

    const words = searchTerm
      .toLowerCase()
      .split(/\s+/)
      .filter(Boolean)
      .map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));

    if (!words.length) return text;

    const regex = new RegExp(`(${words.join('|')})`, 'gi');

    const parts = text.split(regex);

    return (
      <>
        {parts.map((part, i) =>
          regex.test(part) ? (
            <mark key={i} className="bg-yellow-200 rounded px-1">
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </>
    );
  };

  const renderObjectCard = (obj: typeof pair.objectA, isSecond = false) => (
    <div className={`flex-1 ${isSecond ? 'text-right' : ''}`}>
      <div className="flex items-center space-x-2 mb-2">
        <Package className="w-4 h-4 text-gray-500" />
        <h4 className="font-medium text-gray-900 text-sm truncate">
          {highlightText(obj.name, searchTerm)}
        </h4>
      </div>

      {obj.parameterValues && Object.keys(obj.parameterValues).length > 0 && (
        <div className="space-y-1">
          {Object.entries(obj.parameterValues)
            .slice(0, 2)
            .map(([key, value]) => (
              <div key={key} className="text-xs text-gray-600">
                <span className="font-medium">
                  {ResultsFormatter.truncateText(key, 10)}:
                </span>{' '}
                <span className="text-gray-800">
                  {ResultsFormatter.truncateText(String(value), 15)}
                </span>
              </div>
            ))}
          {Object.keys(obj.parameterValues).length > 2 && (
            <div className="text-xs text-gray-400 italic">
              +{Object.keys(obj.parameterValues).length - 2} more
            </div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md hover:border-gray-300 transition-all duration-200">
      <div className="flex items-center justify-between mb-3">
        <Badge
          className="px-2 py-1 text-xs font-semibold text-white rounded-full"
          style={{ backgroundColor: similarityColor }}
        >
          {pair.similarityPercentage.toFixed(2)}%
        </Badge>
        <div className="text-xs text-gray-500">Similarity Score</div>
      </div>

      <div className="flex items-center space-x-4">
        {renderObjectCard(pair.objectA)}

        <div className="flex flex-col items-center space-y-1">
          <ArrowLeftRight className="w-4 h-4 text-gray-400" />
          <div
            className="w-8 h-1 rounded-full"
            style={{ backgroundColor: similarityColor }}
          />
        </div>

        {renderObjectCard(pair.objectB, true)}
      </div>
    </div>
  );
};

export { SimilarityPairCard };
