import React from 'react';
import { FileQuestion } from 'lucide-react';

export const ErrorIcon: React.FC = () => {
  return (
    <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center shadow-lg">
      <FileQuestion className="h-12 w-12 text-red-600" />
    </div>
  );
};
