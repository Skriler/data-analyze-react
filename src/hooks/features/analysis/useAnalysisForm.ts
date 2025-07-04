import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { analysisSchema, type FormData } from '@shared/analysis';
import {
  DEFAULT_VALUES,
  ANALYSIS_TYPE_DEFAULTS,
  type AnalysisType,
} from '@shared/analysis/constants';
import type { ParameterSettingsDto } from '@api-types/analysis';

interface UseAnalysisFormProps {
  initialParameterSettings: ParameterSettingsDto[];
  initialType?: AnalysisType;
}

export const useAnalysisForm = ({
  initialParameterSettings,
  initialType = DEFAULT_VALUES.type,
}: UseAnalysisFormProps) => {
  const getDefaultValues = (type: AnalysisType) => {
    const baseDefaults = ANALYSIS_TYPE_DEFAULTS[type];

    return {
      ...baseDefaults,
      parameterSettings: initialParameterSettings,
    };
  };

  const form = useForm<FormData>({
    resolver: zodResolver(analysisSchema),
    defaultValues: getDefaultValues(initialType),
  });

  const analysisType = form.watch('type') as FormData['type'];

  const updateFormParameterSettings = (
    parameterSettings: ParameterSettingsDto[]
  ) => {
    form.setValue('parameterSettings', parameterSettings);
  };

  const resetToDefaults = (type?: AnalysisType) => {
    const targetType = type || analysisType;
    const defaultValues = getDefaultValues(targetType);

    form.reset(defaultValues);
  };

  const changeAnalysisType = (newType: AnalysisType) => {
    const currentValues = form.getValues();
    const newDefaults = getDefaultValues(newType);

    const mergedValues = {
      ...newDefaults,
      includeParameters: currentValues.includeParameters,
      parameterSettings: currentValues.parameterSettings,
    };

    form.reset(mergedValues);
  };

  const getCurrentDefaults = () => {
    return ANALYSIS_TYPE_DEFAULTS[analysisType];
  };

  return {
    form,
    analysisType,
    updateFormParameterSettings,
    resetToDefaults,
    changeAnalysisType,
    getCurrentDefaults,
  };
};
