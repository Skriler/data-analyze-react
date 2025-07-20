/**
 * Color palette for cluster visualization
 * Using vibrant, distinguishable colors
 */
export const CLUSTER_COLORS = [
  '#3B82F6', // Blue
  '#EF4444', // Red
  '#10B981', // Emerald
  '#F59E0B', // Amber
  '#8B5CF6', // Violet
  '#EC4899', // Pink
  '#06B6D4', // Cyan
  '#84CC16', // Lime
  '#F97316', // Orange
  '#6366F1', // Indigo
  '#14B8A6', // Teal
  '#F43F5E', // Rose
  '#8B5A2B', // Brown
  '#6B7280', // Gray
  '#DC2626', // Red-600
  '#059669', // Emerald-600
  '#D97706', // Amber-600
  '#7C3AED', // Violet-600
  '#DB2777', // Pink-600
  '#0891B2', // Cyan-600
];

/**
 * Default configuration for clustering visualization
 */
export const CLUSTERING_CONFIG = {
  DEFAULT_POINT_RADIUS: 6,
  HOVER_POINT_RADIUS: 8,
  MAX_VISIBLE_OBJECTS_IN_CARD: 20,
  MAX_VISIBLE_PARAMETERS: 3,
  CHART_ANIMATION_DURATION: 300,
} as const;

/**
 * Modal configuration
 */
export const MODAL_CONFIG = {
  MAX_WIDTH: '6xl',
  MAX_HEIGHT: '90vh',
  ANIMATION_DURATION: 200,
} as const;
