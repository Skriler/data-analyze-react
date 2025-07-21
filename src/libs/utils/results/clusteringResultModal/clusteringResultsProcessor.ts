import type { ClusterDto } from '@api-types/analysis/clustering';
import type {
  ProcessedCluster,
  ClusteringStats,
} from '@shared/results/clusteringResultModal';

export class ClusteringResultsProcessor {
  /**
   * Process raw cluster data to include cluster numbers and sort by size
   */
  static processClusterData(clusters: ClusterDto[]): ProcessedCluster[] {
    return clusters
      .map((cluster, index) => ({
        ...cluster,
        number: index + 1,
      }))
      .sort((a, b) => b.objects.length - a.objects.length);
  }

  /**
   * Calculate statistics from processed clusters
   */
  static calculateStats(clusters: ProcessedCluster[]): ClusteringStats {
    const totalClusters = clusters.length;
    const totalObjects = clusters.reduce(
      (sum, cluster) => sum + cluster.objects.length,
      0
    );
    const avgClusterSize =
      totalClusters > 0 ? Math.round(totalObjects / totalClusters) : 0;

    return {
      totalClusters,
      totalObjects,
      avgClusterSize,
    };
  }
}
