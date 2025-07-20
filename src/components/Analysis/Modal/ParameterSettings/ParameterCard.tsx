import React from 'react';
import { Hash, Type, Calendar } from 'lucide-react';
import { Checkbox } from '@components/Ui/Checkbox';
import { Label } from '@components/Ui/Label';
import { Slider } from '@components/Ui/Slider';
import { Badge } from '@components/Ui/Badge';
import { Card, CardContent } from '@components/Ui/Card';
import type { DatasetDto } from '@api-types/dataset';
import type { ParameterSettingsDto } from '@api-types/analysis';

interface ParameterCardProps {
  parameter: DatasetDto['parameters'][number];
  index: number;
  setting?: ParameterSettingsDto;
  showWeights: boolean;
  onUpdateSetting: (
    parameterId: number,
    field: 'isActive' | 'weight',
    value: boolean | number
  ) => void;
}

const getParameterIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case 'numeric':
      return Hash;
    case 'categorical':
      return Type;
    case 'date':
      return Calendar;
    default:
      return Hash;
  }
};

const getParameterColor = (type: string) => {
  switch (type.toLowerCase()) {
    case 'numeric':
      return 'blue';
    case 'categorical':
      return 'purple';
    case 'date':
      return 'green';
    default:
      return 'slate';
  }
};

const ParameterCard: React.FC<ParameterCardProps> = ({
  parameter,
  index,
  setting,
  showWeights,
  onUpdateSetting,
}) => {
  const IconComponent = getParameterIcon(parameter.type);
  const color = getParameterColor(parameter.type);
  const isActive = setting?.isActive ?? true;

  return (
    <Card
      className={`
        border transition-all duration-300 hover:shadow-md
        ${
          isActive
            ? 'border-blue-300 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-sm'
            : 'border-slate-200 bg-white hover:border-slate-300'
        }
      `}
    >
      <CardContent className="p-4">
        <div className="flex items-center space-x-3">
          <Checkbox
            checked={isActive}
            onCheckedChange={checked =>
              onUpdateSetting(parameter.id, 'isActive', !!checked)
            }
            className={`
              border-2 w-5 h-5 rounded
              ${
                isActive
                  ? 'border-blue-500 data-[state=checked]:bg-blue-500'
                  : 'border-slate-300'
              }
            `}
          />

          <div
            className={`
              w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300
              ${isActive ? `bg-${color}-500 shadow-sm` : `bg-${color}-100`}
            `}
          >
            <IconComponent
              className={`w-4 h-4 ${
                isActive ? 'text-white' : `text-${color}-600`
              }`}
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <Label className="font-medium text-slate-900 text-sm truncate">
                {parameter.name}
              </Label>
              <span className="text-xs text-slate-500 ml-2">#{index + 1}</span>
            </div>
            <Badge
              variant="secondary"
              className={`
                text-xs px-2 py-0.5 rounded font-medium mt-1
                ${
                  isActive
                    ? `bg-${color}-100 text-${color}-800 border-${color}-200`
                    : 'bg-slate-100 text-slate-600'
                }
              `}
            >
              {parameter.type}
            </Badge>
          </div>
        </div>

        {showWeights && isActive && (
          <div className="mt-4 pt-3 border-t border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <Label className="text-xs font-medium text-slate-700">
                Weight
              </Label>
              <Badge
                variant="outline"
                className="text-xs px-2 py-0.5 rounded font-mono border-blue-200 text-blue-700"
              >
                {(setting?.weight ?? 1).toFixed(1)}
              </Badge>
            </div>

            <Slider
              value={[setting?.weight ?? 1]}
              onValueChange={([value]) =>
                onUpdateSetting(parameter.id, 'weight', value)
              }
              min={0}
              max={2}
              step={0.1}
              className="w-full"
            />

            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>0</span>
              <span>1</span>
              <span>2</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export { ParameterCard };
