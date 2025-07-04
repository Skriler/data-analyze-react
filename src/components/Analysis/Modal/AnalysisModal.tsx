import React from 'react';
import { Play } from 'lucide-react';
import { Button } from '@components/Ui/Button';
import { Form } from '@components/Ui/Form';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@components/Ui/Dialog';
import { AnalysisTypeSelector } from './AnalysisTypeSelector';
import { ParameterSettings } from './ParameterSettings';
import { AlgorithmSettings } from './AlgorithmSettings';
import { useAnalysisSubmit } from '@hooks/features/analysis/useAnalysisSubmit';
import { useParameterSettings } from '@hooks/features/analysis/useParameterSettings';
import { useAnalysisForm } from '@hooks/features/analysis/useAnalysisForm';
import type { DatasetDto } from '@api-types/dataset';

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
  const { parameterSettings, updateParameterSetting } =
    useParameterSettings(dataset);

  const { form, analysisType, updateFormParameterSettings } =
    useAnalysisForm(parameterSettings);

  const { submitAnalysis, isLoading } = useAnalysisSubmit(dataset, () =>
    onOpenChange(false)
  );

  React.useEffect(() => {
    updateFormParameterSettings(parameterSettings);
  }, [parameterSettings, updateFormParameterSettings]);

  const handleSubmit = (formData: any) => {
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
