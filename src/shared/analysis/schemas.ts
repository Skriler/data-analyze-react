import { z } from 'zod';
import {
  ANALYSIS_TYPES,
  NUMERIC_METRICS,
  CATEGORICAL_METRICS,
  VALIDATION_LIMITS,
} from './constants';

const parameterSettingSchema = z.object({
  parameterId: z.number(),
  isActive: z.boolean(),
  weight: z.number(),
});

const baseAnalysisSchema = z.object({
  type: z.enum(ANALYSIS_TYPES),
  includeParameters: z.boolean(),
  parameterSettings: z.array(parameterSettingSchema),
});

const similaritySchema = z.object({
  type: z.literal('similarity'),
});

const kmeansSchema = z.object({
  type: z.literal('kmeans'),
  numberOfClusters: z
    .number()
    .min(VALIDATION_LIMITS.clusters.min)
    .max(VALIDATION_LIMITS.clusters.max),
  maxIterations: z
    .number()
    .min(VALIDATION_LIMITS.iterations.min)
    .max(VALIDATION_LIMITS.iterations.max),
  numericMetric: z.enum(NUMERIC_METRICS),
  categoricalMetric: z.enum(CATEGORICAL_METRICS),
});

const dbscanSchema = z.object({
  type: z.literal('dbscan'),
  epsilon: z
    .number()
    .min(VALIDATION_LIMITS.epsilon.min)
    .max(VALIDATION_LIMITS.epsilon.max),
  minPoints: z
    .number()
    .min(VALIDATION_LIMITS.minPoints.min)
    .max(VALIDATION_LIMITS.minPoints.max),
  numericMetric: z.enum(NUMERIC_METRICS),
  categoricalMetric: z.enum(CATEGORICAL_METRICS),
});

const agglomerativeSchema = z.object({
  type: z.literal('agglomerative'),
  threshold: z
    .number()
    .min(VALIDATION_LIMITS.threshold.min)
    .max(VALIDATION_LIMITS.threshold.max),
  numericMetric: z.enum(NUMERIC_METRICS),
  categoricalMetric: z.enum(CATEGORICAL_METRICS),
});

export const analysisSchema = baseAnalysisSchema.and(
  z.discriminatedUnion('type', [
    similaritySchema,
    kmeansSchema,
    dbscanSchema,
    agglomerativeSchema,
  ])
);

export type FormData = z.infer<typeof analysisSchema>;
