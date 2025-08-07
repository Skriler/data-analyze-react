import React from 'react';
import type { UseFormReturn } from 'react-hook-form';
import { ParameterSettings } from '../ParameterSettings';
import { AlgorithmSettings } from '../AlgorithmSettings';
import { AnalysisTypeGrid } from '@components/Common/AnalysisTypeGrid';
import type { DatasetDto } from '@api-types/dataset';
import type { ParameterSettingsDto } from '@api-types/analysis';
import type { FormData } from '@shared/analysis';

interface AnalysisModalContentProps {
  form: UseFormReturn<FormData>;
  analysisType: FormData['type'];
  dataset: DatasetDto;
  parameterSettings: ParameterSettingsDto[];
  onUpdateSetting: (
    parameterId: number,
    field: 'isActive' | 'weight',
    value: boolean | number
  ) => void;
  onAnalysisTypeChange: (type: string) => void;
  activeParametersCount: number;
}

const AnalysisModalContent: React.FC<AnalysisModalContentProps> = ({
  form,
  analysisType,
  dataset,
  parameterSettings,
  onUpdateSetting,
  onAnalysisTypeChange,
  activeParametersCount,
}) => {
  const hasAlgorithmSettings = analysisType !== 'similarity';

  return (
    <div className="flex-1 overflow-y-auto px-8 py-6">
      <div className="space-y-8">
        {/* Analysis Type Selection */}
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <h3 className="text-lg font-semibold text-slate-900">
              Choose Analysis Type
            </h3>
          </div>
          <AnalysisTypeGrid
            selectedAnalysisType={form.watch('type')}
            onAnalysisTypeSelect={onAnalysisTypeChange}
            showDetails={false}
            variant="modal"
          />
        </div>

        {/* Settings Grid */}
        <div
          className={`grid gap-8 ${hasAlgorithmSettings ? 'lg:grid-cols-2' : 'lg:grid-cols-1'}`}
        >
          {/* Algorithm Settings */}
          {hasAlgorithmSettings && (
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <h3 className="text-lg font-semibold text-slate-900">
                  Algorithm Settings
                </h3>
              </div>
              <AlgorithmSettings
                control={form.control}
                analysisType={analysisType}
              />
            </div>
          )}

          {/* Parameter Settings */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <h3 className="text-lg font-semibold text-slate-900">
                  Parameter Settings
                </h3>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm font-medium text-slate-700">
                  {activeParametersCount} of {dataset.parameters.length} active
                </span>
              </div>
            </div>
            <ParameterSettings
              dataset={dataset}
              parameterSettings={parameterSettings}
              onUpdateSetting={onUpdateSetting}
              analysisType={analysisType}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export { AnalysisModalContent };
