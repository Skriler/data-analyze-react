import { Search, Network, Map, GitBranch } from 'lucide-react';
import type { AnalysisType } from './analysis';

export const ANALYSIS_TYPES: AnalysisType[] = [
  {
    id: 'similarity',
    name: 'Similarity Analysis',
    description: 'Find similar objects in your dataset',
    icon: Search,
    color: 'blue',
  },
  {
    id: 'kmeans',
    name: 'K-Means Clustering',
    description: 'Group objects into k clusters',
    icon: Network,
    color: 'green',
  },
  {
    id: 'dbscan',
    name: 'DBSCAN Clustering',
    description: 'Density-based clustering algorithm',
    icon: Map,
    color: 'purple',
  },
  {
    id: 'agglomerative',
    name: 'Agglomerative Clustering',
    description: 'Hierarchical clustering approach',
    icon: GitBranch,
    color: 'orange',
  },
];
