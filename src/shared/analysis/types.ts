import type { ParameterSettingsDto } from '@api-types/analysis';
import type { DatasetDto } from '@api-types/dataset';
import type {
  AnalysisType,
  CategoricalMetric,
  ClusteringType,
  NumericMetric,
} from './constants';

export interface AnalysisTypeConfig {
  id: AnalysisType;
  name: string;
  description: string;
  longDescription: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  features: string[];
}

export interface AnalysisFormData {
  type: AnalysisType;
  includeParameters: boolean;
  parameterSettings: ParameterSettingsDto[];
  numberOfClusters?: number;
  maxIterations?: number;
  epsilon?: number;
  minPoints?: number;
  threshold?: number;
  numericMetric: NumericMetric;
  categoricalMetric: CategoricalMetric;
}

export interface AnalysisModalState {
  isOpen: boolean;
  isLoading: boolean;
  selectedDataset: DatasetDto | null;
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

export interface FormFieldError {
  field: string;
  message: string;
}

export interface AnalysisState {
  formData: AnalysisFormData;
  parameterSettings: ParameterSettingsDto[];
  errors: FormFieldError[];
  isValid: boolean;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}
