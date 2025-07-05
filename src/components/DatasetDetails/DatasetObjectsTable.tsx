import { useState } from 'react';
import { Card, CardContent } from '@components/Ui/Card';
import { Badge } from '@components/Ui/Badge';
import { Input } from '@components/Ui/Input';
import { Search } from 'lucide-react';
import type { DataObjectDto, ParameterDto } from '@api-types/dataset';

interface DatasetObjectsTableProps {
  objects: DataObjectDto[];
  parameters: ParameterDto[];
}

function DatasetObjectsTable({
  objects,
  parameters,
}: DatasetObjectsTableProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredObjects = objects.filter(obj =>
    obj.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getParameterValue = (obj: DataObjectDto, parameterId: number) => {
    const value = obj.values.find(v => v.parameterId === parameterId);
    return value?.value || '-';
  };

  return (
    <Card className="bg-white border border-gray-200 shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Data Objects</h3>
          <Badge variant="outline" className="bg-gray-50 text-gray-600">
            {objects.length} total
          </Badge>
        </div>

        <div className="mb-4">
          <div className="relative">
            <Input
              placeholder="Search objects..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-10 bg-white border-gray-200"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          </div>
        </div>

        <div className="max-h-96 overflow-auto">
          <div className="space-y-2">
            {filteredObjects.slice(0, 10).map((obj, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg border">
                <div className="font-medium text-gray-900 mb-2">{obj.name}</div>
                <div className="grid grid-cols-2 gap-2">
                  {parameters.slice(0, 4).map(param => (
                    <div key={param.id} className="text-sm">
                      <span className="text-gray-500">{param.name}:</span>
                      <span className="ml-1 text-gray-900">
                        {getParameterValue(obj, param.id)}
                      </span>
                    </div>
                  ))}
                </div>
                {parameters.length > 4 && (
                  <div className="mt-2 text-xs text-gray-500">
                    +{parameters.length - 4} more parameters
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredObjects.length > 10 && (
            <div className="mt-4 text-center text-sm text-gray-500">
              Showing 10 of {filteredObjects.length} objects
            </div>
          )}

          {filteredObjects.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              {searchQuery
                ? 'No objects match your search'
                : 'No objects found'}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export { DatasetObjectsTable };
