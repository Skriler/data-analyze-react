import React from 'react';
import { Play, Sparkles, X } from 'lucide-react';
import { Button } from '@components/Ui/Button';
import { Form } from '@components/Ui/Form';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@components/Ui/Dialog';
import { AnalysisTypeSelector } from '../TypeSelector';
import { ParameterSettings } from '../ParameterSettings';
import { AlgorithmSettings } from '../AlgorithmSettings';
import { useParameterSettings } from '@hooks/features/analysis';
import { useAnalysisModal } from '@hooks/features/analysis';
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
  const { parameterSettings, updateSetting } = useParameterSettings(dataset);

  const {
    form,
    analysisType,
    isLoading,
    updateFormParameterSettings,
    submitAnalysis,
  } = useAnalysisModal({
    dataset,
    initialParameterSettings: parameterSettings,
    onClose: () => onOpenChange(false),
  });

  React.useEffect(() => {
    updateFormParameterSettings(parameterSettings);
  }, [parameterSettings, updateFormParameterSettings]);

  const handleSubmit = (formData: any) => {
    submitAnalysis(formData, parameterSettings);
  };

  const hasAlgorithmSettings = analysisType !== 'similarity';
  const activeParametersCount = parameterSettings.filter(
    s => s.isActive
  ).length;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl max-h-[95vh] overflow-hidden p-0 bg-gradient-to-br from-slate-50 to-blue-50/30">
        {/* Header */}
        <DialogHeader className="px-8 pt-8 pb-6 border-b border-slate-200/60">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <DialogTitle className="text-2xl font-bold text-slate-900">
                  Analysis Configuration
                </DialogTitle>
                <p className="text-slate-600 mt-1">
                  Configure analysis parameters for comprehensive data insights
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onOpenChange(false)}
              className="h-8 w-8 p-0 hover:bg-slate-100 rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col h-full"
          >
            {/* Content */}
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
                  <AnalysisTypeSelector control={form.control as any} />
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
                        control={form.control as any}
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
                          {activeParametersCount} of {dataset.parameters.length}{' '}
                          active
                        </span>
                      </div>
                    </div>
                    <ParameterSettings
                      dataset={dataset}
                      parameterSettings={parameterSettings}
                      onUpdateSetting={updateSetting}
                      analysisType={analysisType}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-slate-200/60 bg-white/80 backdrop-blur-sm px-8 py-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6 text-sm text-slate-600">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span>{dataset.parameters.length} parameters</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>{dataset.objects?.length || 0} objects</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Button
                    variant="outline"
                    onClick={() => onOpenChange(false)}
                    className="border-slate-300 text-slate-700 hover:bg-slate-50"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={form.handleSubmit(handleSubmit)}
                    disabled={isLoading}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    {isLoading ? 'Running Analysis...' : 'Run Analysis'}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export { AnalysisModal };
