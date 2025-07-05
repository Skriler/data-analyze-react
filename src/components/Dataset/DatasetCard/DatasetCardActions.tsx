import { BarChart3, Eye } from 'lucide-react';
import type { DatasetDto } from '@api-types/dataset';
import { Button } from '@components/Ui/Button';

interface DatasetCardActionsProps {
  dataset: DatasetDto;
  onView: (dataset: DatasetDto) => void;
  onAnalyze: (dataset: DatasetDto) => void;
  isDeleting: boolean;
}

function DatasetCardActions({
  dataset,
  onView,
  onAnalyze,
  isDeleting,
}: DatasetCardActionsProps) {
  return (
    <div className="flex items-center space-x-2">
      <Button
        className="flex-1 text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
        onClick={() => onView(dataset)}
        disabled={isDeleting}
      >
        <Eye className="h-4 w-4 mr-2" />
        View Dataset
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onAnalyze(dataset)}
        disabled={isDeleting}
        className="px-4 bg-white border-gray-200 text-gray-700 hover:bg-gray-50 shadow-sm"
      >
        <BarChart3 className="h-4 w-4" />
      </Button>
    </div>
  );
}

export { DatasetCardActions };
