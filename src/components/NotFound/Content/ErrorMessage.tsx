import React from 'react';
import { FileQuestion } from 'lucide-react';

const ErrorMessage: React.FC = () => {
  return (
    <div className="text-center">
      <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center shadow-lg">
        <FileQuestion className="h-12 w-12 text-red-600" />
      </div>

      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        404 - Page Not Found
      </h1>

      <p className="text-lg text-gray-600 mb-6 leading-relaxed">
        The page you're looking for doesn't exist or has been moved.
      </p>
    </div>
  );
};

export { ErrorMessage };
