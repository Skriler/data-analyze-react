import { EmptyObjectsState } from './EmptyObjectsState';
import { ObjectsTableHeader } from './ObjectsTableHeader';
import { ObjectsTableRow } from './ObjectsTableRow';
import { AddObjectButton } from './AddObjectButton';

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
  const minColWidth = Math.max(150, 200 / Math.max(parameters.length, 1));

  return (
    <div className="space-y-6">
      {objects.length === 0 ? (
        <EmptyObjectsState parametersCount={parameters.length} />
      ) : (
        <div className="border-2 border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm">
          <div className="overflow-x-auto max-h-96 custom-scrollbar-dark">
            <table className="w-full">
              <ObjectsTableHeader
                parameters={parameters}
                minColWidth={minColWidth}
              />
              <tbody className="divide-y divide-slate-200">
                {objects.map((obj, objIndex) => (
                  <ObjectsTableRow
                    key={objIndex}
                    obj={obj}
                    objIndex={objIndex}
                    onUpdateObject={onUpdateObject}
                    onUpdateObjectValue={onUpdateObjectValue}
                    onRemoveObject={onRemoveObject}
                    objectsCount={objects.length}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <AddObjectButton
        onAddObject={onAddObject}
        parametersCount={parameters.length}
      />
    </div>
  );
}

export { DataObjectsTable };
