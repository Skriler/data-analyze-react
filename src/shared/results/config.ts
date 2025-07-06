import { Search, Network, Map, GitBranch } from 'lucide-react';

export const ANALYSIS_CONFIG = {
  similarity: {
    icon: Search,
    color: 'blue',
    name: 'Similarity Analysis',
    description: 'Analyze similarity between objects',
  },
  KMeans: {
    icon: Network,
    color: 'green',
    name: 'K-Means Clustering',
    description: 'Partition objects into k clusters',
  },
  DBSCAN: {
    icon: Map,
    color: 'purple',
    name: 'DBSCAN Clustering',
    description: 'Density-based clustering algorithm',
  },
  Agglomerative: {
    icon: GitBranch,
    color: 'orange',
    name: 'Agglomerative Clustering',
    description: 'Hierarchical clustering approach',
  },
} as const;

export const ANALYSIS_TYPES = Object.keys(ANALYSIS_CONFIG) as Array<
  keyof typeof ANALYSIS_CONFIG
>;
