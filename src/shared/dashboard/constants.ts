import { Database, CheckCircle2, Activity } from 'lucide-react';
import type { ActivityItemData } from './types';

export const DASHBOARD_CONSTANTS = {
  MAX_RECENT_DATASETS: 5,
  MAX_RECENT_ACTIVITIES: 10,
  ANIMATION_DURATION: 200,
  STATS_UPDATE_INTERVAL: 30000, // 30 seconds
} as const;

export const GREETING_HOURS = {
  NIGHT: 5,
  MORNING: 12,
  AFTERNOON: 18,
  EVENING: 24,
} as const;

export const GREETINGS = [
  { until: GREETING_HOURS.NIGHT, message: 'Good night' },
  { until: GREETING_HOURS.MORNING, message: 'Good morning' },
  { until: GREETING_HOURS.AFTERNOON, message: 'Good afternoon' },
  { until: GREETING_HOURS.EVENING, message: 'Good evening' },
] as const;

export const ACTIVITY_TYPES = {
  DATASET_CREATED: 'dataset_created',
  ANALYSIS_COMPLETED: 'analysis_completed',
  ANALYSIS_STARTED: 'analysis_started',
} as const;

export const DEFAULT_ACTIVITIES: ActivityItemData[] = [
  {
    id: 1,
    type: 'dataset_created',
    message: 'New dataset "Sales Q4" created',
    time: '2 hours ago',
    icon: Database,
    iconColor: 'text-blue-600',
    iconBg: 'bg-blue-100',
  },
  {
    id: 2,
    type: 'analysis_completed',
    message: 'Analysis completed for "Customer Data"',
    time: '4 hours ago',
    icon: CheckCircle2,
    iconColor: 'text-green-600',
    iconBg: 'bg-green-100',
  },
  {
    id: 3,
    type: 'analysis_started',
    message: 'Started analysis on "Product Performance"',
    time: '6 hours ago',
    icon: Activity,
    iconColor: 'text-orange-600',
    iconBg: 'bg-orange-100',
  },
] as const;

export const STAT_COLORS = {
  BLUE: {
    iconColor: 'text-white',
    iconBg: 'bg-blue-500',
    gradientBg: 'bg-gradient-to-br from-blue-50 to-blue-100',
  },
  GREEN: {
    iconColor: 'text-white',
    iconBg: 'bg-green-500',
    gradientBg: 'bg-gradient-to-br from-green-50 to-green-100',
  },
  PURPLE: {
    iconColor: 'text-white',
    iconBg: 'bg-purple-500',
    gradientBg: 'bg-gradient-to-br from-purple-50 to-purple-100',
  },
  ORANGE: {
    iconColor: 'text-white',
    iconBg: 'bg-orange-500',
    gradientBg: 'bg-gradient-to-br from-orange-50 to-orange-100',
  },
} as const;

export const QUICK_ACTION_COLORS = {
  CREATE_DATASET: {
    iconBgColor: 'bg-blue-500',
    iconColor: 'text-white',
    gradientBg: 'bg-gradient-to-r from-blue-50 to-blue-100',
  },
  RUN_ANALYSIS: {
    iconBgColor: 'bg-green-500',
    iconColor: 'text-white',
    gradientBg: 'bg-gradient-to-r from-green-50 to-green-100',
  },
  VIEW_RESULTS: {
    iconBgColor: 'bg-purple-500',
    iconColor: 'text-white',
    gradientBg: 'bg-gradient-to-r from-purple-50 to-purple-100',
  },
} as const;
