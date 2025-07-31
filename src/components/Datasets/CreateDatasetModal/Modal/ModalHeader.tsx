import { Database, Plus, Sparkles } from 'lucide-react';
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@components/Ui/Dialog';

const ModalHeader: React.FC = () => (
  <DialogHeader className="pb-6 border-b border-slate-200/60">
    <div className="flex items-center gap-4">
      <div className="relative">
        <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg">
          <Database className="h-6 w-6 text-white" />
        </div>
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
          <Plus className="h-2.5 w-2.5 text-white" />
        </div>
      </div>
      <div>
        <DialogTitle className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          Create New Dataset
          <Sparkles className="h-5 w-5 text-blue-500" />
        </DialogTitle>
        <DialogDescription className="text-sm text-slate-600 mt-2">
          Set up your dataset with parameters and data objects for comprehensive
          analysis
        </DialogDescription>
      </div>
    </div>
  </DialogHeader>
);

export { ModalHeader };
