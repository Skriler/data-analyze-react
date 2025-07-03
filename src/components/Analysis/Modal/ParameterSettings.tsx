import React from 'react';
import { Checkbox } from '@components/Ui/Checkbox';
import { Label } from '@components/Ui/Label';
import { Slider } from '@components/Ui/Slider';
import type { DatasetDto } from '@api-types/dataset';
import type { ParameterSettingsDto } from '@api-types/analysis';

interface ParameterSettingsProps {
  dataset: DatasetDto;
  parameterSettings: ParameterSettingsDto[];
  onUpdateSetting: (
    parameterId: number,
    field: 'isActive' | 'weight',
    value: boolean | number
  ) => void;
}

const ParameterSettings: React.FC<ParameterSettingsProps> = ({
  dataset,
  parameterSettings,
  onUpdateSetting,
}) => {
  return (
    <div>
      <h4 className="text-lg font-medium text-gray-900 mb-4">
        Parameter Settings
      </h4>
      <div className="space-y-4">
        {dataset.parameters.map(parameter => {
          const setting = parameterSettings.find(
            s => s.parameterId === parameter.id
          );
          return (
            <div
              key={parameter.id}
              className="p-4 border border-gray-200 rounded-lg"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    checked={setting?.isActive ?? true}
                    onCheckedChange={checked =>
                      onUpdateSetting(parameter.id, 'isActive', !!checked)
                    }
                  />
                  <div>
                    <p className="font-medium text-gray-900">
                      {parameter.name}
                    </p>
                    <p className="text-sm text-gray-600">{parameter.type}</p>
                  </div>
                </div>
                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                  {parameter.type}
                </span>
              </div>
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">
                  Weight: {setting?.weight ?? 1}
                </Label>
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
                <div className="flex justify-between text-xs text-gray-600 mt-1">
                  <span>0</span>
                  <span>1</span>
                  <span>2</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export { ParameterSettings };
