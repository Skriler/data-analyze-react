import React from 'react';
import { Info, CheckCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@components/Ui/Card';
import { UseCaseList } from './UseCaseList';

interface UseCasesSectionProps {
  bestFor: string[];
  limitations: string[];
}

const UseCases: React.FC<UseCasesSectionProps> = ({ bestFor, limitations }) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-3">
          <Info className="h-6 w-6 text-slate-600" />
          <CardTitle className="text-xl font-bold text-slate-900">
            When to Use
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Best For */}
          <div>
            <h4 className="font-semibold text-slate-900 mb-3 flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>Best For</span>
            </h4>
            <UseCaseList items={bestFor} type="best" />
          </div>

          {/* Limitations */}
          <div>
            <h4 className="font-semibold text-slate-900 mb-3 flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-orange-500" />
              <span>Limitations</span>
            </h4>
            <UseCaseList items={limitations} type="limitations" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export { UseCases };
