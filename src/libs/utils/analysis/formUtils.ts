import {
  ANALYSIS_TYPE_DEFAULTS,
  type FormData,
  type AnalysisType,
  type AnalysisFormData,
  type FormFieldError,
} from '@shared/analysis';
import type { ParameterSettingsDto } from '@api-types/analysis';
import { validateFormData } from './validationUtils';

export const createInitialFormData = (
  type: AnalysisType,
  parameterSettings: ParameterSettingsDto[]
): AnalysisFormData => {
  const defaults = ANALYSIS_TYPE_DEFAULTS[type];

  return {
    type,
    includeParameters: defaults.includeParameters,
    parameterSettings,
    numericMetric:
      'numericMetric' in defaults ? defaults.numericMetric : 'Euclidean',
    categoricalMetric:
      'categoricalMetric' in defaults ? defaults.categoricalMetric : 'Hamming',
    ...(defaults.type === 'kmeans' && {
      numberOfClusters: defaults.numberOfClusters,
      maxIterations: defaults.maxIterations,
    }),
    ...(defaults.type === 'dbscan' && {
      epsilon: defaults.epsilon,
      minPoints: defaults.minPoints,
    }),
    ...(defaults.type === 'agglomerative' && {
      threshold: defaults.threshold,
    }),
  };
};

export const convertFormDataToSchema = (
  formData: AnalysisFormData
): FormData => {
  const base = {
    type: formData.type,
    includeParameters: formData.includeParameters,
    parameterSettings: formData.parameterSettings,
  };

  switch (formData.type) {
    case 'similarity':
      return {
        ...base,
        type: 'similarity',
      };
    case 'kmeans':
      return {
        ...base,
        type: 'kmeans',
        numberOfClusters: formData.numberOfClusters!,
        maxIterations: formData.maxIterations!,
        numericMetric: formData.numericMetric,
        categoricalMetric: formData.categoricalMetric,
      };
    case 'dbscan':
      return {
        ...base,
        type: 'dbscan',
        epsilon: formData.epsilon!,
        minPoints: formData.minPoints!,
        numericMetric: formData.numericMetric,
        categoricalMetric: formData.categoricalMetric,
      };
    case 'agglomerative':
      return {
        ...base,
        type: 'agglomerative',
        threshold: formData.threshold!,
        numericMetric: formData.numericMetric,
        categoricalMetric: formData.categoricalMetric,
      };
    default:
      throw new Error(`Unsupported analysis type: ${formData.type}`);
  }
};

export const validateForm = (
  formData: AnalysisFormData
): { isValid: boolean; errors: FormFieldError[] } => {
  const schemaData = convertFormDataToSchema(formData);
  const validation = validateFormData(schemaData, formData.parameterSettings);

  const errors: FormFieldError[] = validation.errors.map((error, index) => ({
    field: `form_${index}`,
    message: error,
  }));

  return { isValid: validation.isValid, errors };
};
