import type { LucideIcon } from 'lucide-react';
import type { DatasetDto } from '@api-types/dataset';

export interface QuickAction {
  title: string;
  description: string;
  icon: LucideIcon;
  iconBgColor: string;
  iconColor: string;
  gradientBg: string;
  onClick?: () => void;
}

export interface QuickActionsCallbacks {
  onCreateDataset?: () => void;
  onRunAnalysis?: () => void;
  onViewResults?: () => void;
}

export interface ActivityItemData {
  id: number;
  type: 'dataset_created' | 'analysis_completed' | 'analysis_started';
  message: string;
  time: string;
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
}

export interface StatItem {
  title: string;
  value: number;
  icon: LucideIcon;
  description: string;
  iconColor: string;
  iconBg: string;
  gradientBg: string;
}

export interface DashboardStats {
  totalDatasets: number;
  totalObjects: number;
  totalParameters: number;
  avgObjectsPerDataset: number;
}

export interface DashboardActions {
  handleCreateDataset: () => void;
  handleRunAnalysis: () => void;
  handleViewResults: () => void;
  handleViewDataset: (datasetId: number) => void;
}

export interface DashboardData {
  datasets: DatasetDto[];
  stats: DashboardStats;
  activities: ActivityItemData[];
}

export interface DashboardState {
  data: DashboardData;
  isLoading: boolean;
  error: string | null;
  actions: DashboardActions;
}
