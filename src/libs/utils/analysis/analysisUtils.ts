import type { ParameterSettingsDto } from '@api-types/analysis';
import {
  VALIDATION_LIMITS,
  type FormData,
  type ValidationResult,
} from '@shared/analysis';

const ANALYSIS_TYPE_DISPLAY_NAMES = {
  similarity: 'Similarity Analysis',
  kmeans: 'K-Means Clustering',
  dbscan: 'DBSCAN Clustering',
  agglomerative: 'Agglomerative Clustering',
} as const;

export const getAnalysisTypeDisplayName = (type: FormData['type']): string => {
  return ANALYSIS_TYPE_DISPLAY_NAMES[type] || type;
};

const validateNumericField = (
  value: number | undefined,
  min: number,
  max: number,
  fieldName: string
): string[] => {
  if (value === undefined) return [];

  const errors: string[] = [];
  if (value < min) {
    errors.push(`${fieldName} must be at least ${min}`);
  }
  if (value > max) {
    errors.push(`${fieldName} must be at most ${max}`);
  }
  return errors;
};

const validateAlgorithmSettings = (formData: FormData): string[] => {
  const errors: string[] = [];

  switch (formData.type) {
    case 'kmeans':
      errors.push(
        ...validateNumericField(
          formData.numberOfClusters,
          VALIDATION_LIMITS.clusters.min,
          VALIDATION_LIMITS.clusters.max,
          'Number of clusters'
        )
      );
      errors.push(
        ...validateNumericField(
          formData.maxIterations,
          VALIDATION_LIMITS.iterations.min,
          VALIDATION_LIMITS.iterations.max,
          'Max iterations'
        )
      );
      break;

    case 'dbscan':
      errors.push(
        ...validateNumericField(
          formData.epsilon,
          VALIDATION_LIMITS.epsilon.min,
          VALIDATION_LIMITS.epsilon.max,
          'Epsilon'
        )
      );
      errors.push(
        ...validateNumericField(
          formData.minPoints,
          VALIDATION_LIMITS.minPoints.min,
          VALIDATION_LIMITS.minPoints.max,
          'Min points'
        )
      );
      break;

    case 'agglomerative':
      errors.push(
        ...validateNumericField(
          formData.threshold,
          VALIDATION_LIMITS.threshold.min,
          VALIDATION_LIMITS.threshold.max,
          'Threshold'
        )
      );
      break;
  }

  return errors;
};

export const validateFormData = (
  formData: FormData,
  parameterSettings: ParameterSettingsDto[]
): ValidationResult => {
  const errors: string[] = [];

  // Validate parameter settings
  const activeParameters = parameterSettings.filter(p => p.isActive);
  if (activeParameters.length === 0) {
    errors.push('At least one parameter must be active');
  }

  // Validate weights
  const invalidWeights = activeParameters.filter(p => p.weight <= 0);
  if (invalidWeights.length > 0) {
    errors.push('All active parameters must have positive weights');
  }

  // Validate algorithm-specific settings
  errors.push(...validateAlgorithmSettings(formData));

  return { isValid: errors.length === 0, errors };
};
