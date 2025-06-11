import type { ParameterSettingsDto, DataObjectAnalysisDto } from './common';

/**
 * Request object containing common clustering parameters.
 */
export interface BaseClusteringRequest {
  ParameterSettings: ParameterSettingsDto[];
  NumericMetric: NumericMetric;
  CategoricalMetric: CategoricalMetric;
  IncludeParameters: boolean;
}

/**
 * Request object for K-Means clustering algorithm.
 */
export interface KMeansClusteringRequest extends BaseClusteringRequest {
  MaxIterations: number;
  NumberOfClusters: number;
}

/**
 * Request object for DBSCAN clustering algorithm.
 */
export interface DBSCANClusteringRequest extends BaseClusteringRequest {
  Epsilon: number;
  MinPoints: number;
}

/**
 * Request object for Agglomerative clustering algorithm.
 */
export interface AgglomerativeClusteringRequest extends BaseClusteringRequest {
  Threshold: number;
}

/**
 * Result object returned after performing clustering analysis.
 */
export interface ClusteringResult {
  DatasetId: number;
  Clusters: ClusterDto[];
}

/**
 * Represents a cluster containing a name and list of data objects.
 */
export interface ClusterDto {
  Name: string;
  Objects: DataObjectAnalysisDto[];
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
