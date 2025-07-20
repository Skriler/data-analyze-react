import React from 'react';
import { Sparkles, X } from 'lucide-react';
import { Button } from '@components/Ui/Button';
import { DialogHeader, DialogTitle } from '@components/Ui/Dialog';

interface AnalysisModalHeaderProps {
  onClose: () => void;
}

const AnalysisModalHeader: React.FC<AnalysisModalHeaderProps> = ({
  onClose,
}) => {
  return (
    <DialogHeader className="px-6 pt-6 pb-4 border-b border-slate-200/60 flex-shrink-0">
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
          onClick={onClose}
          className="h-8 w-8 p-0 hover:bg-slate-100 rounded-full"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </DialogHeader>
  );
};

export { AnalysisModalHeader };
