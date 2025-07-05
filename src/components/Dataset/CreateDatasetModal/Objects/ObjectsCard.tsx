import { SectionCard, SectionHeader } from '../Common';
import { DataObjectsTable } from './DataObjectsTable';

function ObjectsCard({
  parameters,
  objects,
  addObject,
  removeObject,
  updateObject,
  updateObjectValue,
}: any) {
  return (
    <div className="space-y-4">
      <SectionHeader
        icon={
          <div className="h-4 w-4 rounded-full bg-gradient-to-br from-green-500 to-green-600" />
        }
        title="Objects"
        badge={`${objects.length} object${objects.length !== 1 ? 's' : ''}`}
      />
      <SectionCard>
        <DataObjectsTable
          parameters={parameters}
          objects={objects}
          onAddObject={addObject}
          onRemoveObject={removeObject}
          onUpdateObject={updateObject}
          onUpdateObjectValue={updateObjectValue}
        />
      </SectionCard>
    </div>
  );
}

export { ObjectsCard };
