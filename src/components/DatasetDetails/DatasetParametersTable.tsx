import { Card, CardContent } from '@components/Ui/Card';
import { Badge } from '@components/Ui/Badge';
import type { ParameterDto } from '@api-types/dataset';

interface DatasetParametersTableProps {
  parameters: ParameterDto[];
}

function DatasetParametersTable({ parameters }: DatasetParametersTableProps) {
  return (
    <Card className="bg-white border border-gray-200 shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Parameters</h3>
          <Badge variant="outline" className="bg-gray-50 text-gray-600">
            {parameters.length} total
          </Badge>
        </div>

        <div className="space-y-2 max-h-96 overflow-y-auto">
          {parameters.map(parameter => (
            <div
              key={parameter.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border"
            >
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <span className="font-medium text-gray-900">
                  {parameter.name}
                </span>
              </div>
              <Badge
                variant={parameter.type === 'Numeric' ? 'default' : 'secondary'}
                className={
                  parameter.type === 'Numeric'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-green-100 text-green-800'
                }
              >
                {parameter.type}
              </Badge>
            </div>
          ))}
        </div>

        {parameters.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No parameters found
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export { DatasetParametersTable };
