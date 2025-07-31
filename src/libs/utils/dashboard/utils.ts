import { Database, Users, Activity, TrendingUp } from 'lucide-react';
import type { DatasetDto } from '@api-types/dataset';
import {
  GREETINGS,
  STAT_COLORS,
  QUICK_ACTION_COLORS,
  type StatItem,
  type DashboardStats,
  type QuickAction,
} from '@shared/dashboard';

/**
 * Get greeting message based on current hour
 */
export const getGreeting = (hour = new Date().getHours()): string => {
  return GREETINGS.find(g => hour < g.until)?.message ?? 'Hello';
};

/**
 * Generate welcome message with greeting and username
 */
export const generateWelcomeMessage = (username?: string): string => {
  const greeting = getGreeting();
  const displayName = username || 'User';
  return `${greeting}, ${displayName}`;
};

/**
 * Calculate dashboard statistics from datasets
 */
export const calculateDashboardStats = (
  datasets?: DatasetDto[]
): DashboardStats => {
  if (!datasets || datasets.length === 0) {
    return {
      totalDatasets: 0,
      totalObjects: 0,
      totalParameters: 0,
      avgObjectsPerDataset: 0,
    };
  }

  const totalObjects = datasets.reduce((acc, ds) => acc + ds.objects.length, 0);
  const totalParameters = datasets.reduce(
    (acc, ds) => acc + ds.parameters.length,
    0
  );
  const avgObjectsPerDataset = Math.round(totalObjects / datasets.length);

  return {
    totalDatasets: datasets.length,
    totalObjects,
    totalParameters,
    avgObjectsPerDataset,
  };
};

/**
 * Convert dashboard stats to StatItem array for display
 */
export const createStatItems = (stats: DashboardStats): StatItem[] => {
  return [
    {
      title: 'Total Datasets',
      value: stats.totalDatasets,
      icon: Database,
      description: 'Active datasets in system',
      ...STAT_COLORS.BLUE,
    },
    {
      title: 'Objects',
      value: stats.totalObjects,
      icon: Users,
      description: 'Total objects',
      ...STAT_COLORS.GREEN,
    },
    {
      title: 'Parameters',
      value: stats.totalParameters,
      icon: Activity,
      description: 'Total parameters tracked',
      ...STAT_COLORS.PURPLE,
    },
    {
      title: 'Avg Objects/Dataset',
      value: stats.avgObjectsPerDataset,
      icon: TrendingUp,
      description: 'Average objects per dataset',
      ...STAT_COLORS.ORANGE,
    },
  ];
};

/**
 * Create quick action items with callbacks
 */
export const createQuickActions = (callbacks: {
  onCreateDataset?: () => void;
  onRunAnalysis?: () => void;
  onViewResults?: () => void;
}): QuickAction[] => {
  return [
    {
      title: 'Create Dataset',
      description: 'Add a new dataset for comprehensive analysis',
      icon: Database,
      onClick: callbacks.onCreateDataset,
      ...QUICK_ACTION_COLORS.CREATE_DATASET,
    },
    {
      title: 'Run Analysis',
      description: 'Analyze existing datasets with advanced algorithms',
      icon: Activity,
      onClick: callbacks.onRunAnalysis,
      ...QUICK_ACTION_COLORS.RUN_ANALYSIS,
    },
    {
      title: 'View Results',
      description: 'Check analysis results and generate insights',
      icon: TrendingUp,
      onClick: callbacks.onViewResults,
      ...QUICK_ACTION_COLORS.VIEW_RESULTS,
    },
  ];
};

/**
 * Limit array to maximum number of items
 */
export const limitArrayItems = <T>(items: T[], maxItems: number): T[] => {
  return items.slice(-maxItems).reverse();
};

/**
 * Format number with locale-specific formatting
 */
export const formatNumber = (value: number): string => {
  return value.toLocaleString();
};

/**
 * Check if datasets array is empty or undefined
 */
export const isDatasetsEmpty = (datasets?: DatasetDto[]): boolean => {
  return !datasets || datasets.length === 0;
};

/**
 * Get display datasets with limit
 */
export const getDisplayDatasets = (
  datasets?: DatasetDto[],
  maxItems = 5
): DatasetDto[] => {
  if (!datasets) return [];
  return limitArrayItems(datasets, maxItems);
};
