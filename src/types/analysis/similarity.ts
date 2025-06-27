import type { ParameterSettingsDto, DataObjectAnalysisDto } from './common';

/**
 * Request object for similarity analysis.
 */
export interface SimilarityRequest {
  parameterSettings: ParameterSettingsDto[];
  includeParameters: boolean;
}

/**
 * Result object returned after performing similarity analysis.
 */
export interface SimilarityResult {
  datasetId: number;
  similarities: SimilarityPairDto[];
}

/**
 * Represents a pair of data objects and their similarity score.
 */
export interface SimilarityPairDto {
  objectA: DataObjectAnalysisDto;
  objectB: DataObjectAnalysisDto;
  similarityPercentage: number;
}
