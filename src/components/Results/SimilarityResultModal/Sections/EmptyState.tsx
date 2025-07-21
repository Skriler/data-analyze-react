import React from 'react';

const EmptyState: React.FC = () => (
  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 text-center text-gray-500">
    <p className="text-sm">
      No pairs match your current filters. Try adjusting your search term or
      filter settings.
    </p>
  </div>
);

export { EmptyState };
