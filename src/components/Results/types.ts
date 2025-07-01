import type { SimilarityResult, ClusteringResult } from '@api-types/analysis';

export interface AnalysisResultItem {
  id: string;
  type: 'similarity' | 'KMeans' | 'DBSCAN' | 'Agglomerative';
  datasetId: string;
  datasetName: string;
  timestamp: number;
  result: SimilarityResult | ClusteringResult;
}

export interface ResultsFiltersType {
  selectedDataset: string;
  selectedType: string;
}
