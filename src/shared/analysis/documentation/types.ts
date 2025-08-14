export interface ParameterDoc {
  name: string;
  type: string;
  description: string;
  range?: string;
  default?: string;
}

export interface StepDoc {
  title: string;
  description: string;
}

export interface AlgorithmDocumentation {
  overview: string;
  dataType: string;
  outputType: string;
  complexity: string;
  steps: StepDoc[];
  commonParameters: ParameterDoc[];
  algorithmParameters: ParameterDoc[];
  bestFor: string[];
  limitations: string[];
}
