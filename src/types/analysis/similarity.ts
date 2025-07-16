import type {
  DataObjectAnalysisDto,
  BaseAnalysisRequest,
  BaseAnalysisResult,
} from './common';

/**
 * Request object for similarity analysis.
 */
export interface SimilarityRequest extends BaseAnalysisRequest {
  // Marker type for similarity analysis requests.
  // Contains only common analysis properties via BaseAnalysisRequest.
}

/**
 * Represents a pair of data objects and their similarity score.
 */
export interface SimilarityPairDto {
  objectA: DataObjectAnalysisDto;
  objectB: DataObjectAnalysisDto;
  similarityPercentage: number;
}

/**
 * Result object returned after performing similarity analysis.
 */
export interface SimilarityAnalysisResult extends BaseAnalysisResult {
  similarities: SimilarityPairDto[];
}
