import type { SimilarityPairDto } from '@api-types/analysis/similarity';

/**
 * Processed similarity pair with additional display properties
 */
export interface ProcessedSimilarityPair extends SimilarityPairDto {
  id: string;
  combinedName: string;
}

/**
 * View modes for similarity modal
 */
export type SimilarityViewMode = 'list' | 'chart';

/**
 * Filter types for similarity pairs
 */
export type SimilarityFilter = 'all' | 'high' | 'medium' | 'low' | 'exact';

/**
 * Sort options for similarity pairs
 */
export type SimilaritySortOption =
  | 'similarity-desc'
  | 'similarity-asc'
  | 'name-asc'
  | 'name-desc';

/**
 * Similarity range configuration
 */
export interface SimilarityRange {
  min: number;
  max: number;
  label: string;
  color: string;
}

/**
 * Similarity distribution data for charts
 */
export interface SimilarityDistributionData {
  range: string;
  count: number;
  percentage: number;
  color: string;
}

/**
 * Loading states for similarity processing
 */
export type SimilarityLoadingState = 'idle' | 'processing' | 'loaded' | 'error';
