import React from 'react';
import { BarChart3, Clock, Database, Play, Settings } from 'lucide-react';
import { Button } from '@components/Ui/Button';
import { Card, CardContent } from '@components/Ui/Card';
import type { DatasetDto } from '@api-types/dataset';

interface DatasetCardProps {
  dataset: DatasetDto;
  analysisTypeName: string;
  onAnalyze: (dataset: DatasetDto) => void;
}

export const DatasetCard: React.FC<DatasetCardProps> = ({
  dataset,
  analysisTypeName,
  onAnalyze,
}) => {
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-2 border-gray-200 hover:border-blue-300 bg-white">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
              <Database className="text-white text-xl" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-blue-700 transition-colors duration-200">
                {dataset.name}
              </h3>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <BarChart3 className="h-4 w-4 text-green-600" />
                  <span>{dataset.objects.length} objects</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Settings className="h-4 w-4 text-purple-600" />
                  <span>{dataset.parameters.length} parameters</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-1 text-xs text-gray-400">
            <Clock className="h-3 w-3" />
            <span>Ready</span>
          </div>
        </div>

        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center space-x-2">
            <span>Parameters</span>
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
              {dataset.parameters.length}
            </span>
          </h4>
          <div className="flex flex-wrap gap-2">
            {dataset.parameters.slice(0, 3).map((param, index) => (
              <span
                key={param.id}
                className={`px-3 py-1 rounded-full text-xs font-medium border ${
                  index === 0
                    ? 'bg-blue-50 text-blue-700 border-blue-200'
                    : index === 1
                      ? 'bg-green-50 text-green-700 border-green-200'
                      : 'bg-purple-50 text-purple-700 border-purple-200'
                }`}
              >
                {param.name}
              </span>
            ))}
            {dataset.parameters.length > 3 && (
              <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium border border-gray-200">
                +{dataset.parameters.length - 3} more
              </span>
            )}
          </div>
        </div>

        <div className="border-t border-gray-100 pt-4">
          <Button
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-lg shadow-md transition-all duration-200 hover:shadow-lg flex items-center justify-center space-x-2"
            onClick={() => onAnalyze(dataset)}
          >
            <Play className="h-4 w-4" />
            <span>Run {analysisTypeName}</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
