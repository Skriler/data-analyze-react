import type { DatasetDto } from '@api-types/dataset';
import type { AnalysisType, ClusteringType } from './constants';

export interface AnalysisTypeConfig {
  id: AnalysisType;
  name: string;
  description: string;
  longDescription: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  features: string[];
}

export type AlgorithmSettingField =
  | 'numberOfClusters'
  | 'maxIterations'
  | 'epsilon'
  | 'minPoints'
  | 'threshold';

export interface AlgorithmSetting {
  name: AlgorithmSettingField;
  label: string;
  type: 'number';
  min?: number;
  max?: number;
  step?: number;
  defaultValue: number;
  parser: (value: string) => number;
}

export interface AlgorithmConfig {
  id: ClusteringType;
  name: string;
  settings: AlgorithmSetting[];
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export interface AnalysisActions {
  handleRunAnalysis: (dataset: DatasetDto, analysisType: string) => void;
  handleCreateDataset: () => void;
  handleViewDocumentation: () => void;
}
