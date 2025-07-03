import type { DatasetDto } from '@api-types/dataset';
import type { ParameterSettingsDto } from '@api-types/analysis';

export const createInitialParameterSettings = (
  dataset: DatasetDto
): ParameterSettingsDto[] => {
  return dataset.parameters.map(param => ({
    parameterId: param.id,
    isActive: true,
    weight: 1,
  }));
};

export const validateParameterSettings = (
  settings: ParameterSettingsDto[]
): boolean => {
  const activeSettings = settings.filter(s => s.isActive);
  return activeSettings.length > 0 && activeSettings.every(s => s.weight > 0);
};

export const normalizeWeights = (
  settings: ParameterSettingsDto[]
): ParameterSettingsDto[] => {
  const activeSettings = settings.filter(s => s.isActive);
  const totalWeight = activeSettings.reduce((sum, s) => sum + s.weight, 0);

  if (totalWeight === 0) return settings;

  return settings.map(setting => ({
    ...setting,
    weight: setting.isActive ? setting.weight / totalWeight : setting.weight,
  }));
};
