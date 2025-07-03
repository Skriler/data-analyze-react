import type { ParameterSettingsDto } from '@api-types/analysis';
import type { DatasetDto } from '@api-types/dataset';

export interface AnalysisType {
  id: 'similarity' | 'kmeans' | 'dbscan' | 'agglomerative';
  name: string;
  description: string;
  longDescription: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  features: string[];
}

export interface AnalysisFormData {
  type: 'similarity' | 'kmeans' | 'dbscan' | 'agglomerative';
  includeParameters: boolean;
  parameterSettings: ParameterSettingsDto[];
  numberOfClusters?: number;
  maxIterations?: number;
  epsilon?: number;
  minPoints?: number;
  threshold?: number;
  numericMetric: 'Euclidean' | 'Manhattan' | 'Cosine';
  categoricalMetric: 'Hamming' | 'Jaccard';
}

export interface AnalysisModalState {
  isOpen: boolean;
  isLoading: boolean;
  selectedDataset: DatasetDto | null;
}

export interface AnalysisTypeConfig {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  icon: React.ComponentType<any>;
  color: string;
  features: string[];
  requiresSettings: boolean;
}
