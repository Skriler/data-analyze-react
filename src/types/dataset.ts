// === DTOs used for reading datasets and their related data structures ===

export interface DatasetDto {
  id: number;
  name: string;
  createdAt: string;
  parameters: ParameterDto[];
  objects: DataObjectDto[];
}

export interface ParameterDto {
  id: number;
  name: string;
  type: ParameterType;
}

export interface DataObjectDto {
  name: string;
  values: ParameterValueDto[];
}

export interface ParameterValueDto {
  parameterId: number;
  value: string;
}

export type ParameterType = 'Numeric' | 'Categorical';

// === DTOs used for creating datasets and related data objects ===

export interface DatasetCreateDto {
  name: string;
  parameters: string[];
  objects: DataObjectCreateDto[];
}

export interface DataObjectCreateDto {
  name: string;
  values: string[];
}
