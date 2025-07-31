import { useState } from 'react';
import { Search } from 'lucide-react';
import { Card, CardContent } from '@components/Ui/Card';
import { Badge } from '@components/Ui/Badge';
import { Input } from '@components/Ui/Input';
import type { DataObjectDto, ParameterDto } from '@api-types/dataset';

interface DatasetObjectsTableProps {
  objects: DataObjectDto[];
  parameters: ParameterDto[];
}

const DatasetObjectsTable: React.FC<DatasetObjectsTableProps> = ({
  objects,
  parameters,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredObjects = objects.filter(obj =>
    obj.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getParameterValue = (obj: DataObjectDto, parameterId: number) => {
    const value = obj.values.find(v => v.parameterId === parameterId);
    return value?.value || '-';
  };

  return (
    <Card className="bg-white rounded-xl border border-gray-200 shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Data Objects</h3>
          <Badge
            variant="outline"
            className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full"
          >
            {objects.length} total
          </Badge>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Input
              placeholder="Search objects..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-10 bg-white border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          </div>
        </div>

        {filteredObjects.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            {searchQuery ? 'No objects match your search' : 'No objects found'}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 bg-gray-50">
                    Object Name
                  </th>
                  {parameters.map(param => (
                    <th
                      key={param.id}
                      className="text-left py-2 px-3 font-semibold text-gray-900 bg-gray-50 min-w-[100px] max-w-[120px]"
                      title={param.name}
                    >
                      <div className="truncate text-sm">
                        {param.name.length > 12
                          ? param.name.slice(0, 12) + '...'
                          : param.name}
                      </div>
                      <div className="text-xs font-normal text-gray-500 mt-0.5">
                        <Badge
                          variant={
                            param.type === 'Numeric' ? 'default' : 'secondary'
                          }
                          className={`px-1.5 py-0.5 text-xs ${
                            param.type === 'Numeric'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-green-100 text-green-700'
                          }`}
                        >
                          {param.type === 'Numeric' ? 'Num' : 'Cat'}
                        </Badge>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredObjects.map((obj, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3 px-3 font-medium text-gray-900 bg-white sticky left-0 shadow-sm">
                      {obj.name}
                    </td>
                    {parameters.map(param => (
                      <td
                        key={param.id}
                        className="py-3 px-3 text-gray-700 text-sm"
                      >
                        <span className="font-medium">
                          {getParameterValue(obj, param.id)}
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export { DatasetObjectsTable };
