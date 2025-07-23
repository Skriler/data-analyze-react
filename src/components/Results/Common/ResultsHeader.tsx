import React from 'react';
import { BarChart3, TrendingUp, Activity, Database } from 'lucide-react';

const ResultsHeader: React.FC = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="relative rounded-3xl p-8 mb-8 overflow-hidden">
        <div className="relative text-center space-y-6">
          {/* Icon with floating elements */}
          <div className="relative inline-flex items-center justify-center">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 rounded-2xl shadow-xl shadow-blue-500/25 flex items-center justify-center transform hover:scale-105 transition-all duration-300">
              <BarChart3 className="w-10 h-10 text-white" />
            </div>

            {/* Floating mini icons */}
            <div
              className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg animate-bounce"
              style={{ animationDelay: '0.5s' }}
            >
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <div
              className="absolute -bottom-2 -left-2 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center shadow-lg animate-bounce"
              style={{ animationDelay: '1s' }}
            >
              <Activity className="w-4 h-4 text-white" />
            </div>
            <div className="absolute top-1/2 -left-8 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
              <Database className="w-3 h-3 text-white" />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-4">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 via-gray-900 to-blue-800 bg-clip-text text-transparent leading-tight">
                Analysis Results
              </h1>
              <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto"></div>
            </div>

            <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
              View and analyze your completed analysis results. Track insights
              and compare different analysis approaches with advanced
              visualization tools.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ResultsHeader };
