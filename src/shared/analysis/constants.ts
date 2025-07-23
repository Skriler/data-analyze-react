import { Search, Network, Map, GitBranch } from 'lucide-react';
import type { AnalysisTypeConfig } from './types';
import { CategoricalMetric, NumericMetric } from '@api-types/analysis';

export const SIMILARITY_TYPES = ['similarity'] as const;
export const CLUSTERING_TYPES = ['kmeans', 'dbscan', 'agglomerative'] as const;

export const ANALYSIS_TYPES = [
  ...SIMILARITY_TYPES,
  ...CLUSTERING_TYPES,
] as const;

export type SimilarityType = (typeof SIMILARITY_TYPES)[number];
export type ClusteringType = (typeof CLUSTERING_TYPES)[number];
export type AnalysisType = (typeof ANALYSIS_TYPES)[number];

export const NUMERIC_METRICS = ['Euclidean', 'Manhattan', 'Cosine'] as const;
export const CATEGORICAL_METRICS = ['Hamming', 'Jaccard'] as const;

export type NumericMetricLabel = (typeof NUMERIC_METRICS)[number];
export type CategoricalMetricLabel = (typeof CATEGORICAL_METRICS)[number];

export const NUMERIC_METRIC_MAP: Record<NumericMetricLabel, NumericMetric> = {
  Euclidean: NumericMetric.Euclidean,
  Manhattan: NumericMetric.Manhattan,
  Cosine: NumericMetric.Cosine,
};

export const CATEGORICAL_METRIC_MAP: Record<
  CategoricalMetricLabel,
  CategoricalMetric
> = {
  Hamming: CategoricalMetric.Hamming,
  Jaccard: CategoricalMetric.Jaccard,
};

export const VALIDATION_LIMITS = {
  clusters: { min: 2, max: 20, step: 1 },
  iterations: { min: 10, max: 1000, step: 1 },
  epsilon: { min: 0.01, max: 1, step: 0.01 },
  minPoints: { min: 2, max: 20, step: 1 },
  threshold: { min: 0.01, max: 1, step: 0.01 },
} as const;

export const DEFAULT_VALUES = {
  // Common settings
  type: 'similarity' as const,
  includeParameters: true,
  numericMetric: 'Euclidean' as const,
  categoricalMetric: 'Hamming' as const,

  // Algorithm settings
  numberOfClusters: 5,
  maxIterations: 40,
  epsilon: 0.2,
  minPoints: 2,
  threshold: 0.2,
} as const;

export const ANALYSIS_TYPE_DEFAULTS = {
  similarity: {
    type: 'similarity' as const,
    includeParameters: DEFAULT_VALUES.includeParameters,
  },
  kmeans: {
    type: 'kmeans' as const,
    includeParameters: DEFAULT_VALUES.includeParameters,
    numberOfClusters: DEFAULT_VALUES.numberOfClusters,
    maxIterations: DEFAULT_VALUES.maxIterations,
    numericMetric: DEFAULT_VALUES.numericMetric,
    categoricalMetric: DEFAULT_VALUES.categoricalMetric,
  },
  dbscan: {
    type: 'dbscan' as const,
    includeParameters: DEFAULT_VALUES.includeParameters,
    epsilon: DEFAULT_VALUES.epsilon,
    minPoints: DEFAULT_VALUES.minPoints,
    numericMetric: DEFAULT_VALUES.numericMetric,
    categoricalMetric: DEFAULT_VALUES.categoricalMetric,
  },
  agglomerative: {
    type: 'agglomerative' as const,
    includeParameters: DEFAULT_VALUES.includeParameters,
    threshold: DEFAULT_VALUES.threshold,
    numericMetric: DEFAULT_VALUES.numericMetric,
    categoricalMetric: DEFAULT_VALUES.categoricalMetric,
  },
} as const;

export const ANALYSIS_TYPE_CONFIGS: AnalysisTypeConfig[] = [
  {
    id: 'similarity',
    name: 'Similarity Analysis',
    description:
      'Find similar objects in your dataset by comparing their parameter values.',
    longDescription:
      'Similarity analysis helps you identify objects that share common characteristics. This is useful for finding patterns, detecting anomalies, or grouping similar items.',
    icon: Search,
    color: 'rose',
    features: [
      'Configurable parameter weights',
      'Multiple similarity metrics',
      'Percentage-based results',
      'Parameter inclusion options',
    ],
  },
  {
    id: 'kmeans',
    name: 'K-Means Clustering',
    description: 'Group objects into k clusters using the k-means algorithm.',
    longDescription:
      'K-means clustering partitions your data into k clusters where each object belongs to the cluster with the nearest mean. Great for market segmentation and data organization.',
    icon: Network,
    color: 'green',
    features: [
      'Customizable cluster count',
      'Iteration control',
      'Multiple distance metrics',
      'Centroid visualization',
    ],
  },
  {
    id: 'dbscan',
    name: 'DBSCAN Clustering',
    description:
      'Density-based clustering that can find arbitrarily shaped clusters.',
    longDescription:
      'DBSCAN groups together points that are closely packed while marking points in low-density regions as outliers. Perfect for anomaly detection.',
    icon: Map,
    color: 'purple',
    features: [
      'Automatic cluster detection',
      'Outlier identification',
      'Epsilon and min-points tuning',
      'Noise point handling',
    ],
  },
  {
    id: 'agglomerative',
    name: 'Agglomerative Clustering',
    description: 'Hierarchical clustering that builds a tree of clusters.',
    longDescription:
      'Agglomerative clustering creates a hierarchy of clusters by iteratively merging the closest pairs. Provides insight into data structure at different scales.',
    icon: GitBranch,
    color: 'orange',
    features: [
      'Hierarchical structure',
      'Threshold-based merging',
      'Dendogram visualization',
      'Multi-level analysis',
    ],
  },
];
