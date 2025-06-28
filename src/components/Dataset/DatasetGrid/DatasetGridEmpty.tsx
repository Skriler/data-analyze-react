import { Plus } from 'lucide-react';
import { Button } from '@components/Ui/Button';

interface DatasetGridEmptyProps {
  onCreateDataset: () => void;
}

function DatasetGridEmpty({ onCreateDataset }: DatasetGridEmptyProps) {
  return (
    <div className="text-center py-16">
      <div className="mx-auto w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
        <div className="text-4xl">📊</div>
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-3">
        No datasets found
      </h3>
      <p className="text-gray-500 mb-8 max-w-md mx-auto">
        Get started by creating your first dataset. Add your data and start
        analyzing patterns.
      </p>
      <Button onClick={onCreateDataset} className="flex items-center space-x-2">
        <Plus className="h-4 w-4" />
        <span>Create Dataset</span>
      </Button>
    </div>
  );
}

export { DatasetGridEmpty };
