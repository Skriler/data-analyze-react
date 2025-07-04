import { z } from 'zod';

export const createDatasetSchema = z.object({
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

export type CreateDatasetFormData = z.infer<typeof createDatasetSchema>;
