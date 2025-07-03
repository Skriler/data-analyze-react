import type { FormData } from '@shared/schemas/analysis';
import type { ParameterSettingsDto } from '@api-types/analysis';

export const getAnalysisTypeDisplayName = (type: FormData['type']): string => {
  const displayNames = {
    similarity: 'Similarity Analysis',
    kmeans: 'K-Means Clustering',
    dbscan: 'DBSCAN Clustering',
    agglomerative: 'Agglomerative Clustering',
  };
  return displayNames[type] || type;
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

  return {
    isValid: errors.length === 0,
    errors,
  };
};
