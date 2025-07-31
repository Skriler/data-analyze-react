import { AlertCircle } from 'lucide-react';

const DatasetsContentError: React.FC = () => (
  <div className="text-center py-8">
    <div className="flex flex-col items-center space-y-6">
      <div className="inline-flex items-center gap-2 px-6 py-3 text-white font-semibold rounded-xl bg-red-400 hover:bg-red-500 shadow-lg transition-all duration-200">
        <AlertCircle className="h-5 w-5" />
        Failed to load datasets
      </div>
    </div>
  </div>
);

export { DatasetsContentError };
