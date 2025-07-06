import type { ClusteringResult, SimilarityResult } from '@api-types/analysis';
import type {
  AnalysisResultItem,
  ClusterStats,
  SimilarityStats,
  ResultsFiltersType,
} from '@shared/results';

export class ResultsProcessor {
  static calculateClusterStats(result: ClusteringResult): ClusterStats {
    const totalObjects = result.clusters.reduce(
      (acc, cluster) => acc + cluster.objects.length,
      0
    );

    const avgClusterSize =
      result.clusters.length > 0
        ? Math.round(totalObjects / result.clusters.length)
        : 0;

    const largestClusterSize =
      result.clusters.length > 0
        ? Math.max(...result.clusters.map(cluster => cluster.objects.length))
        : 0;

    return {
      totalClusters: result.clusters.length,
      totalObjects,
      avgClusterSize,
      largestClusterSize,
    };
  }

  static calculateSimilarityStats(result: SimilarityResult): SimilarityStats {
    if (result.similarities.length === 0) {
      return {
        totalPairs: 0,
        avgSimilarity: 0,
        maxSimilarity: 0,
        minSimilarity: 0,
      };
    }

    const similarities = result.similarities.map(s => s.similarityPercentage);
    const avgSimilarity = Math.round(
      similarities.reduce((acc, s) => acc + s, 0) / similarities.length
    );
    const maxSimilarity = Math.round(Math.max(...similarities));
    const minSimilarity = Math.round(Math.min(...similarities));

    return {
      totalPairs: result.similarities.length,
      avgSimilarity,
      maxSimilarity,
      minSimilarity,
    };
  }

  static getTopSimilarityPairs(result: SimilarityResult, limit: number = 5) {
    return result.similarities
      .sort((a, b) => b.similarityPercentage - a.similarityPercentage)
      .slice(0, limit);
  }

  static getTopClusters(result: ClusteringResult, limit: number = 10) {
    return result.clusters
      .sort((a, b) => b.objects.length - a.objects.length)
      .slice(0, limit);
  }

  static applyFilters(
    results: AnalysisResultItem[],
    filters: ResultsFiltersType
  ): AnalysisResultItem[] {
    return results.filter(result => {
      const matchesDataset =
        filters.selectedDataset === 'all' ||
        result.datasetId === filters.selectedDataset;
      const matchesType =
        filters.selectedType === 'all' || result.type === filters.selectedType;

      return matchesDataset && matchesType;
    });
  }

  static sortResultsByDate(
    results: AnalysisResultItem[],
    ascending: boolean = false
  ): AnalysisResultItem[] {
    return [...results].sort((a, b) =>
      ascending ? a.timestamp - b.timestamp : b.timestamp - a.timestamp
    );
  }

  static calculateSummaryStats(results: AnalysisResultItem[]) {
    const totalAnalyses = results.length;
    const uniqueDatasets = new Set(results.map(r => r.datasetId)).size;
    const analysisTypes = new Set(results.map(r => r.type)).size;

    return {
      totalAnalyses,
      uniqueDatasets,
      analysisTypes,
    };
  }
}
