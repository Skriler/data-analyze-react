import { datasetsApi } from '@api/endpoints/datasets';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { DatasetCreateDto, DatasetDto } from '@api-types/dataset';
import type { UpdateDatasetMutationVariables } from './types';

const DATASET_QUERY_KEYS = {
  all: ['datasets'] as const,
  byId: (id: number) => ['datasets', 'detail', id] as const,
} as const;

/**
 * Get all datasets.
 */
export const useDatasets = () => {
  return useQuery<DatasetDto[], Error>({
    queryKey: DATASET_QUERY_KEYS.all,
    queryFn: () => datasetsApi.getDatasets(),
  });
};

/**
 * Get single dataset by ID.
 * Disabled if ID <= 0.
 *
 * @param id - Dataset ID.
 */
export const useDataset = (datasetId: number) => {
  return useQuery<DatasetDto, Error>({
    queryKey: DATASET_QUERY_KEYS.byId(datasetId),
    queryFn: () => datasetsApi.getDataset(datasetId),
    enabled: datasetId > 0,
  });
};

/**
 * Create new dataset.
 * Invalidates dataset list cache on success.
 */
export const useCreateDataset = () => {
  const queryClient = useQueryClient();

  return useMutation<DatasetDto, Error, DatasetCreateDto>({
    mutationFn: (dataset: DatasetCreateDto) =>
      datasetsApi.createDataset(dataset),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: DATASET_QUERY_KEYS.all });
    },
  });
};

/**
 * Update dataset by ID.
 * Updates detail cache and invalidates dataset list.
 *
 * @param id - Dataset ID to update.
 */
export const useUpdateDataset = () => {
  const queryClient = useQueryClient();

  return useMutation<DatasetDto, Error, UpdateDatasetMutationVariables>({
    mutationFn: ({ datasetId, dataset }: UpdateDatasetMutationVariables) =>
      datasetsApi.updateDataset(datasetId, dataset),

    onSuccess: (
      updatedDataset: DatasetDto,
      { datasetId }: UpdateDatasetMutationVariables
    ) => {
      queryClient.setQueryData(
        DATASET_QUERY_KEYS.byId(datasetId),
        updatedDataset
      );
      queryClient.invalidateQueries({ queryKey: DATASET_QUERY_KEYS.all });
    },
  });
};

/**
 * Delete dataset by ID.
 * Removes detail cache and invalidates dataset list.
 */
export const useDelete = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: (id: number) => datasetsApi.deleteDataset(id),

    onSuccess: (_, deletedDatasetId: number) => {
      queryClient.removeQueries({
        queryKey: DATASET_QUERY_KEYS.byId(deletedDatasetId),
      });

      queryClient.invalidateQueries({ queryKey: DATASET_QUERY_KEYS.all });
    },
  });
};
