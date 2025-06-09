/**
 * DTOs used for reading datasets and their related data structures.
 */
export interface DatasetDto {
  Id: number;
  Name: string;
  CreatedAt: string;
  Parameters: ParameterDto[];
  Objects: DataObjectDto[];
}

export interface ParameterDto {
  Id: number;
  Name: string;
  Type: ParameterType;
}

export interface DataObjectDto {
  Name: string;
  Values: ParameterValueDto[];
}

export interface ParameterValueDto {
  ParameterId: number;
  Value: string;
}

export type ParameterType = 'Numeric' | 'Categorical';

/**
 * DTOs used for creating datasets and related data objects.
 */
export interface DatasetCreateDto {
  Name: string;
  Parameters: string[];
  Objects: DataObjectCreateDto[];
}

export interface DataObjectCreateDto {
  Name: string;
  Values: string[];
}
