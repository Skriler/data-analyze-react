import { Database, Users, Settings } from 'lucide-react';

export const STATS_CONFIG = [
  {
    key: 'totalObjects' as const,
    title: 'Total Objects',
    icon: Users,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    key: 'totalParameters' as const,
    title: 'Parameters',
    icon: Settings,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
  {
    key: 'numericParameters' as const,
    title: 'Numeric Parameters',
    icon: Database,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
  {
    key: 'categoricalParameters' as const,
    title: 'Categorical Parameters',
    icon: Database,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
  },
] as const;

export const DISPLAY_LIMITS = {
  OBJECTS: 10,
  PARAMETERS: 8,
  PARAMETERS_PER_OBJECT: 4,
} as const;

export const MAX_DISPLAYED_OBJECTS = DISPLAY_LIMITS.OBJECTS;
export const MAX_DISPLAYED_PARAMETERS_PER_OBJECT =
  DISPLAY_LIMITS.PARAMETERS_PER_OBJECT;
