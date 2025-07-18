import { Database } from 'lucide-react';

function DatasetGridEmpty() {
  return (
    <div className="text-center py-20">
      <div className="mx-auto w-24 h-24 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl flex items-center justify-center mb-8">
        <Database className="h-12 w-12 text-blue-600" />
      </div>
      <h3 className="text-2xl font-semibold text-gray-900 mb-4">
        No datasets found
      </h3>
      <p className="text-gray-500 mb-8 max-w-md mx-auto text-lg">
        Get started by creating your first dataset. Add your data and start
        analyzing patterns.
      </p>
    </div>
  );
}

export { DatasetGridEmpty };
