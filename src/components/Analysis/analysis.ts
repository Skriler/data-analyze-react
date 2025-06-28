export interface ParameterSetting {
  parameterId: number;
  isActive: boolean;
  weight: number;
}

export interface AnalysisType {
  id: 'similarity' | 'kmeans' | 'dbscan' | 'agglomerative';
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}
