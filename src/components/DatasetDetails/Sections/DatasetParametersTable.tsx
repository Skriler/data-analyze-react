import React, { useState } from 'react';
import { Search, Hash, Type } from 'lucide-react';
import { Card, CardContent } from '@components/Ui/Card';
import { Badge } from '@components/Ui/Badge';
import { Input } from '@components/Ui/Input';
import type { ParameterDto } from '@api-types/dataset';

interface DatasetParametersTableProps {
  parameters: ParameterDto[];
}

const DatasetParametersTable: React.FC<DatasetParametersTableProps> = ({
  parameters,
}) => {
  const [parameterFilter, setParameterFilter] = useState('');

  const filteredParameters = parameters.filter(param =>
    param.name.toLowerCase().includes(parameterFilter.toLowerCase())
  );

  const numericCount = parameters.filter(p => p.type === 'Numeric').length;
  const categoricalCount = parameters.filter(
    p => p.type === 'Categorical'
  ).length;

  return (
    <Card className="bg-white rounded-xl border border-gray-200 shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900">Parameters</h3>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 text-xs text-gray-600">
              <Hash className="h-3 w-3 text-blue-600" />
              <span>{numericCount}</span>
            </div>
            <div className="flex items-center space-x-1 text-xs text-gray-600">
              <Type className="h-3 w-3 text-green-600" />
              <span>{categoricalCount}</span>
            </div>
            <Badge
              variant="outline"
              className="bg-gray-100 text-gray-600 px-2 py-0.5 text-xs"
            >
              {parameters.length} total
            </Badge>
          </div>
        </div>

        <div className="mb-3">
          <div className="relative">
            <Input
              placeholder="Search parameters..."
              value={parameterFilter}
              onChange={e => setParameterFilter(e.target.value)}
              className="pl-8 h-8 text-sm bg-white border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 h-3 w-3" />
          </div>
        </div>

        {filteredParameters.length === 0 ? (
          <div className="text-center py-6 text-gray-500 text-sm">
            {parameterFilter
              ? 'No parameters match your search'
              : 'No parameters found'}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 max-h-60 overflow-y-auto">
            {filteredParameters.map(parameter => (
              <div
                key={parameter.id}
                className="flex items-center justify-between p-2 bg-gray-50 rounded-md border hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-2 min-w-0 flex-1">
                  <div
                    className={`w-1.5 h-1.5 rounded-full ${
                      parameter.type === 'Numeric'
                        ? 'bg-blue-500'
                        : 'bg-green-500'
                    }`}
                  ></div>
                  <span
                    className="font-medium text-gray-900 text-xs truncate"
                    title={parameter.name}
                  >
                    {parameter.name}
                  </span>
                </div>
                <Badge
                  variant={
                    parameter.type === 'Numeric' ? 'default' : 'secondary'
                  }
                  className={`px-1.5 py-0.5 text-xs font-medium ml-1 ${
                    parameter.type === 'Numeric'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-green-100 text-green-800'
                  }`}
                >
                  {parameter.type === 'Numeric' ? 'N' : 'C'}
                </Badge>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export { DatasetParametersTable };
