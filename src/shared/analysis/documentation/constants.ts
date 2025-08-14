import type { ParameterDoc } from './types';

export const COMMON_PARAMETERS: ParameterDoc[] = [
  {
    name: 'Parameter Activity',
    type: 'Boolean',
    description:
      'Controls whether a parameter is included in the analysis calculation',
    range: 'Active / Inactive',
  },
  {
    name: 'Parameter Weight',
    type: 'Number',
    description:
      'Relative importance of the parameter in the analysis (higher weight = more influence)',
    range: '0.1 - 10.0',
  },
  {
    name: 'Include Parameters',
    type: 'Boolean',
    description:
      'Whether to include parameter details in the analysis results output',
    range: 'True / False',
  },
];
