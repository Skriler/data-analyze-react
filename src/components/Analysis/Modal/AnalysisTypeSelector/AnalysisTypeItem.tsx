import React from 'react';
import { RadioGroupItem } from '@components/Ui/RadioGroup';
import { Label } from '@components/Ui/Label';
import { Badge } from '@components/Ui/Badge';
import type { AnalysisTypeConfig } from '@shared/analysis';

interface AnalysisTypeItemProps {
  type: AnalysisTypeConfig;
  selected: boolean;
}

const AnalysisTypeItem: React.FC<AnalysisTypeItemProps> = ({
  type,
  selected,
}) => {
  return (
    <div key={type.id} className="relative">
      <RadioGroupItem
        value={type.id}
        id={type.id}
        className="absolute top-4 right-4 z-10 border-2 border-white shadow-sm data-[state=checked]:bg-white data-[state=checked]:border-blue-500"
      />

      <Label
        htmlFor={type.id}
        className={`
          block p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 group hover:shadow-xl hover:scale-[1.02] transform
          ${
            selected
              ? `border-${type.color}-400 bg-gradient-to-br from-${type.color}-50 to-${type.color}-100/50 shadow-lg ring-2 ring-${type.color}-200`
              : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
          }
        `}
      >
        <div className="flex items-center space-x-4 mb-4">
          <div
            className={`
              w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110
              ${
                selected
                  ? `bg-gradient-to-br from-${type.color}-500 to-${type.color}-600 shadow-lg`
                  : `bg-${type.color}-100 group-hover:bg-${type.color}-200`
              }
            `}
          >
            <type.icon
              className={`w-7 h-7 ${selected ? 'text-white' : `text-${type.color}-600`}`}
            />
          </div>
          <h4
            className={`font-bold text-lg ${selected ? `text-${type.color}-900` : 'text-slate-900'}`}
          >
            {type.name}
          </h4>
        </div>

        <p
          className={`text-sm mb-4 leading-relaxed ${selected ? `text-${type.color}-700` : 'text-slate-600'}`}
        >
          {type.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {type.features.slice(0, 2).map((feature, idx) => (
            <Badge
              key={idx}
              variant="secondary"
              className={`
                text-xs px-3 py-1 rounded-full font-medium
                ${
                  selected
                    ? `bg-${type.color}-200 text-${type.color}-800 border border-${type.color}-300`
                    : 'bg-slate-100 text-slate-700 border border-slate-200 group-hover:bg-slate-200'
                }
              `}
            >
              {feature}
            </Badge>
          ))}
        </div>

        {selected && (
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-transparent via-transparent to-white/20 pointer-events-none"></div>
        )}
      </Label>
    </div>
  );
};

export { AnalysisTypeItem };
