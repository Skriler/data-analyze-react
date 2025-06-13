import type { UserInfo } from '@api-types/auth';
import type { DatasetCreateDto } from '@api-types/dataset';
import type {
  AgglomerativeClusteringRequest,
  ClusteringResult,
  DBSCANClusteringRequest,
  KMeansClusteringRequest,
  SimilarityRequest,
  SimilarityResult,
} from '@api-types/analysis';

// ============================
// Dataset types
// ============================

/**
 * Input variables for updating an existing dataset.
 */
export type UpdateDatasetMutationVariables = {
  datasetId: number;
  dataset: DatasetCreateDto;
};

// ============================
// Auth types
// ============================

/**
 * Cached state returned by useAuthState query.
 */
export type AuthQueryState = {
  isAuthenticated: boolean;
  isAdmin: boolean;
  user: UserInfo | null;
};

// ============================
// Analysis mutation variables
// ============================

/**
 * Variables for triggering similarity analysis.
 */
export type SimilarityMutationVariables = {
  datasetId: number;
  request?: SimilarityRequest;
};

/**
 * Variables for triggering clustering analysis.
 */
export type ClusteringMutationVariables = {
  datasetId: number;
  request:
    | KMeansClusteringRequest
    | DBSCANClusteringRequest
    | AgglomerativeClusteringRequest;
};

// ============================
// Cache state types
// ============================

/**
 * Cache structure for similarity analysis result.
 */
export type SimilarityCache = {
  isLoading: boolean;
  result: SimilarityResult | null;
  timestamp?: number;
  error?: string;
};

/**
 * Cache structure for clustering analysis result.
 */
export type ClusteringCache = {
  isLoading: boolean;
  result: ClusteringResult | null;
  timestamp?: number;
  error?: string;
};

/**
 * Generic cache format for any analysis-related data.
 */
export type CacheState<T> = {
  isLoading: boolean;
  result: T | null;
  timestamp?: number;
  error?: string;
};
