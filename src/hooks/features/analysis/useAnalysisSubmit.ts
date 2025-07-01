import { useToast } from '@hooks/toast/useToast';
import {
  useSimilarityAnalysis,
  useKMeansClustering,
  useDBSCANClustering,
  useAgglomerativeClustering,
} from '@hooks/api/useAnalysis';
import type { DatasetDto } from '@api-types/dataset';
import type { FormData } from './analysisSchema';
import type { ParameterSetting } from './analysis';

export const useAnalysisSubmit = (dataset: DatasetDto, onClose: () => void) => {
  const similarityAnalysis = useSimilarityAnalysis();
  const kmeansAnalysis = useKMeansClustering();
  const dbscanAnalysis = useDBSCANClustering();
  const agglomerativeAnalysis = useAgglomerativeClustering();
  const { toast } = useToast();

  const isLoading =
    similarityAnalysis.isPending ||
    kmeansAnalysis.isPending ||
    dbscanAnalysis.isPending ||
    agglomerativeAnalysis.isPending;

  const submitAnalysis = async (
    data: FormData,
    parameterSettings: ParameterSetting[]
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

  return { submitAnalysis, isLoading };
};
