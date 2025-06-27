import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@components/Ui/Button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@components/Ui/Dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/Ui/Form';
import { Input } from '@components/Ui/Input';
import { useCreateDataset } from '@hooks/api/useDatasets';
import { useToast } from '@hooks/toast/useToast';
import type { DatasetCreateDto } from '@api-types/dataset';

const createDatasetSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters').max(50),
  parameters: z
    .array(z.string().min(3))
    .min(1, 'At least one parameter is required'),
  objects: z
    .array(
      z.object({
        name: z.string().min(3, 'Object name must be at least 3 characters'),
        values: z.array(z.string()),
      })
    )
    .min(1, 'At least one data object is required'),
});

type FormData = z.infer<typeof createDatasetSchema>;

interface CreateDatasetModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateDatasetModal({
  open,
  onOpenChange,
}: CreateDatasetModalProps) {
  const [parameters, setParameters] = useState<string[]>(['']);
  const [objects, setObjects] = useState<{ name: string; values: string[] }[]>([
    { name: '', values: [''] },
  ]);

  const createDataset = useCreateDataset();
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(createDatasetSchema),
    defaultValues: {
      name: '',
      parameters: [''],
      objects: [{ name: '', values: [''] }],
    },
  });

  const addParameter = () => {
    const newParams = [...parameters, ''];
    setParameters(newParams);
    const newObjects = objects.map(obj => ({
      ...obj,
      values: [...obj.values, ''],
    }));
    setObjects(newObjects);
  };

  const removeParameter = (index: number) => {
    if (parameters.length <= 1) return;

    const newParams = parameters.filter((_, i) => i !== index);
    setParameters(newParams);
    const newObjects = objects.map(obj => ({
      ...obj,
      values: obj.values.filter((_, i) => i !== index),
    }));
    setObjects(newObjects);
  };

  const updateParameter = (index: number, value: string) => {
    const newParams = [...parameters];
    newParams[index] = value;
    setParameters(newParams);
  };

  const addObject = () => {
    setObjects([
      ...objects,
      { name: '', values: new Array(parameters.length).fill('') },
    ]);
  };

  const removeObject = (index: number) => {
    if (objects.length <= 1) return;
    setObjects(objects.filter((_, i) => i !== index));
  };

  const updateObject = (
    index: number,
    field: 'name' | 'values',
    value: string | string[]
  ) => {
    const newObjects = [...objects];
    if (field === 'name') {
      newObjects[index].name = value as string;
    } else {
      newObjects[index].values = value as string[];
    }
    setObjects(newObjects);
  };

  const updateObjectValue = (
    objIndex: number,
    valueIndex: number,
    value: string
  ) => {
    const newObjects = [...objects];
    newObjects[objIndex].values[valueIndex] = value;
    setObjects(newObjects);
  };

  const onSubmit = async (data: FormData) => {
    const datasetData: DatasetCreateDto = {
      name: data.name,
      parameters: parameters.filter(p => p.trim()),
      objects: objects
        .filter(obj => obj.name.trim())
        .map(obj => ({
          name: obj.name,
          values: obj.values.filter(v => v.trim()),
        })),
    };

    try {
      await createDataset.mutateAsync(datasetData);
      toast({
        title: 'Dataset created',
        description: `${datasetData.name} has been successfully created.`,
      });
      onOpenChange(false);
      setParameters(['']);
      setObjects([{ name: '', values: [''] }]);
      form.reset();
    } catch (error) {
      toast({
        title: 'Creation failed',
        description: 'An error occurred while creating the dataset.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Create New Dataset</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 overflow-y-auto max-h-[60vh] pr-2"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dataset Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter dataset name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <FormLabel>Parameters</FormLabel>
              <div className="space-y-3 mt-2">
                {parameters.map((param, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Input
                      placeholder="Parameter name"
                      value={param}
                      onChange={e => updateParameter(index, e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeParameter(index)}
                      disabled={parameters.length <= 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addParameter}
                  className="flex items-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Parameter</span>
                </Button>
              </div>
            </div>

            <div>
              <FormLabel>Data Objects</FormLabel>
              <div className="bg-gray-50 rounded-lg p-4 mt-2">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="text-left text-sm font-medium text-gray-700 pb-2">
                          Object Name
                        </th>
                        {parameters.map((param, index) => (
                          <th
                            key={index}
                            className="text-left text-sm font-medium text-gray-700 pb-2 px-2"
                          >
                            {param || `Parameter ${index + 1}`}
                          </th>
                        ))}
                        <th className="w-10"></th>
                      </tr>
                    </thead>
                    <tbody className="space-y-2">
                      {objects.map((obj, objIndex) => (
                        <tr key={objIndex}>
                          <td className="py-2">
                            <Input
                              placeholder="Object name"
                              value={obj.name}
                              onChange={e =>
                                updateObject(objIndex, 'name', e.target.value)
                              }
                              className="text-sm"
                            />
                          </td>
                          {obj.values.map((value, valueIndex) => (
                            <td key={valueIndex} className="py-2 px-2">
                              <Input
                                placeholder="Value"
                                value={value}
                                onChange={e =>
                                  updateObjectValue(
                                    objIndex,
                                    valueIndex,
                                    e.target.value
                                  )
                                }
                                className="text-sm"
                              />
                            </td>
                          ))}
                          <td className="py-2">
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeObject(objIndex)}
                              disabled={objects.length <= 1}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addObject}
                  className="mt-3 flex items-center space-x-2 text-sm"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Object</span>
                </Button>
              </div>
            </div>
          </form>
        </Form>

        <div className="flex items-center justify-end space-x-4 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={form.handleSubmit(onSubmit)}
            disabled={createDataset.isPending}
          >
            {createDataset.isPending ? 'Creating...' : 'Create Dataset'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
