import React from 'react';

interface ResultsListHeaderProps {
  count: number;
}

export const ResultsListHeader: React.FC<ResultsListHeaderProps> = ({
  count,
}) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">
          Your Analysis Results
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          {count} result{count !== 1 ? 's' : ''} found
        </p>
      </div>
    </div>
  );
};
