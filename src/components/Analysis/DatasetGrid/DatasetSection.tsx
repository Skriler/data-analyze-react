import React from 'react';
import { Button } from '@components/Ui/Button';
import { BarChart3 } from 'lucide-react';
import { DatasetGrid } from './DatasetGrid';
import type { DatasetDto } from '@api-types/dataset';

interface DatasetSectionProps {
  datasets: DatasetDto[] | undefined;
  isLoading: boolean;
  analysisTypeName: string;
  onAnalyzeDataset: (dataset: DatasetDto) => void;
}

export const DatasetSection: React.FC<DatasetSectionProps> = ({
  datasets,
  isLoading,
  analysisTypeName,
  onAnalyzeDataset,
}) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Select Dataset</h3>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center space-x-2"
        >
          <BarChart3 className="h-4 w-4" />
          <span>View All Results</span>
        </Button>
      </div>

      <DatasetGrid
        datasets={datasets}
        isLoading={isLoading}
        analysisTypeName={analysisTypeName}
        onAnalyzeDataset={onAnalyzeDataset}
      />
    </div>
  );
};
