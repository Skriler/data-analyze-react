import { httpClient } from '@api/client/base';
import { HttpMethod } from '@api/types';
import type {
  ClusteringAnalysisResult,
  SimilarityAnalysisResult,
  ClusteringAlgorithm,
} from '@api-types/analysis';

export const resultsApi = {
  BASE_URL: '/results',

  // === Clustering Analysis Results ===

  /**
   * Get all clustering analysis results.
   *
   * @returns Array of ClusteringAnalysisResultDto.
   */
  async getAllClusteringResults(): Promise<ClusteringAnalysisResult[]> {
    return httpClient.request<ClusteringAnalysisResult[], void>({
      method: HttpMethod.GET,
      url: `${this.BASE_URL}/clustering`,
      requireAuth: true,
    });
  },

  /**
   * Get clustering analysis results by dataset ID.
   *
   * @param datasetId - ID of the dataset.
   * @returns Array of ClusteringAnalysisResultDto.
   */
  async getClusteringResultsByDataset(
    datasetId: number
  ): Promise<ClusteringAnalysisResult[]> {
    return httpClient.request<ClusteringAnalysisResult[], void>({
      method: HttpMethod.GET,
      url: `${this.BASE_URL}/clustering/dataset/${datasetId}`,
      requireAuth: true,
    });
  },

  /**
   * Get clustering analysis results by dataset ID and algorithm.
   *
   * @param datasetId - ID of the dataset.
   * @param algorithm - Clustering algorithm to filter by.
   * @returns Array of ClusteringAnalysisResultDto.
   */
  async getClusteringResultsByAlgorithm(
    datasetId: number,
    algorithm: ClusteringAlgorithm
  ): Promise<ClusteringAnalysisResult[]> {
    return httpClient.request<ClusteringAnalysisResult[], void>({
      method: HttpMethod.GET,
      url: `${this.BASE_URL}/clustering/dataset/${datasetId}/algorithm/${algorithm}`,
      requireAuth: true,
    });
  },

  // === Similarity Analysis Results ===

  /**
   * Get all similarity analysis results.
   *
   * @returns Array of SimilarityAnalysisResultDto.
   */
  async getAllSimilarityResults(): Promise<SimilarityAnalysisResult[]> {
    return httpClient.request<SimilarityAnalysisResult[], void>({
      method: HttpMethod.GET,
      url: `${this.BASE_URL}/similarity`,
      requireAuth: true,
    });
  },

  /**
   * Get similarity analysis results by dataset ID.
   *
   * @param datasetId - ID of the dataset.
   * @returns Array of SimilarityAnalysisResultDto.
   */
  async getSimilarityResultsByDataset(
    datasetId: number
  ): Promise<SimilarityAnalysisResult[]> {
    return httpClient.request<SimilarityAnalysisResult[], void>({
      method: HttpMethod.GET,
      url: `${this.BASE_URL}/similarity/dataset/${datasetId}`,
      requireAuth: true,
    });
  },
};
