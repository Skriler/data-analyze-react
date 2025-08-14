import type { AlgorithmDocumentation } from './types';
import { COMMON_PARAMETERS } from './constants';

export const SIMILARITY_DOCUMENTATION: AlgorithmDocumentation = {
  overview:
    'Similarity analysis performs pairwise comparison between all objects in your dataset, calculating similarity scores from 0 (completely different) to 1 (identical). It uses Jaccard coefficient for categorical data and normalized distance for numerical data.',
  dataType: 'Mixed (Numerical + Categorical)',
  outputType: 'Similarity Pairs with Scores',
  complexity: 'O(n²) - Quadratic',
  steps: [
    {
      title: 'Data Preprocessing',
      description:
        'Filter active parameters and calculate numerical parameter ranges for normalization.',
    },
    {
      title: 'Pair Generation',
      description:
        'Create all unique object pairs for comparison (no self-comparison).',
    },
    {
      title: 'Parameter Comparison',
      description:
        'For numerical: similarity = 1 - |value1 - value2| / parameter_range. For categorical: Jaccard coefficient on comma-separated values as sets.',
    },
    {
      title: 'Weighted Aggregation',
      description:
        'Sum weighted similarities divided by total weights to get final similarity score.',
    },
  ],
  commonParameters: COMMON_PARAMETERS,
  algorithmParameters: [],
  bestFor: [
    'Finding similar objects in your dataset',
    'Detecting patterns and anomalies',
    'Market research and customer segmentation',
    'Content recommendation systems',
    'Quality control and matching processes',
  ],
  limitations: [
    'Quadratic time complexity - slower on large datasets',
    'No automatic grouping - shows all pairs',
    'Sensitive to parameter scaling',
    'May not handle missing values well',
  ],
};

export const KMEANS_DOCUMENTATION: AlgorithmDocumentation = {
  overview:
    'K-Means clustering partitions your data into k clusters where each object belongs to the cluster with the nearest centroid. Uses MinMax normalization for numerical data and One-Hot encoding for categorical data, with PCA for 2D visualization.',
  dataType: 'Mixed (Numerical + Categorical)',
  outputType: 'N Clusters',
  complexity: 'O(n*k*i) - Linear in objects',
  steps: [
    {
      title: 'Data Normalization',
      description:
        'Apply MinMax normalization to numerical parameters and One-Hot encoding to categorical parameters.',
    },
    {
      title: 'Centroid Initialization',
      description:
        'Randomly initialize k cluster centroids in the normalized feature space.',
    },
    {
      title: 'Assignment Step',
      description:
        'Assign each object to the nearest centroid using the selected distance metric.',
    },
    {
      title: 'Update Step',
      description:
        'Recalculate centroids as the mean of assigned objects. Repeat until convergence or max iterations.',
    },
    {
      title: 'Dimensionality Reduction',
      description:
        'Apply PCA to generate 2D coordinates for visualization while preserving cluster structure.',
    },
  ],
  commonParameters: COMMON_PARAMETERS,
  algorithmParameters: [
    {
      name: 'Number of Clusters',
      type: 'Integer',
      description: 'The number of clusters to create',
      range: '2 - 20',
      default: '5',
    },
    {
      name: 'Max Iterations',
      type: 'Integer',
      description: 'Maximum number of iterations before stopping',
      range: '10 - 1000',
      default: '40',
    },
    {
      name: 'Numeric Metric',
      type: 'Enum',
      description: 'Distance metric for numerical parameters',
      range: 'Euclidean, Manhattan, Cosine',
      default: 'Euclidean',
    },
    {
      name: 'Categorical Metric',
      type: 'Enum',
      description: 'Distance metric for categorical parameters',
      range: 'Hamming, Jaccard',
      default: 'Hamming',
    },
  ],
  bestFor: [
    'Market segmentation and customer groups',
    'Data organization and structure discovery',
    'Image segmentation and computer vision',
    'Gene sequencing and bioinformatics',
    'Quality control in manufacturing',
  ],
  limitations: [
    'Requires knowing the number of clusters beforehand',
    'Sensitive to initial centroid placement',
    'Assumes spherical clusters',
    'Struggles with clusters of different sizes',
    'May converge to local minima',
  ],
};

