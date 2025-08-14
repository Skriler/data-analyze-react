import type { AnalysisType } from '@shared/analysis';
import {
  type AlgorithmDocumentation,
  SIMILARITY_DOCUMENTATION,
  KMEANS_DOCUMENTATION,
  DBSCAN_DOCUMENTATION,
  AGGLOMERATIVE_DOCUMENTATION,
} from '@shared/analysis/documentation';

const DOCUMENTATION_MAP: Record<AnalysisType, AlgorithmDocumentation> = {
  similarity: SIMILARITY_DOCUMENTATION,
  kmeans: KMEANS_DOCUMENTATION,
  dbscan: DBSCAN_DOCUMENTATION,
  agglomerative: AGGLOMERATIVE_DOCUMENTATION,
};

export const getAlgorithmDocumentation = (
  analysisType: AnalysisType
): AlgorithmDocumentation => {
  return DOCUMENTATION_MAP[analysisType];
};
