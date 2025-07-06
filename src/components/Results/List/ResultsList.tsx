import React from 'react';
import { ResultCard } from './ResultCard';

interface ResultsListProps {
  results: any[];
  onViewDetails: (id: string) => void;
  onExport: (id: string) => void;
}

export const ResultsList: React.FC<ResultsListProps> = ({
  results,
  onViewDetails,
  onExport,
}) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Your Analysis Results
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            {results.length} result{results.length !== 1 ? 's' : ''} found
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {results.map(resultItem => (
          <ResultCard
            key={resultItem.id}
            resultItem={resultItem}
            onViewDetails={onViewDetails}
            onExport={onExport}
          />
        ))}
      </div>
    </>
  );
};
