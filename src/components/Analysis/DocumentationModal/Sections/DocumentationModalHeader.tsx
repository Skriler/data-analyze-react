import React from 'react';
import { FileText } from 'lucide-react';
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@components/Ui/Dialog';

const DocumentationModalHeader: React.FC = () => {
  return (
    <DialogHeader className="px-8 pt-8 pb-6 border-b border-slate-200/60 flex-shrink-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <div>
            <DialogTitle className="text-2xl font-bold text-slate-900">
              Analysis Documentation
            </DialogTitle>
            <DialogDescription className="text-slate-600 mt-1">
              Learn how to use similarity analysis and clustering algorithms
            </DialogDescription>
          </div>
        </div>
      </div>
    </DialogHeader>
  );
};

export { DocumentationModalHeader };
