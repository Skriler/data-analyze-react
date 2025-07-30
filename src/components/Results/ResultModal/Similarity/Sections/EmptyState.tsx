import React from 'react';

const EmptyState: React.FC = () => (
  <div className="h-full flex items-center justify-center">
    <div className="text-center text-gray-500">
      <p className="text-lg font-medium mb-2">
        No pairs match your current filters
      </p>
      <p className="text-base">
        Try adjusting your search term or filter settings.
      </p>
    </div>
  </div>
);

export { EmptyState };
