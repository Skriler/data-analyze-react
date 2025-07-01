import React from 'react';
import { Button } from '@components/Ui/Button';
import { Card, CardContent } from '@components/Ui/Card';
import { BarChart3 } from 'lucide-react';
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
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
              <BarChart3 className="text-primary text-lg" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">
                {dataset.name}
              </h3>
              <p className="text-sm text-gray-500">
                {dataset.objects.length} objects, {dataset.parameters.length}{' '}
                parameters
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2 mb-4">
          {dataset.parameters.slice(0, 3).map(param => (
            <span
              key={param.id}
              className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium"
            >
              {param.name}
            </span>
          ))}
          {dataset.parameters.length > 3 && (
            <span className="text-xs text-gray-500">
              +{dataset.parameters.length - 3} more
            </span>
          )}
        </div>

        <Button className="w-full" onClick={() => onAnalyze(dataset)}>
          Run {analysisTypeName}
        </Button>
      </CardContent>
    </Card>
  );
};
