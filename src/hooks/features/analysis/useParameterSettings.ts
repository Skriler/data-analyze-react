import { useState, useCallback } from 'react';
import {
  createInitialParameterSettings,
  updateParameterSetting,
  getActiveParameterSettings,
  normalizeWeights,
  resetParameterWeights,
} from '@libs/utils/analysis/parameterUtils';
import type { DatasetDto } from '@api-types/dataset';
import type { ParameterSettingsDto } from '@api-types/analysis';

export const useParameterSettings = (dataset: DatasetDto) => {
  const [parameterSettings, setParameterSettings] = useState<
    ParameterSettingsDto[]
  >(() => createInitialParameterSettings(dataset));

  const updateSetting = useCallback(
    (
      parameterId: number,
      field: 'isActive' | 'weight',
      value: boolean | number
    ) => {
      setParameterSettings(prev =>
        updateParameterSetting(prev, parameterId, { [field]: value })
      );
    },
    []
  );

  const getActiveParameters = useCallback(() => {
    return getActiveParameterSettings(parameterSettings);
  }, [parameterSettings]);

  const getTotalWeight = useCallback(() => {
    return getActiveParameterSettings(parameterSettings).reduce(
      (sum, setting) => sum + setting.weight,
      0
    );
  }, [parameterSettings]);

  const normalizeParameterWeights = useCallback(() => {
    setParameterSettings(prev => normalizeWeights(prev));
  }, []);

  const resetWeights = useCallback((defaultWeight: number = 1) => {
    setParameterSettings(prev => resetParameterWeights(prev, defaultWeight));
  }, []);

  return {
    parameterSettings,
    updateSetting,
    getActiveParameters,
    getTotalWeight,
    normalizeParameterWeights,
    resetWeights,
  };
};
