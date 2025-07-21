import { BarChart3, Database, Home, Search } from 'lucide-react';
import type { NavigationItem } from './types';

export const DEFAULT_NAVIGATION: NavigationItem[] = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Datasets', href: '/datasets', icon: Database },
  { name: 'Analysis', href: '/analysis', icon: BarChart3 },
  { name: 'Results', href: '/results', icon: Search },
];

export const DEFAULT_LAYOUT_TITLE = 'Data Analysis Platform';
