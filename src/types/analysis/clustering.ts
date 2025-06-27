import type { ParameterSettingsDto, DataObjectAnalysisDto } from './common';

/**
 * Request object containing common clustering parameters.
 */
export interface BaseClusteringRequest {
  parameterSettings: ParameterSettingsDto[];
  numericMetric: NumericMetric;
  categoricalMetric: CategoricalMetric;
  includeParameters: boolean;
}

/**
 * Request object for K-Means clustering algorithm.
 */
export interface KMeansClusteringRequest extends BaseClusteringRequest {
  maxIterations: number;
  numberOfClusters: number;
}

/**
 * Request object for DBSCAN clustering algorithm.
 */
export interface DBSCANClusteringRequest extends BaseClusteringRequest {
  epsilon: number;
  minPoints: number;
}

/**
 * Request object for Agglomerative clustering algorithm.
 */
export interface AgglomerativeClusteringRequest extends BaseClusteringRequest {
  threshold: number;
}

/**
 * Result object returned after performing clustering analysis.
 */
export interface ClusteringResult {
  datasetId: number;
  clusters: ClusterDto[];
}

/**
 * Represents a cluster containing a name and list of data objects.
 */
export interface ClusterDto {
  name: string;
  objects: DataObjectAnalysisDto[];
}

/**
 * Supported numeric distance metrics for clustering.
 */
export type NumericMetric = 'Euclidean' | 'Manhattan' | 'Cosine';

/**
 * Supported categorical distance metrics for clustering.
 */
export type CategoricalMetric = 'Hamming' | 'Jaccard';

/**
 * Supported clustering algorithms.
 */
export type ClusteringAlgorithm = 'KMeans' | 'DBSCAN' | 'Agglomerative';
