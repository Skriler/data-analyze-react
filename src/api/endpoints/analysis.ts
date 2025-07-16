import { httpClient } from '@api/client/base';
import { HttpMethod } from '@api/types';
import type {
  SimilarityRequest,
  SimilarityAnalysisResult,
  KMeansClusteringRequest,
  DBSCANClusteringRequest,
  AgglomerativeClusteringRequest,
  ClusteringAnalysisResult,
} from '@api-types/analysis';

export const analysisApi = {
  BASE_URL: '/analyse',

  /**
   * Run similarity analysis on a dataset.
   *
   * @param datasetId - ID of the dataset.
   * @param request - Optional similarity analysis parameters.
   * @returns Result of similarity analysis.
   */
  async runSimilarityAnalysis(
    datasetId: number,
    request?: SimilarityRequest
  ): Promise<SimilarityAnalysisResult> {
    return httpClient.request<
      SimilarityAnalysisResult,
      SimilarityRequest | null
    >({
      method: HttpMethod.POST,
      url: `${this.BASE_URL}/similarity/${datasetId}`,
      data: request ?? null,
      requireAuth: true,
    });
  },

  /**
   * Run KMeans clustering on a dataset.
   *
   * @param datasetId - ID of the dataset.
   * @param request - KMeans clustering parameters.
   * @returns Clustering result.
   */
  async runKMeansClustering(
    datasetId: number,
    request: KMeansClusteringRequest
  ): Promise<ClusteringAnalysisResult> {
    return httpClient.request<ClusteringAnalysisResult>({
      method: HttpMethod.POST,
      url: `${this.BASE_URL}/clustering/kmeans/${datasetId}`,
      data: request,
      requireAuth: true,
    });
  },

  /**
   * Run DBSCAN clustering on a dataset.
   *
   * @param datasetId - ID of the dataset.
   * @param request - DBSCAN clustering parameters.
   * @returns Clustering result.
   */
  async runDBSCANClustering(
    datasetId: number,
    request: DBSCANClusteringRequest
  ): Promise<ClusteringAnalysisResult> {
    return httpClient.request<ClusteringAnalysisResult>({
      method: HttpMethod.POST,
      url: `${this.BASE_URL}/clustering/dbscan/${datasetId}`,
      data: request,
      requireAuth: true,
    });
  },

  /**
   * Run Agglomerative clustering on a dataset.
   *
   * @param datasetId - ID of the dataset.
   * @param request - Agglomerative clustering parameters.
   * @returns Clustering result.
   */
  async runAgglomerativeClustering(
    datasetId: number,
    request: AgglomerativeClusteringRequest
  ): Promise<ClusteringAnalysisResult> {
    return httpClient.request<ClusteringAnalysisResult>({
      method: HttpMethod.POST,
      url: `${this.BASE_URL}/clustering/agglomerative/${datasetId}`,
      data: request,
      requireAuth: true,
    });
  },
};
