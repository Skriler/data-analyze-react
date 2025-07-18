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
        border-2 transition-all duration-300 group
        ${
          isActive
            ? 'border-blue-200 bg-gradient-to-r from-blue-50/50 to-purple-50/30 shadow-sm hover:shadow-md'
            : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
        }
      `}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <Checkbox
              checked={isActive}
              onCheckedChange={checked =>
                onUpdateSetting(parameter.id, 'isActive', !!checked)
              }
              className="border-2 border-slate-300 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
            />

            <div className="flex items-center space-x-3">
              <div
                className={`
                  w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300
                  ${
                    isActive
                      ? `bg-${color}-500 shadow-lg group-hover:shadow-xl`
                      : `bg-${color}-100 group-hover:bg-${color}-200`
                  }
                `}
              >
                <IconComponent
                  className={`w-5 h-5 transition-colors duration-300 ${
                    isActive ? 'text-white' : `text-${color}-600`
                  }`}
                />
              </div>

              <div className="min-w-0">
                <Label className="font-semibold text-slate-900 text-base block">
                  {parameter.name}
                </Label>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge
                    variant="secondary"
                    className={`
                      text-xs px-2 py-1 rounded-full font-medium
                      ${
                        isActive
                          ? `bg-${color}-100 text-${color}-800 border border-${color}-200`
                          : 'bg-slate-100 text-slate-600 border border-slate-200'
                      }
                    `}
                  >
                    {parameter.type}
                  </Badge>
                  <span className="text-xs text-slate-500">#{index + 1}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {showWeights && (
          <div
            className={`
              transition-all duration-300 pt-4 border-t border-slate-200
              ${isActive ? 'opacity-100' : 'opacity-40'}
            `}
          >
            <div className="flex items-center justify-between mb-3">
              <Label className="text-sm font-semibold text-slate-700">
                Weight
              </Label>
              <Badge
                variant="outline"
                className={`
                  text-xs px-2 py-1 rounded-full font-mono
                  ${
                    isActive
                      ? 'border-blue-300 text-blue-700'
                      : 'border-slate-300 text-slate-600'
                  }
                `}
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
              disabled={!isActive}
            />

            <div className="flex justify-between text-xs text-slate-500 mt-2">
              <span className="font-medium">0</span>
              <span className="font-medium">1</span>
              <span className="font-medium">2</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export { ParameterCard };
