import React from 'react';
import { Play } from 'lucide-react';
import { Button } from '@components/Ui/Button';
import type { DatasetDto } from '@api-types/dataset';

interface AnalysisModalFooterProps {
  dataset: DatasetDto;
  isLoading: boolean;
  onCancel: () => void;
  onSubmit: () => void;
}

const AnalysisModalFooter: React.FC<AnalysisModalFooterProps> = ({
  dataset,
  isLoading,
  onCancel,
  onSubmit,
}) => {
  return (
    <div className="border-t border-slate-200/60 bg-white px-8 py-6 flex-shrink-0">
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
            onClick={onCancel}
            className="border-slate-300 text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </Button>
          <Button
            onClick={onSubmit}
            disabled={isLoading}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Play className="h-4 w-4 mr-2" />
            {isLoading ? 'Running Analysis...' : 'Run Analysis'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export { AnalysisModalFooter };
