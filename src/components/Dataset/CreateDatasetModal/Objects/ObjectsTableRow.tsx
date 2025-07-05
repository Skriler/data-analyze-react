import { Trash2 } from 'lucide-react';
import { Button } from '@components/Ui/Button';
import { Input } from '@components/Ui/Input';

// TODO replace with actual model
interface DataObject {
  name: string;
  values: string[];
}

interface ObjectsTableRowProps {
  obj: DataObject;
  objIndex: number;
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
  onRemoveObject: (index: number) => void;
  objectsCount: number;
}

function ObjectsTableRow({
  obj,
  objIndex,
  onUpdateObject,
  onUpdateObjectValue,
  onRemoveObject,
  objectsCount,
}: ObjectsTableRowProps) {
  return (
    <tr className="hover:bg-slate-50 transition-colors duration-150 group">
      <td className="px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-md">
            <span className="text-xs font-bold text-white">{objIndex + 1}</span>
          </div>
          <div className="flex-1 relative">
            <Input
              placeholder="Object name"
              value={obj.name}
              onChange={e => onUpdateObject(objIndex, 'name', e.target.value)}
              className="w-full px-4 py-2.5 bg-white border-2 border-slate-200 rounded-lg text-sm placeholder:text-slate-400 focus:border-green-500 focus:ring-3 focus:ring-green-100 transition-all duration-200 shadow-sm hover:border-slate-300"
            />
            <div className="absolute inset-0 rounded-lg pointer-events-none transition-all duration-200 focus-within:shadow-md focus-within:shadow-green-100" />
          </div>
        </div>
      </td>
      {obj.values.map((value, valueIndex) => (
        <td key={valueIndex} className="px-6 py-4 border-l-2 border-slate-200">
          <div className="relative">
            <Input
              placeholder="Value"
              value={value}
              onChange={e =>
                onUpdateObjectValue(objIndex, valueIndex, e.target.value)
              }
              className="w-full px-4 py-2.5 bg-white border-2 border-slate-200 rounded-lg text-sm placeholder:text-slate-400 focus:border-purple-500 focus:ring-3 focus:ring-purple-100 transition-all duration-200 shadow-sm hover:border-slate-300"
            />
            <div className="absolute inset-0 rounded-lg pointer-events-none transition-all duration-200 focus-within:shadow-md focus-within:shadow-purple-100" />
          </div>
        </td>
      ))}

      <td className="px-6 py-4">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => onRemoveObject(objIndex)}
          disabled={objectsCount <= 1}
          className="opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-red-50 hover:text-red-600 disabled:opacity-30 h-10 w-10 rounded-xl"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </td>
    </tr>
  );
}

export { ObjectsTableRow };
