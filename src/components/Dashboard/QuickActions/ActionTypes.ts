import type { LucideIcon } from 'lucide-react';

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
