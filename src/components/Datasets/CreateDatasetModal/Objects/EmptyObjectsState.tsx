import { Package, Sparkles } from 'lucide-react';

interface EmptyObjectsStateProps {
  parametersCount: number;
}

const EmptyObjectsState: React.FC<EmptyObjectsStateProps> = ({
  parametersCount,
}) => (
  <div className="text-center py-12 text-slate-500">
    <div className="relative mb-4">
      <Package className="h-12 w-12 mx-auto text-slate-300" />
      <Sparkles className="h-4 w-4 absolute top-0 right-1/2 translate-x-4 text-green-400" />
    </div>
    <p className="text-lg font-medium text-slate-600">No objects added yet</p>
    <p className="text-sm text-slate-400 mt-1">
      {parametersCount === 0
        ? 'Add parameters first, then create objects'
        : 'Start by adding your first object'}
    </p>
  </div>
);

export { EmptyObjectsState };
