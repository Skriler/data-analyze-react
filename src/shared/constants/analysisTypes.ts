import { Search, Network, Map, GitBranch } from 'lucide-react';
import type { AnalysisType } from 'shared/types/analysisType';

export const ANALYSIS_TYPES: AnalysisType[] = [
  {
    id: 'similarity',
    name: 'Similarity Analysis',
    description:
      'Find similar objects in your dataset by comparing their parameter values.',
    longDescription:
      'Similarity analysis helps you identify objects that share common characteristics. This is useful for finding patterns, detecting anomalies, or grouping similar items.',
    icon: Search,
    color: 'blue',
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