export const DBSCAN_DOCUMENTATION: AlgorithmDocumentation = {
  overview:
    'DBSCAN is a density-based clustering algorithm that groups together points that are closely packed while marking points in low-density regions as outliers. It can find arbitrarily shaped clusters and automatically determines the number of clusters.',
  dataType: 'Mixed (Numerical + Categorical)',
  outputType: 'N Clusters + Noise Cluster',
  complexity: 'O(n log n) - Near Linear',
  steps: [
    {
      title: 'Data Normalization',
      description:
        'Apply MinMax normalization to numerical parameters and One-Hot encoding to categorical parameters.',
    },
    {
      title: 'Neighbor Search',
      description:
        'For each point, find all points within epsilon distance using the selected distance metric.',
    },
    {
      title: 'Core Point Identification',
      description:
        'Identify core points that have at least minPoints neighbors within epsilon distance.',
    },
    {
      title: 'Cluster Formation',
      description:
        'Form clusters by connecting core points and their density-reachable points.',
    },
    {
      title: 'Noise Detection',
      description:
        'Points that are not core points and not density-reachable are marked as noise/outliers.',
    },
    {
      title: 'Dimensionality Reduction',
      description:
        'Apply PCA to generate 2D coordinates for visualization while preserving cluster structure.',
    },
  ],
  commonParameters: COMMON_PARAMETERS,
  algorithmParameters: [
    {
      name: 'Epsilon',
      type: 'Float',
      description:
        'Maximum distance between two points to be considered neighbors',
      range: '0.01 - 1.0',
      default: '0.2',
    },
    {
      name: 'Min Points',
      type: 'Integer',
      description: 'Minimum number of points required to form a cluster',
      range: '2 - 20',
      default: '2',
    },
    {
      name: 'Numeric Metric',
      type: 'Enum',
      description: 'Distance metric for numerical parameters',
      range: 'Euclidean, Manhattan, Cosine',
      default: 'Euclidean',
    },
    {
      name: 'Categorical Metric',
      type: 'Enum',
      description: 'Distance metric for categorical parameters',
      range: 'Hamming, Jaccard',
      default: 'Hamming',
    },
  ],
  bestFor: [
    'Anomaly and outlier detection',
    'Fraud detection systems',
    'Image processing and computer vision',
    'Spatial data analysis and GIS',
    'Network analysis and social media',
  ],
  limitations: [
    'Sensitive to epsilon and minPoints parameters',
    'Struggles with varying densities',
    'High-dimensional data can be problematic',
    'Performance depends on distance metric choice',
    'May create many small clusters with wrong parameters',
  ],
};

export const AGGLOMERATIVE_DOCUMENTATION: AlgorithmDocumentation = {
  overview:
    'Agglomerative clustering is a hierarchical clustering method that builds a tree of clusters by iteratively merging the closest pairs of clusters. It provides insight into data structure at different scales and creates a dendrogram showing the merge hierarchy.',
  dataType: 'Mixed (Numerical + Categorical)',
  outputType: 'N Hierarchical Clusters',
  complexity: 'O(n³) - Cubic',
  steps: [
    {
      title: 'Data Normalization',
      description:
        'Apply MinMax normalization to numerical parameters and One-Hot encoding to categorical parameters.',
    },
    {
      title: 'Distance Matrix',
      description:
        'Calculate pairwise distances between all objects using the selected distance metrics.',
    },
    {
      title: 'Initial Clusters',
      description:
        'Start with each object as its own cluster (n clusters for n objects).',
    },
    {
      title: 'Iterative Merging',
      description:
        'Repeatedly merge the two closest clusters until distance exceeds threshold or only one cluster remains.',
    },
    {
      title: 'Hierarchy Construction',
      description:
        'Build the dendrogram tree structure showing the order and distances of merges.',
    },
    {
      title: 'Dimensionality Reduction',
      description:
        'Apply PCA to generate 2D coordinates for visualization while preserving cluster structure.',
    },
  ],
  commonParameters: COMMON_PARAMETERS,
  algorithmParameters: [
    {
      name: 'Threshold',
      type: 'Float',
      description: 'Maximum distance at which clusters will be merged',
      range: '0.01 - 1.0',
      default: '0.2',
    },
    {
      name: 'Numeric Metric',
      type: 'Enum',
      description: 'Distance metric for numerical parameters',
      range: 'Euclidean, Manhattan, Cosine',
      default: 'Euclidean',
    },
    {
      name: 'Categorical Metric',
      type: 'Enum',
      description: 'Distance metric for categorical parameters',
      range: 'Hamming, Jaccard',
      default: 'Hamming',
    },
  ],
  bestFor: [
    'Exploring data structure at multiple scales',
    'Phylogenetic analysis in biology',
    'Market research and product categorization',
    'Social network analysis',
    'Document clustering and text analysis',
  ],
  limitations: [
    'Cubic time complexity - very slow on large datasets',
    'Sensitive to noise and outliers',
    'Difficult to handle different cluster shapes',
    'Once merged, clusters cannot be split',
    'Memory intensive for large datasets',
  ],
};
