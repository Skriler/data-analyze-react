import React from 'react';
import { Hash } from 'lucide-react';
import { Card, CardContent } from '@components/Ui/Card';

const EmptyState: React.FC = () => {
  return (
    <Card className="border-2 border-dashed border-slate-200 bg-slate-50/50">
      <CardContent className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 rounded-2xl flex items-center justify-center">
          <Hash className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900 mb-2">
          No Parameters Available
        </h3>
        <p className="text-slate-600">
          This dataset doesn't have any parameters to configure.
        </p>
      </CardContent>
    </Card>
  );
};

export { EmptyState };
