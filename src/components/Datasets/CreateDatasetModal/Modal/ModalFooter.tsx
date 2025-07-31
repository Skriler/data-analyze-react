import type { UseFormReturn } from 'react-hook-form';
import { Plus } from 'lucide-react';
import { Button } from '@components/Ui/Button';
import type { DataObjectCreateDto } from '@api-types/dataset';
import type { CreateDatasetFormData } from '@shared/dataset';

interface ModalFooterProps {
  form: UseFormReturn<CreateDatasetFormData>;
  isSubmitting: boolean;
  handleSubmit: (data: CreateDatasetFormData) => void;
  parameters: string[];
  objects: DataObjectCreateDto[];
  onCancel: () => void;
}

const ModalFooter: React.FC<ModalFooterProps> = ({
  form,
  isSubmitting,
  handleSubmit,
  parameters,
  objects,
  onCancel,
}) => (
  <div className="flex items-center justify-between pt-6 border-t border-slate-200/60 bg-white/80 backdrop-blur-sm">
    <div className="flex items-center gap-4">
      <div className="text-sm text-slate-600 bg-slate-100 px-3 py-2 rounded-lg">
        <span className="font-medium">{parameters.length}</span> parameters
      </div>
      <div className="text-sm text-slate-600 bg-slate-100 px-3 py-2 rounded-lg">
        <span className="font-medium">{objects.length}</span> objects
      </div>
    </div>
    <div className="flex items-center gap-3">
      <Button
        variant="outline"
        onClick={onCancel}
        className="px-6 py-2.5 border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition-all duration-200"
      >
        Cancel
      </Button>
      <Button
        onClick={form.handleSubmit(handleSubmit)}
        disabled={isSubmitting}
        className="px-8 py-2.5 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        {isSubmitting ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
            Creating Dataset...
          </>
        ) : (
          <>
            <Plus className="h-4 w-4 mr-2" />
            Create Dataset
          </>
        )}
      </Button>
    </div>
  </div>
);

export { ModalFooter };
