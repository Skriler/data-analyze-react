import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  DEFAULT_VALUES,
  ANALYSIS_TYPE_DEFAULTS,
  analysisSchema,
  type AnalysisType,
  type FormData,
} from '@shared/analysis';
import { useToast } from '@hooks/toast/useToast';
import {
  useSimilarityAnalysis,
  useKMeansClustering,
  useDBSCANClustering,
  useAgglomerativeClustering,
} from '@hooks/api/useAnalysis';
import type { ParameterSettingsDto } from '@api-types/analysis';
import type { DatasetDto } from '@api-types/dataset';

interface UseAnalysisFormProps {
  dataset: DatasetDto;
  initialParameterSettings: ParameterSettingsDto[];
  initialType?: AnalysisType;
  onClose: () => void;
}

export const useAnalysisForm = ({
  dataset,
  initialParameterSettings,
  initialType = DEFAULT_VALUES.type,
  onClose,
}: UseAnalysisFormProps) => {
  const { toast } = useToast();

  // API hooks
  const similarityAnalysis = useSimilarityAnalysis();
  const kmeansAnalysis = useKMeansClustering();
  const dbscanAnalysis = useDBSCANClustering();
  const agglomerativeAnalysis = useAgglomerativeClustering();

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

  const isLoading =
    similarityAnalysis.isPending ||
    kmeansAnalysis.isPending ||
    dbscanAnalysis.isPending ||
    agglomerativeAnalysis.isPending;

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

  const submitAnalysis = async (
    data: FormData,
    parameterSettings: ParameterSettingsDto[]
  ) => {
    try {
      const baseRequest = {
        parameterSettings: parameterSettings.map(setting => ({
          parameterId: setting.parameterId,
          isActive: setting.isActive,
          weight: setting.weight,
        })),
        includeParameters: data.includeParameters,
      };

      switch (data.type) {
        case 'similarity':
          await similarityAnalysis.mutateAsync({
            datasetId: dataset.id,
            request: baseRequest,
          });
          break;

        case 'kmeans':
          if (
            data.numberOfClusters === undefined ||
            data.maxIterations === undefined ||
            data.numericMetric === undefined ||
            data.categoricalMetric === undefined
          ) {
            throw new Error('Missing required fields for K-means analysis');
          }

          await kmeansAnalysis.mutateAsync({
            datasetId: dataset.id,
            request: {
              ...baseRequest,
              numberOfClusters: data.numberOfClusters,
              maxIterations: data.maxIterations,
              numericMetric: data.numericMetric,
              categoricalMetric: data.categoricalMetric,
            },
          });
          break;

        case 'dbscan':
          if (
            data.epsilon === undefined ||
            data.minPoints === undefined ||
            data.numericMetric === undefined ||
            data.categoricalMetric === undefined
          ) {
            throw new Error('Missing required fields for DBSCAN analysis');
          }

          await dbscanAnalysis.mutateAsync({
            datasetId: dataset.id,
            request: {
              ...baseRequest,
              epsilon: data.epsilon,
              minPoints: data.minPoints,
              numericMetric: data.numericMetric,
              categoricalMetric: data.categoricalMetric,
            },
          });
          break;

        case 'agglomerative':
          if (
            data.threshold === undefined ||
            data.numericMetric === undefined ||
            data.categoricalMetric === undefined
          ) {
            throw new Error(
              'Missing required fields for Agglomerative analysis'
            );
          }

          await agglomerativeAnalysis.mutateAsync({
            datasetId: dataset.id,
            request: {
              ...baseRequest,
              threshold: data.threshold,
              numericMetric: data.numericMetric,
              categoricalMetric: data.categoricalMetric,
            },
          });
          break;

        default:
          throw new Error('Unknown analysis type');
      }

      toast({
        title: 'Analysis started',
        description: 'Your analysis is running. Results will appear shortly.',
      });
      onClose();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'An unknown error occurred';

      toast({
        title: 'Analysis failed',
        description: errorMessage,
        variant: 'destructive',
      });
    }
  };

  return {
    form,
    analysisType,
    isLoading,
    updateFormParameterSettings,
    resetToDefaults,
    changeAnalysisType,
    submitAnalysis,
  };
};
