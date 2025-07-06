import React from 'react';
import { BarChart3 } from 'lucide-react';

const ResultsHeader: React.FC = () => {
  return (
    <div className="text-center space-y-4">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl shadow-lg">
        <BarChart3 className="w-8 h-8 text-white" />
      </div>
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Analysis Results
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          View and analyze your completed analysis results. Track insights,
          export data, and compare different analysis approaches.
        </p>
      </div>
    </div>
  );
};

export { ResultsHeader };
