import type {
  SimilarityAnalysisResult,
  ClusteringAnalysisResult,
} from '@api-types/analysis';

export interface AnalysisResultItem {
  id: string;
  type: 'similarity' | 'KMeans' | 'DBSCAN' | 'Agglomerative';
  datasetId: string;
  datasetName: string;
  timestamp: number;
  result: SimilarityAnalysisResult | ClusteringAnalysisResult;
}

export interface ResultsFiltersType {
  selectedDataset: string;
  selectedType: string;
}

export interface ResultsStats {
  totalObjects: number;
  avgClusterSize: number;
  avgSimilarity: number;
  maxSimilarity: number;
}

export interface ClusterStats {
  totalClusters: number;
  totalObjects: number;
  avgClusterSize: number;
  largestClusterSize: number;
}

export interface SimilarityStats {
  totalPairs: number;
  avgSimilarity: number;
  maxSimilarity: number;
  minSimilarity: number;
}
