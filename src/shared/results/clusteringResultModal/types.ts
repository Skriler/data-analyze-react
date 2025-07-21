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
