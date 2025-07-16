import type {
  DataObjectAnalysisDto,
  BaseAnalysisResult,
  BaseAnalysisRequest,
} from './common';

/**
 * Supported numeric distance metrics for clustering.
 */
export enum NumericMetric {
  Euclidean = 0,
  Manhattan = 1,
  Cosine = 2,
}

/**
 * Supported categorical distance metrics for clustering.
 */
export enum CategoricalMetric {
  Hamming = 0,
  Jaccard = 1,
}

/**
 * Supported clustering algorithms.
 */
export enum ClusteringAlgorithm {
  KMeans = 0,
  DBSCAN = 1,
  Agglomerative = 2,
}

/**
 * Request object containing common clustering parameters.
 */
export interface BaseClusteringRequest extends BaseAnalysisRequest {
  numericMetric: NumericMetric;
  categoricalMetric: CategoricalMetric;
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
 * Represents a cluster containing a name and list of data objects.
 */
export interface ClusterDto {
  name: string;
  objects: DataObjectAnalysisDto[];
}

/**
 * Result object returned after performing clustering analysis.
 */
export interface ClusteringAnalysisResult extends BaseAnalysisResult {
  algorithm: ClusteringAlgorithm;
  clusters: ClusterDto[];
}
