import { Form } from '@components/Ui/Form';
import { useCreateDatasetForm } from '@hooks/datasets/useCreateDatasetForm';
import { DatasetNameField } from './DatasetNameField';
import { ParametersSection } from './ParametersSection';
import { DataObjectsTable } from './DataObjectsTable';

interface CreateDatasetFormProps {
  onSuccess: () => void;
  onSubmit: () => void;
}

function CreateDatasetForm({ onSuccess, onSubmit }: CreateDatasetFormProps) {
  const {
    form,
    parameters,
    objects,
    addParameter,
    removeParameter,
    updateParameter,
    addObject,
    removeObject,
    updateObject,
    updateObjectValue,
    handleSubmit,
  } = useCreateDatasetForm({ onSuccess });

  const onFormSubmit = async (data: any) => {
    await handleSubmit(data);
    onSubmit();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onFormSubmit)}
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
  );
}

export { CreateDatasetForm };
