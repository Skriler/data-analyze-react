/**
 * Represents settings for a specific parameter.
 */
export interface ParameterSettingsDto {
  parameterId: number;
  isActive: boolean;
  weight: number;
}

/**
 * Represents a data object used in analysis.
 */
export interface DataObjectAnalysisDto {
  id: number;
  name: string;
  parameterValues?: Record<string, string>;
}
