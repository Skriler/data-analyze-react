import type { LucideIcon } from 'lucide-react';

export interface NavigationItem {
  name: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
}

export interface LayoutContextType {
  title: string;
  subtitle?: string;
  setLayoutInfo: (title: string, subtitle?: string) => void;
}
