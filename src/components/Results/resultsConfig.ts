import { Search, Network, Map, GitBranch } from 'lucide-react';

export const analysisTypeIcons = {
  similarity: Search,
  KMeans: Network,
  DBSCAN: Map,
  Agglomerative: GitBranch,
};

export const analysisTypeColors = {
  similarity: 'blue',
  KMeans: 'green',
  DBSCAN: 'purple',
  Agglomerative: 'orange',
};

export const analysisTypeNames = {
  similarity: 'Similarity Analysis',
  KMeans: 'K-Means Clustering',
  DBSCAN: 'DBSCAN Clustering',
  Agglomerative: 'Agglomerative Clustering',
};
