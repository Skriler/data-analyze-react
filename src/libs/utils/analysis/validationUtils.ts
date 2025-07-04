import { VALIDATION_LIMITS, type FormData } from '@shared/analysis';
import type { ParameterSettingsDto } from '@api-types/analysis';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export const validateClusters = (value: number): ValidationResult => {
  const errors: string[] = [];

  if (value < VALIDATION_LIMITS.clusters.min) {
    errors.push(
      `Number of clusters must be at least ${VALIDATION_LIMITS.clusters.min}`
    );
  }

  if (value > VALIDATION_LIMITS.clusters.max) {
    errors.push(
      `Number of clusters must be at most ${VALIDATION_LIMITS.clusters.max}`
    );
  }

  return { isValid: errors.length === 0, errors };
};

export const validateIterations = (value: number): ValidationResult => {
  const errors: string[] = [];

  if (value < VALIDATION_LIMITS.iterations.min) {
    errors.push(
      `Max iterations must be at least ${VALIDATION_LIMITS.iterations.min}`
    );
  }

  if (value > VALIDATION_LIMITS.iterations.max) {
    errors.push(
      `Max iterations must be at most ${VALIDATION_LIMITS.iterations.max}`
    );
  }

  return { isValid: errors.length === 0, errors };
};

export const validateEpsilon = (value: number): ValidationResult => {
  const errors: string[] = [];

  if (value < VALIDATION_LIMITS.epsilon.min) {
    errors.push(`Epsilon must be at least ${VALIDATION_LIMITS.epsilon.min}`);
  }

  if (value > VALIDATION_LIMITS.epsilon.max) {
    errors.push(`Epsilon must be at most ${VALIDATION_LIMITS.epsilon.max}`);
  }

  return { isValid: errors.length === 0, errors };
};

export const validateMinPoints = (value: number): ValidationResult => {
  const errors: string[] = [];

  if (value < VALIDATION_LIMITS.minPoints.min) {
    errors.push(
      `Min points must be at least ${VALIDATION_LIMITS.minPoints.min}`
    );
  }

  if (value > VALIDATION_LIMITS.minPoints.max) {
    errors.push(
      `Min points must be at most ${VALIDATION_LIMITS.minPoints.max}`
    );
  }

  return { isValid: errors.length === 0, errors };
};

export const validateThreshold = (value: number): ValidationResult => {
  const errors: string[] = [];

  if (value < VALIDATION_LIMITS.threshold.min) {
    errors.push(
      `Threshold must be at least ${VALIDATION_LIMITS.threshold.min}`
    );
  }

  if (value > VALIDATION_LIMITS.threshold.max) {
    errors.push(`Threshold must be at most ${VALIDATION_LIMITS.threshold.max}`);
  }

  return { isValid: errors.length === 0, errors };
};

export const validateParameterWeight = (value: number): ValidationResult => {
  const errors: string[] = [];

  if (value < 0) {
    errors.push('Parameter weight cannot be negative');
  }

  if (value > 100) {
    errors.push('Parameter weight cannot exceed 100');
  }

  return { isValid: errors.length === 0, errors };
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
  switch (formData.type) {
    case 'kmeans':
      if (formData.numberOfClusters !== undefined) {
        const clusterValidation = validateClusters(formData.numberOfClusters);
        errors.push(...clusterValidation.errors);
      }
      if (formData.maxIterations !== undefined) {
        const iterationValidation = validateIterations(formData.maxIterations);
        errors.push(...iterationValidation.errors);
      }
      break;

    case 'dbscan':
      if (formData.epsilon !== undefined) {
        const epsilonValidation = validateEpsilon(formData.epsilon);
        errors.push(...epsilonValidation.errors);
      }
      if (formData.minPoints !== undefined) {
        const minPointsValidation = validateMinPoints(formData.minPoints);
        errors.push(...minPointsValidation.errors);
      }
      break;

    case 'agglomerative':
      if (formData.threshold !== undefined) {
        const thresholdValidation = validateThreshold(formData.threshold);
        errors.push(...thresholdValidation.errors);
      }
      break;
  }

  return { isValid: errors.length === 0, errors };
};

export const isValidNumberInput = (value: string): boolean => {
  const num = parseFloat(value);
  return !isNaN(num) && isFinite(num);
};

export const clampToRange = (
  value: number,
  min: number,
  max: number
): number => {
  return Math.max(min, Math.min(max, value));
};
