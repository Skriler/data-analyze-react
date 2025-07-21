import type { SimilarityRange, SimilarityFilter } from './types';

/**
 * Similarity ranges for filtering and visualization
 */
export const SIMILARITY_RANGES: Record<SimilarityFilter, SimilarityRange> = {
  all: {
    min: 0,
    max: 100,
    label: 'All Similarities',
    color: '#6B7280',
  },
  exact: {
    min: 95,
    max: 100,
    label: 'Exact Match (95-100%)',
    color: '#DC2626',
  },
  high: {
    min: 80,
    max: 94.99,
    label: 'High Similarity (80-94%)',
    color: '#EF4444',
  },
  medium: {
    min: 50,
    max: 79.99,
    label: 'Medium Similarity (50-79%)',
    color: '#F59E0B',
  },
  low: {
    min: 0,
    max: 49.99,
    label: 'Low Similarity (0-49%)',
    color: '#10B981',
  },
};

/**
 * Color palette for similarity visualization
 */
export const SIMILARITY_COLORS = {
  EXACT: '#DC2626', // Red-600
  HIGH: '#EF4444', // Red-500
  MEDIUM: '#F59E0B', // Amber-500
  LOW: '#10B981', // Emerald-500
  BACKGROUND: '#F3F4F6', // Gray-100
  TEXT: '#374151', // Gray-700
  MUTED: '#6B7280', // Gray-500
} as const;

/**
 * Default configuration for similarity display
 */
export const SIMILARITY_CONFIG = {
  ITEMS_PER_PAGE: 30,
  MAX_VISIBLE_PAIRS_IN_CARD: 10,
  CHART_ANIMATION_DURATION: 300,
  SEARCH_DEBOUNCE_MS: 300,
  INITIAL_LOAD_SIZE: 50,
} as const;

/**
 * Sort options configuration
 */
export const SORT_OPTIONS = [
  { value: 'similarity-desc', label: 'Highest Similarity' },
  { value: 'similarity-asc', label: 'Lowest Similarity' },
  { value: 'name-asc', label: 'Name A-Z' },
  { value: 'name-desc', label: 'Name Z-A' },
] as const;

/**
 * Filter options configuration
 */
export const FILTER_OPTIONS: Array<{
  value: SimilarityFilter;
  label: string;
  color: string;
}> = [
  { value: 'all', label: 'All', color: SIMILARITY_COLORS.MUTED },
  { value: 'exact', label: 'Exact (95-100%)', color: SIMILARITY_COLORS.EXACT },
  { value: 'high', label: 'High (80-94%)', color: SIMILARITY_COLORS.HIGH },
  {
    value: 'medium',
    label: 'Medium (50-79%)',
    color: SIMILARITY_COLORS.MEDIUM,
  },
  { value: 'low', label: 'Low (0-49%)', color: SIMILARITY_COLORS.LOW },
];
