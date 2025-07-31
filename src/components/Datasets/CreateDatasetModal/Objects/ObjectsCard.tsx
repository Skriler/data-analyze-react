import { useFormContext } from 'react-hook-form';
import { AlertCircle } from 'lucide-react';
import { SectionCard, SectionHeader } from '../Common';
import { DataObjectsTable } from './DataObjectsTable';
import type { DataObjectCreateDto } from '@api-types/dataset';

interface ObjectsCardProps {
  parameters: string[];
  objects: DataObjectCreateDto[];
  addObject: () => void;
  removeObject: (index: number) => void;
  updateObject: (
    index: number,
    field: 'name' | 'values',
    value: string | string[]
  ) => void;
  updateObjectValue: (
    objIndex: number,
    valueIndex: number,
    value: string
  ) => void;
}

const ObjectsCard: React.FC<ObjectsCardProps> = ({
  parameters,
  objects,
  addObject,
  removeObject,
  updateObject,
  updateObjectValue,
}) => {
  const {
    formState: { errors },
  } = useFormContext<{
    objects?: unknown;
  }>();

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

      {errors.objects && typeof errors.objects.message === 'string' && (
        <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg">
          <AlertCircle className="h-4 w-4" />
          <span>{errors.objects.message}</span>
        </div>
      )}
    </div>
  );
};

export { ObjectsCard };
