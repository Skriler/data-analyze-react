import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateDataset } from '@hooks/api/useDatasets';
import { useToast } from '@hooks/toast/useToast';
import {
  createDatasetSchema,
  type CreateDatasetFormData,
} from '@shared/dataset';
import type { DatasetCreateDto } from '@api-types/dataset';

interface UseCreateDatasetFormProps {
  onSuccess: () => void;
}

export const useCreateDatasetForm = ({
  onSuccess,
}: UseCreateDatasetFormProps) => {
  const [parameters, setParameters] = useState<string[]>(['']);
  const [objects, setObjects] = useState<{ name: string; values: string[] }[]>([
    { name: '', values: [''] },
  ]);

  const createDataset = useCreateDataset();
  const { toast } = useToast();

  const form = useForm<CreateDatasetFormData>({
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

  const resetForm = () => {
    setParameters(['']);
    setObjects([{ name: '', values: [''] }]);
    form.reset();
  };

  const handleSubmit = async (data: CreateDatasetFormData) => {
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
      onSuccess();
      resetForm();
    } catch (error) {
      toast({
        title: 'Creation failed',
        description: 'An error occurred while creating the dataset.',
        variant: 'destructive',
      });
    }
  };

  return {
    form,
    parameters,
    objects,
    isSubmitting: createDataset.isPending,
    addParameter,
    removeParameter,
    updateParameter,
    addObject,
    removeObject,
    updateObject,
    updateObjectValue,
    handleSubmit,
    resetForm,
  };
};
