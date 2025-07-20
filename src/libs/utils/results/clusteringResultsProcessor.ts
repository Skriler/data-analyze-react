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

  /**
   * Get top N clusters by size
   */
  static getTopClusters(
    clusters: ProcessedCluster[],
    limit: number
  ): ProcessedCluster[] {
    return clusters.slice(0, limit);
  }

  /**
   * Get cluster color by index
   */
  static getClusterColor(clusterNumber: number, colors: string[]): string {
    return colors[(clusterNumber - 1) % colors.length];
  }

  /**
   * Calculate cluster distribution percentages
   */
  static calculateClusterDistribution(clusters: ProcessedCluster[]): Array<{
    cluster: ProcessedCluster;
    percentage: number;
  }> {
    const totalObjects = clusters.reduce(
      (sum, cluster) => sum + cluster.objects.length,
      0
    );

    return clusters.map(cluster => ({
      cluster,
      percentage:
        totalObjects > 0 ? (cluster.objects.length / totalObjects) * 100 : 0,
    }));
  }

  /**
   * Find the largest cluster
   */
  static getLargestCluster(
    clusters: ProcessedCluster[]
  ): ProcessedCluster | null {
    if (clusters.length === 0) return null;
    return clusters.reduce((largest, current) =>
      current.objects.length > largest.objects.length ? current : largest
    );
  }

  /**
   * Find the smallest cluster
   */
  static getSmallestCluster(
    clusters: ProcessedCluster[]
  ): ProcessedCluster | null {
    if (clusters.length === 0) return null;
    return clusters.reduce((smallest, current) =>
      current.objects.length < smallest.objects.length ? current : smallest
    );
  }

  /**
   * Get coordinate bounds for visualization
   */
  static getCoordinateBounds(clusters: ProcessedCluster[]): {
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
  } {
    let minX = Infinity,
      maxX = -Infinity,
      minY = Infinity,
      maxY = -Infinity;

    clusters.forEach(cluster => {
      cluster.objects.forEach(obj => {
        minX = Math.min(minX, obj.x);
        maxX = Math.max(maxX, obj.x);
        minY = Math.min(minY, obj.y);
        maxY = Math.max(maxY, obj.y);
      });
    });

    return { minX, maxX, minY, maxY };
  }
}
