import { z } from 'zod';

export const createDatasetSchema = z.object({
  name: z
    .string()
    .min(3, 'Name must be at least 3 characters')
    .max(50, 'Name must be at most 50 characters'),
  parameters: z
    .array(
      z
        .string()
        .min(3, 'Parameter name must be at least 3 characters')
        .max(50, 'Parameter name must be at most 50 characters')
    )
    .min(1, 'At least one parameter is required'),
  objects: z
    .array(
      z.object({
        name: z
          .string()
          .min(3, 'Object name must be at least 3 characters')
          .max(50, 'Object name must be at most 50 characters'),
        values: z
          .array(z.coerce.string())
          .min(1, 'At least one value is required'),
      })
    )
    .min(1, 'At least one data object is required'),
});

export type CreateDatasetFormData = z.infer<typeof createDatasetSchema>;
