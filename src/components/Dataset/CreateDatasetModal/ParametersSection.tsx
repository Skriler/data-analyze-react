import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@components/Ui/Button';
import { FormLabel } from '@components/Ui/Form';
import { Input } from '@components/Ui/Input';

interface ParametersSectionProps {
  parameters: string[];
  onAddParameter: () => void;
  onRemoveParameter: (index: number) => void;
  onUpdateParameter: (index: number, value: string) => void;
}

function ParametersSection({
  parameters,
  onAddParameter,
  onRemoveParameter,
  onUpdateParameter,
}: ParametersSectionProps) {
  return (
    <div>
      <FormLabel>Parameters</FormLabel>
      <div className="space-y-3 mt-2">
        {parameters.map((param, index) => (
          <div key={index} className="flex items-center space-x-3">
            <Input
              placeholder="Parameter name"
              value={param}
              onChange={e => onUpdateParameter(index, e.target.value)}
              className="flex-1"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onRemoveParameter(index)}
              disabled={parameters.length <= 1}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onAddParameter}
          className="flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Parameter</span>
        </Button>
      </div>
    </div>
  );
}

export { ParametersSection };
