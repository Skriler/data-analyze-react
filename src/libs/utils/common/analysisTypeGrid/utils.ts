import {
  ANALYSIS_COLOR_SCHEMES,
  GRID_CONFIGS,
  VARIANT_CONFIGS,
  type AnalysisCardVariant,
  type ColorScheme,
  type VariantConfig,
} from '@shared/common/analysisTypeGrid';

export const getAnalysisColors = (id: string): ColorScheme => {
  return ANALYSIS_COLOR_SCHEMES[id] || ANALYSIS_COLOR_SCHEMES.similarity;
};

export const getVariantClasses = (
  variant: AnalysisCardVariant = 'default'
): VariantConfig => {
  return VARIANT_CONFIGS[variant];
};

export const getGridClasses = (
  variant: AnalysisCardVariant = 'default'
): string => {
  return GRID_CONFIGS[variant];
};
