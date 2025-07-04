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

export const getActiveParameterSettings = (
  settings: ParameterSettingsDto[]
): ParameterSettingsDto[] => {
  return settings.filter(s => s.isActive);
};

export const updateParameterSetting = (
  settings: ParameterSettingsDto[],
  parameterId: number,
  updates: Partial<Pick<ParameterSettingsDto, 'isActive' | 'weight'>>
): ParameterSettingsDto[] => {
  return settings.map(setting =>
    setting.parameterId === parameterId ? { ...setting, ...updates } : setting
  );
};

export const toggleParameterActive = (
  settings: ParameterSettingsDto[],
  parameterId: number
): ParameterSettingsDto[] => {
  return settings.map(setting =>
    setting.parameterId === parameterId
      ? { ...setting, isActive: !setting.isActive }
      : setting
  );
};

export const setParameterWeight = (
  settings: ParameterSettingsDto[],
  parameterId: number,
  weight: number
): ParameterSettingsDto[] => {
  return settings.map(setting =>
    setting.parameterId === parameterId
      ? { ...setting, weight: Math.max(0, weight) }
      : setting
  );
};

export const resetParameterWeights = (
  settings: ParameterSettingsDto[],
  defaultWeight: number = 1
): ParameterSettingsDto[] => {
  return settings.map(setting => ({
    ...setting,
    weight: defaultWeight,
  }));
};
