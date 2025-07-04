import { DEFAULT_VALUES, VALIDATION_LIMITS } from './constants';
import type { AlgorithmConfig } from './types';

export const ALGORITHM_CONFIGS: AlgorithmConfig[] = [
  {
    id: 'kmeans',
    name: 'K-Means Configuration',
    settings: [
      {
        name: 'numberOfClusters',
        label: 'Number of Clusters',
        type: 'number',
        min: VALIDATION_LIMITS.clusters.min,
        max: VALIDATION_LIMITS.clusters.max,
        step: VALIDATION_LIMITS.clusters.step,
        defaultValue: DEFAULT_VALUES.numberOfClusters,
        parser: value => parseInt(value, 10),
      },
      {
        name: 'maxIterations',
        label: 'Max Iterations',
        type: 'number',
        min: VALIDATION_LIMITS.iterations.min,
        max: VALIDATION_LIMITS.iterations.max,
        step: VALIDATION_LIMITS.iterations.step,
        defaultValue: DEFAULT_VALUES.maxIterations,
        parser: value => parseInt(value, 10),
      },
    ],
  },
  {
    id: 'dbscan',
    name: 'DBSCAN Configuration',
    settings: [
      {
        name: 'epsilon',
        label: 'Epsilon',
        type: 'number',
        min: VALIDATION_LIMITS.epsilon.min,
        max: VALIDATION_LIMITS.epsilon.max,
        step: VALIDATION_LIMITS.epsilon.step,
        defaultValue: DEFAULT_VALUES.epsilon,
        parser: value => parseFloat(value),
      },
      {
        name: 'minPoints',
        label: 'Min Points',
        type: 'number',
        min: VALIDATION_LIMITS.minPoints.min,
        max: VALIDATION_LIMITS.minPoints.max,
        step: VALIDATION_LIMITS.minPoints.step,
        defaultValue: DEFAULT_VALUES.minPoints,
        parser: value => parseInt(value, 10),
      },
    ],
  },
  {
    id: 'agglomerative',
    name: 'Agglomerative Configuration',
    settings: [
      {
        name: 'threshold',
        label: 'Threshold',
        type: 'number',
        min: VALIDATION_LIMITS.threshold.min,
        max: VALIDATION_LIMITS.threshold.max,
        step: VALIDATION_LIMITS.threshold.step,
        defaultValue: DEFAULT_VALUES.threshold,
        parser: value => parseFloat(value),
      },
    ],
  },
];
