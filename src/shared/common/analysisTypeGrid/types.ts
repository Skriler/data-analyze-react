export type AnalysisCardVariant = 'default' | 'compact' | 'modal';

export interface ColorScheme {
  gradient: string;
  lightGradient?: string;
  bg: string;
  border: string;
  selectedBorder: string;
  selectedBg: string;
  selectedRing: string;
  icon: string;
  selectedIcon: string;
  title: string;
  iconBg?: string;
  featureBg?: string;
  featureBorder?: string;
  accent?: string;
}

export interface VariantConfig {
  card: string;
  header: string;
  iconSize: string;
  iconInner: string;
  title: string;
  description: string;
  spacing: string;
}
