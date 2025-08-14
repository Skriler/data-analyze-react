import React from 'react';
import { EmptyState } from './EmptyState';
import { ParameterCard } from './ParameterCard';
import type { DatasetDto } from '@api-types/dataset';
import type { ParameterSettingsDto } from '@api-types/analysis';
import type { FormData } from '@shared/analysis';
import { Card, CardContent } from '@components/Ui/Card';

interface ParameterSettingsProps {
  dataset: DatasetDto;
  parameterSettings: ParameterSettingsDto[];
  onUpdateSetting: (
    parameterId: number,
    field: 'isActive' | 'weight',
    value: boolean | number
  ) => void;
  analysisType: FormData['type'];
}

const ParameterSettings: React.FC<ParameterSettingsProps> = ({
  dataset,
  parameterSettings,
  onUpdateSetting,
  analysisType,
}) => {
  const showWeights = analysisType === 'similarity';

  if (dataset.parameters.length === 0) {
    return (
      <Card className="border-2 border-slate-200 bg-gradient-to-br from-white to-slate-50/50 shadow-sm h-full">
        <CardContent className="h-full flex items-center justify-center">
          <EmptyState />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-2 border-slate-200 bg-gradient-to-br from-white to-slate-50/50 shadow-sm flex flex-col">
      <CardContent className="p-6 flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto pr-2">
          <div className="space-y-3">
            {dataset.parameters.map((parameter, index) => {
              const setting = parameterSettings.find(
                s => s.parameterId === parameter.id
              );

              return (
                <ParameterCard
                  key={parameter.id}
                  parameter={parameter}
                  index={index}
                  setting={setting}
                  showWeights={showWeights}
                  onUpdateSetting={onUpdateSetting}
                />
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export { ParameterSettings };
