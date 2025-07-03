import { useState, useCallback } from 'react';
import type { DatasetDto } from '@api-types/dataset';
import type { ParameterSettingsDto } from '@api-types/analysis';

export const useParameterSettings = (dataset: DatasetDto) => {
  const [parameterSettings, setParameterSettings] = useState<
    ParameterSettingsDto[]
  >(
    dataset.parameters.map(param => ({
      parameterId: param.id,
      isActive: true,
      weight: 1,
    }))
  );

  const updateParameterSetting = useCallback(
    (
      parameterId: number,
      field: 'isActive' | 'weight',
      value: boolean | number
    ) => {
      setParameterSettings(prev =>
        prev.map(setting =>
          setting.parameterId === parameterId
            ? { ...setting, [field]: value }
            : setting
        )
      );
    },
    []
  );

  const getActiveParameters = useCallback(() => {
    return parameterSettings.filter(setting => setting.isActive);
  }, [parameterSettings]);

  const getTotalWeight = useCallback(() => {
    return parameterSettings
      .filter(setting => setting.isActive)
      .reduce((sum, setting) => sum + setting.weight, 0);
  }, [parameterSettings]);

  return {
    parameterSettings,
    updateParameterSetting,
    getActiveParameters,
    getTotalWeight,
  };
};
