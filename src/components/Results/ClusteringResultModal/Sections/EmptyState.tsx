import React from 'react';

interface EmptyStateProps {
  searchTerm?: string;
  message?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  searchTerm,
  message = 'No clustering data available',
}) => {
  return (
    <div className="h-full p-6 flex items-center justify-center">
      <div className="text-center text-gray-500">
        {searchTerm ? (
          <div>
            <p className="text-lg font-medium">No results found</p>
            <p className="text-sm mt-1">
              Try adjusting your search term "{searchTerm}"
            </p>
          </div>
        ) : (
          <p>{message}</p>
        )}
      </div>
    </div>
  );
};

export { EmptyState };
