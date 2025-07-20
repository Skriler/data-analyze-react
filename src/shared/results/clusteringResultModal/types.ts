import type { ClusterDto } from '@api-types/analysis/clustering';

/**
 * Processed cluster with additional display properties
 */
export interface ProcessedCluster extends ClusterDto {
  number: number;
}

/**
 * Clustering analysis statistics
 */
export interface ClusteringStats {
  totalClusters: number;
  totalObjects: number;
  avgClusterSize: number;
}

/**
 * View modes for clustering details modal
 */
export type ClusteringViewMode = 'visualization' | 'list';

/**
 * Cluster distribution data for charts
 */
export interface ClusterDistributionData {
  cluster: ProcessedCluster;
  percentage: number;
}

/**
 * Coordinate bounds for visualization
 */
export interface CoordinateBounds {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}
