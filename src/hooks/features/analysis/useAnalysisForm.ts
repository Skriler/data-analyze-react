import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { analysisSchema, type FormData } from '@shared/schemas/analysis';
import type { ParameterSettingsDto } from '@api-types/analysis';

export const useAnalysisForm = (
  initialParameterSettings: ParameterSettingsDto[]
) => {
  const form = useForm({
    resolver: zodResolver(analysisSchema),
    defaultValues: {
      type: 'similarity' as const,
      includeParameters: true,
      parameterSettings: initialParameterSettings,
      numberOfClusters: 3,
      maxIterations: 300,
      epsilon: 0.5,
      minPoints: 5,
      threshold: 1.5,
      numericMetric: 'Euclidean' as const,
      categoricalMetric: 'Hamming' as const,
    },
  });

  const analysisType = form.watch('type') as FormData['type'];

  const updateFormParameterSettings = (
    parameterSettings: ParameterSettingsDto[]
  ) => {
    form.setValue('parameterSettings', parameterSettings);
  };

  return {
    form,
    analysisType,
    updateFormParameterSettings,
  };
};
