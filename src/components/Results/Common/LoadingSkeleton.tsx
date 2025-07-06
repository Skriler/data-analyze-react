import React from 'react';

const LoadingSkeleton: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <div className="w-64 h-8 bg-gray-200 rounded mx-auto animate-pulse"></div>
        <div className="w-96 h-5 bg-gray-200 rounded mx-auto animate-pulse"></div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="w-[200px] h-10 bg-gray-200 rounded animate-pulse"></div>
        <div className="w-[200px] h-10 bg-gray-200 rounded animate-pulse"></div>
        <div className="w-24 h-10 bg-gray-200 rounded animate-pulse"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="h-24 bg-gray-200 rounded-lg animate-pulse"
          ></div>
        ))}
      </div>

      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="h-64 bg-gray-200 rounded-lg animate-pulse"
          ></div>
        ))}
      </div>
    </div>
  );
};

export { LoadingSkeleton };
