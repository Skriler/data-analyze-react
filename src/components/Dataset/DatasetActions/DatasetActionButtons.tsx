import { Plus, Upload } from 'lucide-react';
import { Button } from '@components/Ui/Button';

interface DatasetActionButtonsProps {
  onCreateDataset: () => void;
  onImportDataset: () => void;
}

function DatasetActionButtons({
  onCreateDataset,
  onImportDataset,
}: DatasetActionButtonsProps) {
  return (
    <div className="flex items-center space-x-3">
      <Button onClick={onCreateDataset} className="flex items-center space-x-2">
        <Plus className="h-4 w-4" />
        <span>Create Dataset</span>
      </Button>

      <Button
        variant="outline"
        className="flex items-center space-x-2"
        onClick={onImportDataset}
      >
        <Upload className="h-4 w-4" />
        <span>Import</span>
      </Button>
    </div>
  );
}

export { DatasetActionButtons };
