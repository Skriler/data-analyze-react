import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ANALYSIS_TYPE_DEFAULTS,
  analysisSchema,
  type AnalysisType,
  type FormData,
} from '@shared/analysis';
import { useToast } from '@hooks/toast';
import {
  useSimilarityAnalysis,
  useKMeansClustering,
  useDBSCANClustering,
  useAgglomerativeClustering,
} from '@hooks/api/useAnalysis';
import type { ParameterSettingsDto } from '@api-types/analysis';
import type { DatasetDto } from '@api-types/dataset';
import { CATEGORICAL_METRIC_MAP, NUMERIC_METRIC_MAP } from '@shared/analysis';

interface UseAnalysisModalProps {
  dataset: DatasetDto;
  initialParameterSettings: ParameterSettingsDto[];
  selectedAnalysisType: string;
  onAnalysisTypeChange: (type: string) => void;
  onClose: () => void;
}

export const useAnalysisModal = ({
  dataset,
  initialParameterSettings,
  selectedAnalysisType,
  onAnalysisTypeChange,
  onClose,
}: UseAnalysisModalProps) => {
  const { toast } = useToast();

  // API hooks
  const similarityAnalysis = useSimilarityAnalysis();
  const kmeansAnalysis = useKMeansClustering();
  const dbscanAnalysis = useDBSCANClustering();
  const agglomerativeAnalysis = useAgglomerativeClustering();

  const getDefaultValues = (type: AnalysisType) => ({
    ...ANALYSIS_TYPE_DEFAULTS[type],
    parameterSettings: initialParameterSettings,
  });

  const form = useForm<FormData>({
    resolver: zodResolver(analysisSchema),
    defaultValues: getDefaultValues(selectedAnalysisType as AnalysisType),
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

  const handleAnalysisTypeChange = (newType: string) => {
    const currentValues = form.getValues();
    const newDefaults = getDefaultValues(newType as AnalysisType);

    const mergedValues = {
      ...newDefaults,
      includeParameters: currentValues.includeParameters,
      parameterSettings: currentValues.parameterSettings,
    };

    form.reset(mergedValues);
    onAnalysisTypeChange(newType);
  };

  const resetToDefaults = (type?: AnalysisType) => {
    const targetType = type || analysisType;
    const defaultValues = getDefaultValues(targetType);
    form.reset(defaultValues);
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
          await kmeansAnalysis.mutateAsync({
            datasetId: dataset.id,
            request: {
              ...baseRequest,
              numberOfClusters: data.numberOfClusters!,
              maxIterations: data.maxIterations!,
              numericMetric: NUMERIC_METRIC_MAP[data.numericMetric],
              categoricalMetric: CATEGORICAL_METRIC_MAP[data.categoricalMetric],
            },
          });
          break;

        case 'dbscan':
          await dbscanAnalysis.mutateAsync({
            datasetId: dataset.id,
            request: {
              ...baseRequest,
              epsilon: data.epsilon!,
              minPoints: data.minPoints!,
              numericMetric: NUMERIC_METRIC_MAP[data.numericMetric],
              categoricalMetric: CATEGORICAL_METRIC_MAP[data.categoricalMetric],
            },
          });
          break;

        case 'agglomerative':
          await agglomerativeAnalysis.mutateAsync({
            datasetId: dataset.id,
            request: {
              ...baseRequest,
              threshold: data.threshold!,
              numericMetric: NUMERIC_METRIC_MAP[data.numericMetric],
              categoricalMetric: CATEGORICAL_METRIC_MAP[data.categoricalMetric],
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
    handleAnalysisTypeChange,
    submitAnalysis,
  };
};
