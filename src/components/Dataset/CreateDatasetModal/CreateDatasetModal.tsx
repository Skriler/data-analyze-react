import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@components/Ui/Dialog';
import { Form } from '@components/Ui/Form';
import { Button } from '@components/Ui/Button';
import { useCreateDatasetForm } from '@hooks/features/datasets/useCreateDatasetForm';
import { DatasetNameField } from './DatasetNameField';
import { ParametersSection } from './ParametersSection';
import { DataObjectsTable } from './DataObjectsTable';

interface CreateDatasetModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateDatasetModal({
  open,
  onOpenChange,
}: CreateDatasetModalProps) {
  const {
    form,
    parameters,
    objects,
    isSubmitting,
    addParameter,
    removeParameter,
    updateParameter,
    addObject,
    removeObject,
    updateObject,
    updateObjectValue,
    handleSubmit,
  } = useCreateDatasetForm({
    onSuccess: () => onOpenChange(false),
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Create New Dataset</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6 overflow-y-auto max-h-[60vh] pr-2"
          >
            <DatasetNameField control={form.control} />

            <ParametersSection
              parameters={parameters}
              onAddParameter={addParameter}
              onRemoveParameter={removeParameter}
              onUpdateParameter={updateParameter}
            />

            <DataObjectsTable
              parameters={parameters}
              objects={objects}
              onAddObject={addObject}
              onRemoveObject={removeObject}
              onUpdateObject={updateObject}
              onUpdateObjectValue={updateObjectValue}
            />
          </form>
        </Form>

        <div className="flex items-center justify-end space-x-4 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={form.handleSubmit(handleSubmit)}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating...' : 'Create Dataset'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
