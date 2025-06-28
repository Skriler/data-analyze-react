import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Play } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@components/Ui/Button';
import { Form } from '@components/Ui/Form';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@components/Ui/Dialog';
import type { DatasetDto } from '@api-types/dataset';
import type { ParameterSetting } from './analysis';
import { AnalysisTypeSelector } from './AnalysisTypeSelector';
import { ParameterSettings } from './ParameterSettings';
import { AlgorithmSettings } from './AlgorithmSettings';
import { analysisSchema, type FormData } from './analysisSchema';
import { useAnalysisSubmit } from './useAnalysisSubmit';

interface AnalysisModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  dataset: DatasetDto;
}

const AnalysisModal: React.FC<AnalysisModalProps> = ({
  open,
  onOpenChange,
  dataset,
}) => {
  const [parameterSettings, setParameterSettings] = useState<
    ParameterSetting[]
  >(
    dataset.parameters.map(param => ({
      parameterId: param.id,
      isActive: true,
      weight: 1,
    }))
  );

  const form = useForm({
    resolver: zodResolver(analysisSchema),
    defaultValues: {
      type: 'similarity' as const,
      includeParameters: true,
      parameterSettings,
      numberOfClusters: 3,
      maxIterations: 300,
      epsilon: 0.5,
      minPoints: 5,
      threshold: 1.5,
      numericMetric: 'Euclidean' as const,
      categoricalMetric: 'Hamming' as const,
    },
  });

  const { submitAnalysis, isLoading } = useAnalysisSubmit(dataset, () =>
    onOpenChange(false)
  );

  const analysisType = form.watch('type') as FormData['type'];

  const updateParameterSetting = (
    parameterId: number,
    field: 'isActive' | 'weight',
    value: boolean | number
  ) => {
    setParameterSettings(prev =>
      prev.map(setting =>
        setting.parameterId === parameterId
          ? { ...setting, [field]: value }
          : setting
      )
    );

    const updatedSettings = parameterSettings.map(setting =>
      setting.parameterId === parameterId
        ? { ...setting, [field]: value }
        : setting
    );
    form.setValue('parameterSettings', updatedSettings);
  };

  const handleSubmit = (data: any) => {
    const formData = data as FormData;
    submitAnalysis(formData, parameterSettings);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Analysis Configuration</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6 overflow-y-auto max-h-[60vh] pr-2"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <AnalysisTypeSelector control={form.control as any} />
              <div>
                <ParameterSettings
                  dataset={dataset}
                  parameterSettings={parameterSettings}
                  onUpdateSetting={updateParameterSetting}
                />
                <AlgorithmSettings
                  control={form.control as any}
                  analysisType={analysisType}
                />
              </div>
            </div>
          </form>
        </Form>

        <div className="flex items-center justify-end space-x-4 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={form.handleSubmit(handleSubmit)}
            disabled={isLoading}
            className="flex items-center space-x-2"
          >
            <Play className="h-4 w-4" />
            <span>{isLoading ? 'Running Analysis...' : 'Run Analysis'}</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export { AnalysisModal };
