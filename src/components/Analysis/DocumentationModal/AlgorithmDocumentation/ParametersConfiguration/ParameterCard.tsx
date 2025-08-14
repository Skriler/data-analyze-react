import React from 'react';
import type { ParameterDoc } from '@shared/analysis/documentation';

interface ParameterCardProps {
  param: ParameterDoc;
  variant: 'common' | 'algorithm';
}

export const ParameterCard: React.FC<ParameterCardProps> = ({
  param,
  variant,
}) => (
  <div className="p-4 bg-slate-50 rounded-lg border">
    <div className="flex items-center justify-between mb-2">
      <h5 className="font-medium text-slate-900">{param.name}</h5>
      <span
        className={`text-xs px-2 py-1 rounded ${
          variant === 'common'
            ? 'bg-blue-100 text-blue-700'
            : 'bg-purple-100 text-purple-700'
        }`}
      >
        {param.type}
      </span>
    </div>
    <p className="text-sm text-slate-600 mb-2">{param.description}</p>
    {param.range && (
      <p className="text-xs text-slate-500">Range: {param.range}</p>
    )}
    {param.default && (
      <p className="text-xs text-slate-500">Default: {param.default}</p>
    )}
  </div>
);
