import { Plus } from 'lucide-react';
import { Button } from '@components/Ui/Button';

interface AddObjectButtonProps {
  onAddObject: () => void;
  parametersCount: number;
}

const AddObjectButton: React.FC<AddObjectButtonProps> = ({
  onAddObject,
  parametersCount,
}) => (
  <div className="space-y-4">
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={onAddObject}
      disabled={parametersCount === 0}
      className="w-full flex items-center justify-center gap-3 py-4 border-2 border-dashed border-slate-300 hover:border-green-400 hover:bg-green-50 hover:text-green-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl text-sm font-medium group"
    >
      <div className="p-1 rounded-full bg-green-100 group-hover:bg-green-200 transition-colors duration-200 group-disabled:bg-slate-100">
        <Plus className="h-4 w-4 text-green-600 group-disabled:text-slate-400" />
      </div>
      <span>Add Object</span>
    </Button>

    {parametersCount === 0 && (
      <p className="text-sm text-slate-500 text-center bg-slate-50 p-3 rounded-lg">
        Add parameters first before creating objects
      </p>
    )}
  </div>
);

export { AddObjectButton };
