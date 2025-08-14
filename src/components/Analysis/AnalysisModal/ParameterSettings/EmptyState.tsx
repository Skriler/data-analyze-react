import React from 'react';
import { Hash } from 'lucide-react';
import { Card, CardContent } from '@components/Ui/Card';

const EmptyState: React.FC = () => {
  return (
    <Card className="border-2 border-dashed border-slate-300 bg-slate-50">
      <CardContent className="text-center py-8">
        <div className="w-12 h-12 mx-auto mb-3 bg-slate-200 rounded-xl flex items-center justify-center">
          <Hash className="w-6 h-6 text-slate-500" />
        </div>
        <h3 className="text-base font-semibold text-slate-900 mb-1">
          No Parameters Available
        </h3>
        <p className="text-sm text-slate-600">
          This dataset doesn't have any parameters to configure.
        </p>
      </CardContent>
    </Card>
  );
};

export { EmptyState };
