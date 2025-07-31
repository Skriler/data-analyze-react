import { Plus, Upload } from 'lucide-react';
import { Button } from '@components/Ui/Button';

interface DatasetActionButtonsProps {
  onCreateDataset: () => void;
  onImportDataset: () => void;
}

const DatasetActionButtons: React.FC<DatasetActionButtonsProps> = ({
  onCreateDataset,
  onImportDataset,
}) => (
  <div className="flex items-center space-x-3">
    <Button
      onClick={onCreateDataset}
      className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
    >
      <Plus className="h-4 w-4" />
      <span>Create Dataset</span>
    </Button>

    <Button
      variant="outline"
      className="flex items-center space-x-2 bg-white border-gray-200 text-gray-700 hover:bg-gray-50 shadow-sm"
      onClick={onImportDataset}
    >
      <Upload className="h-4 w-4" />
      <span>Import</span>
    </Button>
  </div>
);

export { DatasetActionButtons };
