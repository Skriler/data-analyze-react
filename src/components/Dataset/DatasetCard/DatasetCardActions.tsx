import { BarChart3 } from 'lucide-react';
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
        className="flex-1 text-sm"
        onClick={() => onView(dataset)}
        disabled={isDeleting}
      >
        View Dataset
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onAnalyze(dataset)}
        disabled={isDeleting}
        className="px-3"
      >
        <BarChart3 className="h-4 w-4" />
      </Button>
    </div>
  );
}

export { DatasetCardActions };
