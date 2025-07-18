import React from 'react';
import { EmptyState } from './EmptyState';
import { ParameterCard } from './ParameterCard';
import type { DatasetDto } from '@api-types/dataset';
import type { ParameterSettingsDto } from '@api-types/analysis';
import type { FormData } from '@shared/analysis';

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
    return <EmptyState />;
  }

  return (
    <div className="space-y-4">
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
  );
};

export { ParameterSettings };
