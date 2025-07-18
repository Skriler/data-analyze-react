import React from 'react';

const AnalysisHeader: React.FC = () => {
  return (
    <div className="text-center space-y-4 mb-8">
      <h1 className="text-3xl font-bold text-gray-900">Analysis Dashboard</h1>
      <p className="text-gray-600 text-lg max-w-2xl mx-auto">
        Select the type of analysis you want to run on your dataset and discover
        insights
      </p>
    </div>
  );
};

export { AnalysisHeader };
