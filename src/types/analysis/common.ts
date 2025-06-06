/**
 * Represents settings for a specific parameter.
 */
export interface ParameterSettingsDto {
  ParameterId: number;
  IsActive: boolean;
  Weight: number;
}


/**
 * Represents a data object used in analysis.
 */
export interface DataObjectAnalysisDto {
  Id: number;
  Name: string;
  ParameterValues?: Record<string, string>;
}
