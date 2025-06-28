import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@components/Ui/Button';
import { FormLabel } from '@components/Ui/Form';
import { Input } from '@components/Ui/Input';

interface DataObject {
  name: string;
  values: string[];
}

interface DataObjectsTableProps {
  parameters: string[];
  objects: DataObject[];
  onAddObject: () => void;
  onRemoveObject: (index: number) => void;
  onUpdateObject: (
    index: number,
    field: 'name' | 'values',
    value: string | string[]
  ) => void;
  onUpdateObjectValue: (
    objIndex: number,
    valueIndex: number,
    value: string
  ) => void;
}

function DataObjectsTable({
  parameters,
  objects,
  onAddObject,
  onRemoveObject,
  onUpdateObject,
  onUpdateObjectValue,
}: DataObjectsTableProps) {
  return (
    <div>
      <FormLabel>Data Objects</FormLabel>
      <div className="bg-gray-50 rounded-lg p-4 mt-2">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left text-sm font-medium text-gray-700 pb-2">
                  Object Name
                </th>
                {parameters.map((param, index) => (
                  <th
                    key={index}
                    className="text-left text-sm font-medium text-gray-700 pb-2 px-2"
                  >
                    {param || `Parameter ${index + 1}`}
                  </th>
                ))}
                <th className="w-10"></th>
              </tr>
            </thead>
            <tbody className="space-y-2">
              {objects.map((obj, objIndex) => (
                <tr key={objIndex}>
                  <td className="py-2">
                    <Input
                      placeholder="Object name"
                      value={obj.name}
                      onChange={e =>
                        onUpdateObject(objIndex, 'name', e.target.value)
                      }
                      className="text-sm"
                    />
                  </td>
                  {obj.values.map((value, valueIndex) => (
                    <td key={valueIndex} className="py-2 px-2">
                      <Input
                        placeholder="Value"
                        value={value}
                        onChange={e =>
                          onUpdateObjectValue(
                            objIndex,
                            valueIndex,
                            e.target.value
                          )
                        }
                        className="text-sm"
                      />
                    </td>
                  ))}
                  <td className="py-2">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => onRemoveObject(objIndex)}
                      disabled={objects.length <= 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onAddObject}
          className="mt-3 flex items-center space-x-2 text-sm"
        >
          <Plus className="h-4 w-4" />
          <span>Add Object</span>
        </Button>
      </div>
    </div>
  );
}

export { DataObjectsTable };
