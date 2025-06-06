import type { ParameterSettingsDto, DataObjectAnalysisDto } from './common';

/**
 * Request object for similarity analysis.
 */
export interface SimilarityRequest {
  ParameterSettings: ParameterSettingsDto[];
  IncludeParameters: boolean;
}

/**
 * Result object returned after performing similarity analysis.
 */
export interface SimilarityResult {
  DatasetId: number;
  Similarities: SimilarityPairDto[];
}

/**
 * Represents a pair of data objects and their similarity score.
 */
export interface SimilarityPairDto {
  ObjectA: DataObjectAnalysisDto;
  ObjectB: DataObjectAnalysisDto;
  SimilarityPercentage: number;
}
