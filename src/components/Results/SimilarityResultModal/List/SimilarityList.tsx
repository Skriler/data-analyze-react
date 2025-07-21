import React from 'react';
import { SimilarityPairCard } from './SimilarityPairCard';
import type { ProcessedSimilarityPair } from '@shared/results/similarityResultModal';

interface SimilarityListProps {
  pairs: ProcessedSimilarityPair[];
  searchTerm?: string;
}

const SimilarityList: React.FC<SimilarityListProps> = ({
  pairs,
  searchTerm = '',
}) => {
  if (pairs.length === 0) {
    return (
      <div className="h-full p-6 flex items-center justify-center">
        <div className="text-center text-gray-500">
          {searchTerm ? (
            <div>
              <p className="text-lg font-medium">No matches found</p>
              <p className="text-sm mt-1">
                Try adjusting your search term or filters
              </p>
            </div>
          ) : (
            <p>No similarity data available</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-auto p-6 custom-scrollbar">
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {pairs.map(pair => (
          <SimilarityPairCard
            key={pair.id}
            pair={pair}
            searchTerm={searchTerm}
          />
        ))}
      </div>
    </div>
  );
};

export { SimilarityList };
