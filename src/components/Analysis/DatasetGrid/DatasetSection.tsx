import React from 'react';
import { Database, FileText, TrendingUp } from 'lucide-react';
import { Button } from '@components/Ui/Button';
import { DatasetGrid } from './DatasetGrid';
import type { DatasetDto } from '@api-types/dataset';

interface DatasetSectionProps {
  datasets: DatasetDto[] | undefined;
  isLoading: boolean;
  analysisTypeName: string;
  onRunAnalysis: (dataset: DatasetDto) => void;
  onViewResults: () => void;
  onViewDocumentation: () => void;
}

export const DatasetSection: React.FC<DatasetSectionProps> = ({
  datasets,
  isLoading,
  analysisTypeName,
  onRunAnalysis,
  onViewResults,
  onViewDocumentation,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
            <Database className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Select Dataset</h3>
            <p className="text-sm text-gray-600 flex items-center space-x-2">
              <span>Choose a dataset to analyze with {analysisTypeName}</span>
              {datasets && datasets.length > 0 && (
                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                  {datasets.length} available
                </span>
              )}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center space-x-2 border-2 border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
            onClick={onViewDocumentation}
          >
            <FileText className="h-4 w-4" />
            <span>View Documentation</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center space-x-2 border-2 border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
            onClick={onViewResults}
          >
            <TrendingUp className="h-4 w-4" />
            <span>View All Results</span>
          </Button>
        </div>
      </div>

      <DatasetGrid
        datasets={datasets}
        isLoading={isLoading}
        analysisTypeName={analysisTypeName}
        onRunAnalysis={onRunAnalysis}
      />
    </div>
  );
};
