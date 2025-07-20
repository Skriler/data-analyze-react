import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateDataset } from '@hooks/api/useDatasets';
import { useToast } from '@hooks/toast';
import {
  createDatasetSchema,
  type CreateDatasetFormData,
} from '@shared/dataset';
import type { DatasetCreateDto, DataObjectCreateDto } from '@api-types/dataset';
import { ApiError } from '@api/types';

interface UseCreateDatasetModalProps {
  onSuccess: () => void;
}

export const useCreateDatasetModal = ({
  onSuccess,
}: UseCreateDatasetModalProps) => {
  const [parameters, setParameters] = useState<string[]>(['']);
  const [objects, setObjects] = useState<DataObjectCreateDto[]>([
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

  const syncParametersWithForm = (newParams: string[]) => {
    form.setValue('parameters', newParams);
  };

  const syncObjectsWithForm = (newObjects: DataObjectCreateDto[]) => {
    form.setValue('objects', newObjects);
  };

  const syncAllWithForm = (
    newParams: string[],
    newObjects: DataObjectCreateDto[]
  ) => {
    form.setValue('parameters', newParams);
    form.setValue('objects', newObjects);
  };

  const addParameter = () => {
    const newParams = [...parameters, ''];
    setParameters(newParams);

    const newObjects = objects.map(obj => ({
      ...obj,
      values: [...obj.values, ''],
    }));
    setObjects(newObjects);

    syncAllWithForm(newParams, newObjects);
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

    syncAllWithForm(newParams, newObjects);
  };

  const updateParameter = (index: number, value: string) => {
    const newParams = [...parameters];
    newParams[index] = value;
    setParameters(newParams);

    syncParametersWithForm(newParams);
  };

  const addObject = () => {
    const newObjects = [
      ...objects,
      { name: '', values: new Array(parameters.length).fill('') },
    ];
    setObjects(newObjects);

    syncObjectsWithForm(newObjects);
  };

  const removeObject = (index: number) => {
    if (objects.length <= 1) return;

    const newObjects = objects.filter((_, i) => i !== index);
    setObjects(newObjects);

    syncObjectsWithForm(newObjects);
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

    syncObjectsWithForm(newObjects);
  };

  const updateObjectValue = (
    objIndex: number,
    valueIndex: number,
    value: string
  ) => {
    const newObjects = [...objects];
    newObjects[objIndex].values[valueIndex] = value;
    setObjects(newObjects);

    syncObjectsWithForm(newObjects);
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
    } catch (error: any) {
      let errorMessage = 'An error occurred while creating the dataset.';

      if (error instanceof ApiError && error.data?.errors) {
        const errors = error.data.errors;
        if (Array.isArray(errors) && errors.length > 0) {
          errorMessage = errors.join(', ');
        }
      }

      toast({
        title: 'Creation failed',
        description: errorMessage,
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
