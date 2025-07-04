import { useState, useCallback } from 'react';
import type { DatasetDto } from '@api-types/dataset';
import type { ParameterSettingsDto } from '@api-types/analysis';
import {
  createInitialParameterSettings,
  updateParameterSetting,
  getActiveParameterSettings,
} from '@libs/utils/analysis/parameterUtils';

export const useParameterSettings = (dataset: DatasetDto) => {
  const [parameterSettings, setParameterSettings] = useState<
    ParameterSettingsDto[]
  >(
    () => createInitialParameterSettings(dataset) // Используем утилиту
  );

  const updateSetting = useCallback(
    (
      parameterId: number,
      field: 'isActive' | 'weight',
      value: boolean | number
    ) => {
      setParameterSettings(
        prev => updateParameterSetting(prev, parameterId, { [field]: value }) // Используем утилиту
      );
    },
    []
  );

  const getActiveParameters = useCallback(() => {
    return getActiveParameterSettings(parameterSettings); // Используем утилиту
  }, [parameterSettings]);

  const getTotalWeight = useCallback(() => {
    return getActiveParameterSettings(parameterSettings).reduce(
      (sum, setting) => sum + setting.weight,
      0
    );
  }, [parameterSettings]);

  return {
    parameterSettings,
    updateSetting,
    getActiveParameters,
    getTotalWeight,
  };
};
