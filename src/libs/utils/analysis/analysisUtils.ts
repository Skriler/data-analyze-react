import type { ParameterSettingsDto } from '@api-types/analysis';
import {
  ANALYSIS_TYPE_CONFIGS,
  ANALYSIS_TYPE_DEFAULTS,
  type FormData,
  type AnalysisType,
  type AnalysisTypeConfig,
} from '@shared/analysis';

export const getAnalysisTypeDisplayName = (type: FormData['type']): string => {
  const displayNames = {
    similarity: 'Similarity Analysis',
    kmeans: 'K-Means Clustering',
    dbscan: 'DBSCAN Clustering',
    agglomerative: 'Agglomerative Clustering',
  };
  return displayNames[type] || type;
};

export const getAnalysisTypeConfig = (
  type: AnalysisType
): AnalysisTypeConfig | undefined => {
  return ANALYSIS_TYPE_CONFIGS.find(config => config.id === type);
};

export const getAnalysisTypeDefaults = (type: AnalysisType) => {
  return ANALYSIS_TYPE_DEFAULTS[type];
};

export const validateAnalysisForm = (
  formData: FormData,
  parameterSettings: ParameterSettingsDto[]
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  const activeParameters = parameterSettings.filter(p => p.isActive);
  if (activeParameters.length === 0) {
    errors.push('At least one parameter must be active');
  }

  if (
    formData.type === 'kmeans' &&
    (formData.numberOfClusters === undefined || formData.numberOfClusters < 2)
  ) {
    errors.push('Number of clusters must be at least 2');
  }

  if (
    formData.type === 'dbscan' &&
    (formData.epsilon === undefined || formData.epsilon <= 0)
  ) {
    errors.push('Epsilon must be greater than 0');
  }

  if (
    formData.type === 'agglomerative' &&
    (formData.threshold === undefined || formData.threshold <= 0)
  ) {
    errors.push('Threshold must be greater than 0');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const createFormDataFromDefaults = (
  type: AnalysisType,
  parameterSettings: ParameterSettingsDto[]
): FormData => {
  const defaults = getAnalysisTypeDefaults(type);

  return {
    ...defaults,
    parameterSettings,
  } as FormData;
};

export const isAnalysisTypeValid = (type: string): type is AnalysisType => {
  return ANALYSIS_TYPE_CONFIGS.some(config => config.id === type);
};
