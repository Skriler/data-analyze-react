import {
  ALGORITHM_CONFIGS,
  CLUSTERING_TYPES,
  type AlgorithmConfig,
  type ClusteringType,
  type AnalysisType,
} from '@shared/analysis';

export const getAlgorithmConfig = (
  analysisType: ClusteringType
): AlgorithmConfig | undefined => {
  return ALGORITHM_CONFIGS.find(config => config.id === analysisType);
};

export const getAlgorithmSettings = (analysisType: ClusteringType) => {
  return getAlgorithmConfig(analysisType)?.settings || [];
};

export const hasAlgorithmSettings = (
  analysisType: string
): analysisType is ClusteringType => {
  return ALGORITHM_CONFIGS.some(config => config.id === analysisType);
};

export const isClusteringAnalysis = (
  type: AnalysisType
): type is ClusteringType => {
  return CLUSTERING_TYPES.includes(type as ClusteringType);
};

export const getDefaultValuesForAlgorithm = (
  analysisType: ClusteringType
): Record<string, number> => {
  const config = getAlgorithmConfig(analysisType);
  if (!config) return {};

  return config.settings.reduce(
    (acc, setting) => {
      acc[setting.name] = setting.defaultValue;
      return acc;
    },
    {} as Record<string, number>
  );
};

export const resetAlgorithmSettingsToDefaults = (
  analysisType: ClusteringType,
  currentValues: Record<string, any>
): Record<string, any> => {
  const defaults = getDefaultValuesForAlgorithm(analysisType);
  return {
    ...currentValues,
    ...defaults,
  };
};

export const validateAlgorithmSettings = (
  analysisType: ClusteringType,
  settings: Record<string, number>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  const config = getAlgorithmConfig(analysisType);

  if (!config) {
    errors.push('Invalid analysis type');
    return { isValid: false, errors };
  }

  config.settings.forEach(setting => {
    const value = settings[setting.name];

    if (value === undefined || value === null) {
      errors.push(`${setting.label} is required`);
      return;
    }

    if (setting.min !== undefined && value < setting.min) {
      errors.push(`${setting.label} must be at least ${setting.min}`);
    }

    if (setting.max !== undefined && value > setting.max) {
      errors.push(`${setting.label} must be at most ${setting.max}`);
    }
  });

  return { isValid: errors.length === 0, errors };
};
