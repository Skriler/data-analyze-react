import React from 'react';
import { Form } from '@components/Ui/Form';
import { Dialog, DialogContent } from '@components/Ui/Dialog';
import {
  AnalysisModalContent,
  AnalysisModalFooter,
  AnalysisModalHeader,
} from './Sections';
import { useParameterSettings } from '@hooks/features/analysis';
import { useAnalysisModal } from '@hooks/features/analysis';
import type { DatasetDto } from '@api-types/dataset';
import type { FormData as AnalysisFormData } from '@shared/analysis';

interface AnalysisModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  dataset: DatasetDto;
  selectedAnalysisType: string;
  onAnalysisTypeChange: (type: string) => void;
}

const AnalysisModal: React.FC<AnalysisModalProps> = ({
  open,
  onOpenChange,
  dataset,
  selectedAnalysisType,
  onAnalysisTypeChange,
}) => {
  const { parameterSettings, updateSetting } = useParameterSettings(dataset);

  const {
    form,
    analysisType,
    isLoading,
    updateFormParameterSettings,
    handleAnalysisTypeChange,
    submitAnalysis,
  } = useAnalysisModal({
    dataset,
    initialParameterSettings: parameterSettings,
    selectedAnalysisType,
    onAnalysisTypeChange,
    onClose: () => onOpenChange(false),
  });

  React.useEffect(() => {
    updateFormParameterSettings(parameterSettings);
  }, [parameterSettings]);

  const handleSubmit = (formData: AnalysisFormData) => {
    submitAnalysis(formData, parameterSettings);
  };

  const handleClose = () => onOpenChange(false);
  const activeParametersCount = parameterSettings.filter(
    s => s.isActive
  ).length;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl max-h-[95vh] p-0 bg-black/50 backdrop-blur-sm overflow-hidden">
        <div className="bg-white rounded-lg h-[95vh] flex flex-col">
          <AnalysisModalHeader />

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="flex flex-col flex-1 overflow-hidden"
            >
              <AnalysisModalContent
                form={form}
                analysisType={analysisType}
                dataset={dataset}
                parameterSettings={parameterSettings}
                onUpdateSetting={updateSetting}
                onAnalysisTypeChange={handleAnalysisTypeChange}
                activeParametersCount={activeParametersCount}
              />

              <AnalysisModalFooter
                dataset={dataset}
                isLoading={isLoading}
                onCancel={handleClose}
                onSubmit={form.handleSubmit(handleSubmit)}
              />
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export { AnalysisModal };
