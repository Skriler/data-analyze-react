import { Eye } from 'lucide-react';
import type { DatasetDto } from '@api-types/dataset';
import { Button } from '@components/Ui/Button';

interface DatasetCardActionsProps {
  dataset: DatasetDto;
  onView: (dataset: DatasetDto) => void;
}

function DatasetCardActions({ dataset, onView }: DatasetCardActionsProps) {
  return (
    <div className="mt-auto">
      <Button
        className="w-full text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
        onClick={() => onView(dataset)}
      >
        <Eye className="h-4 w-4 mr-2" />
        View Dataset
      </Button>
    </div>
  );
}

export { DatasetCardActions };
