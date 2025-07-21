import type { SimilarityPairDto } from '@api-types/analysis/similarity';
import type { SimilarityStats } from '@shared/results';
import type {
  ProcessedSimilarityPair,
  SimilarityFilter,
  SimilaritySortOption,
  SimilarityDistributionData,
} from '@shared/results/similarityResultModal';
import {
  SIMILARITY_RANGES,
  SIMILARITY_COLORS,
} from '@shared/results/similarityResultModal';

export class SimilarityResultsProcessor {
  /**
   * Process raw similarity data to include additional display properties
   */
  static processSimilarityData(
    pairs: SimilarityPairDto[]
  ): ProcessedSimilarityPair[] {
    return pairs.map((pair, index) => ({
      ...pair,
      similarityPercentage:
        pair.similarityPercentage > 1
          ? pair.similarityPercentage
          : pair.similarityPercentage * 100,

      id: `${pair.objectA.id}-${pair.objectB.id}-${index}`,
      combinedName: `${pair.objectA.name} ↔ ${pair.objectB.name}`,
    }));
  }

  /**
   * Calculate statistics from similarity pairs
   */
  static calculateStats(pairs: ProcessedSimilarityPair[]): SimilarityStats {
    if (pairs.length === 0) {
      return {
        totalPairs: 0,
        avgSimilarity: 0,
        maxSimilarity: 0,
        minSimilarity: 0,
      };
    }

    const similarities = pairs.map(pair => pair.similarityPercentage);
    const sum = similarities.reduce((acc, sim) => acc + sim, 0);

    return {
      totalPairs: pairs.length,
      avgSimilarity: Math.round((sum / pairs.length) * 100) / 100,
      maxSimilarity: Math.max(...similarities),
      minSimilarity: Math.min(...similarities),
    };
  }

  /**
   * Filter similarity pairs by similarity range
   */
  static filterByRange(
    pairs: ProcessedSimilarityPair[],
    filter: SimilarityFilter
  ): ProcessedSimilarityPair[] {
    if (filter === 'all') return pairs;

    const range = SIMILARITY_RANGES[filter];
    return pairs.filter(
      pair =>
        pair.similarityPercentage >= range.min &&
        pair.similarityPercentage <= range.max
    );
  }

  /**
   * Filter similarity pairs by search term
   */
  static filterBySearch(
    pairs: ProcessedSimilarityPair[],
    searchTerm: string
  ): ProcessedSimilarityPair[] {
    if (!searchTerm.trim()) return pairs;

    const lowerSearchTerm = searchTerm.toLowerCase().trim();

    // Split by arrow symbols and common separators
    const searchParts = lowerSearchTerm
      .split(/[\s→←↔\-\—]+/)
      .map(part => part.trim())
      .filter(part => part.length > 0);

    return pairs.filter(pair => {
      const objectAName = pair.objectA.name.toLowerCase();
      const objectBName = pair.objectB.name.toLowerCase();
      const combinedName = pair.combinedName.toLowerCase();

      return searchParts.every(
        term =>
          objectAName.includes(term) ||
          objectBName.includes(term) ||
          combinedName.includes(term)
      );
    });
  }

  /**
   * Sort similarity pairs by specified option
   */
  static sortPairs(
    pairs: ProcessedSimilarityPair[],
    sortOption: SimilaritySortOption
  ): ProcessedSimilarityPair[] {
    const sorted = [...pairs];

    switch (sortOption) {
      case 'similarity-desc':
        return sorted.sort(
          (a, b) => b.similarityPercentage - a.similarityPercentage
        );
      case 'similarity-asc':
        return sorted.sort(
          (a, b) => a.similarityPercentage - b.similarityPercentage
        );
      case 'name-asc':
        return sorted.sort((a, b) => {
          // Sort objects alphabetically for consistent order
          const sortedA = [a.objectA.name, a.objectB.name].sort();
          const sortedB = [b.objectA.name, b.objectB.name].sort();
          const combinedA = `${sortedA[0]} ↔ ${sortedA[1]}`;
          const combinedB = `${sortedB[0]} ↔ ${sortedB[1]}`;
          return combinedA.localeCompare(combinedB);
        });
      case 'name-desc':
        return sorted.sort((a, b) => {
          const sortedA = [a.objectA.name, a.objectB.name].sort();
          const sortedB = [b.objectA.name, b.objectB.name].sort();
          const combinedA = `${sortedA[0]} ↔ ${sortedA[1]}`;
          const combinedB = `${sortedB[0]} ↔ ${sortedB[1]}`;
          return combinedB.localeCompare(combinedA);
        });
      default:
        return sorted;
    }
  }

  /**
   * Get similarity color based on percentage
   */
  static getSimilarityColor(percentage: number): string {
    if (percentage >= 95) return SIMILARITY_COLORS.EXACT;
    if (percentage >= 80) return SIMILARITY_COLORS.HIGH;
    if (percentage >= 50) return SIMILARITY_COLORS.MEDIUM;
    return SIMILARITY_COLORS.LOW;
  }

  /**
   * Calculate similarity distribution for charts
   */
  static calculateDistribution(
    pairs: ProcessedSimilarityPair[]
  ): SimilarityDistributionData[] {
    const total = pairs.length;
    if (total === 0) return [];

    const distribution = Object.entries(SIMILARITY_RANGES)
      .filter(([key]) => key !== 'all')
      .map(([_, range]) => {
        const count = pairs.filter(
          pair =>
            pair.similarityPercentage >= range.min &&
            pair.similarityPercentage <= range.max
        ).length;

        return {
          range: range.label,
          count,
          percentage: Math.round((count / total) * 100 * 100) / 100,
          color: range.color,
        };
      })
      .filter(item => item.count > 0);

    return distribution;
  }

  /**
   * Get pairs with exact or near-exact matches
   */
  static getExactMatches(
    pairs: ProcessedSimilarityPair[]
  ): ProcessedSimilarityPair[] {
    return pairs.filter(pair => pair.similarityPercentage >= 95);
  }

  /**
   * Group pairs by similarity ranges
   */
  static groupByRanges(
    pairs: ProcessedSimilarityPair[]
  ): Record<SimilarityFilter, ProcessedSimilarityPair[]> {
    const groups: Record<SimilarityFilter, ProcessedSimilarityPair[]> = {
      all: pairs,
      exact: [],
      high: [],
      medium: [],
      low: [],
    };

    pairs.forEach(pair => {
      const percentage = pair.similarityPercentage;
      if (percentage >= 95) groups.exact.push(pair);
      else if (percentage >= 80) groups.high.push(pair);
      else if (percentage >= 50) groups.medium.push(pair);
      else groups.low.push(pair);
    });

    return groups;
  }
}
