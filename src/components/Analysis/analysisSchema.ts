import { z } from 'zod';

export const analysisSchema = z
  .object({
    type: z.enum(['similarity', 'kmeans', 'dbscan', 'agglomerative']),
    includeParameters: z.boolean().default(true),
    parameterSettings: z.array(
      z.object({
        parameterId: z.number(),
        isActive: z.boolean(),
        weight: z.number(),
      })
    ),

    numberOfClusters: z.number().min(2).max(20).optional(),
    maxIterations: z.number().min(100).max(1000).optional(),
    epsilon: z.number().min(0.1).max(10).optional(),
    minPoints: z.number().min(2).max(100).optional(),
    threshold: z.number().min(0.1).max(10).optional(),
    numericMetric: z.enum(['Euclidean', 'Manhattan', 'Cosine']).optional(),
    categoricalMetric: z.enum(['Hamming', 'Jaccard']).optional(),
  })
  .refine(
    data => {
      switch (data.type) {
        case 'similarity':
          return true;
        case 'kmeans':
          return (
            data.numberOfClusters !== undefined &&
            data.maxIterations !== undefined &&
            data.numericMetric !== undefined &&
            data.categoricalMetric !== undefined
          );
        case 'dbscan':
          return (
            data.epsilon !== undefined &&
            data.minPoints !== undefined &&
            data.numericMetric !== undefined &&
            data.categoricalMetric !== undefined
          );
        case 'agglomerative':
          return (
            data.threshold !== undefined &&
            data.numericMetric !== undefined &&
            data.categoricalMetric !== undefined
          );
        default:
          return false;
      }
    },
    {
      message: 'Required fields missing for selected analysis type',
    }
  );

export type FormData = z.infer<typeof analysisSchema>;
