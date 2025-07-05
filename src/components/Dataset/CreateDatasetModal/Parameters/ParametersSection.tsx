import { Plus, Trash2, Settings, Sparkles } from 'lucide-react';
import { Button } from '@components/Ui/Button';
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
    <div className="space-y-6">
      {parameters.length === 0 ? (
        <div className="text-center py-12 text-slate-500">
          <div className="relative mb-4">
            <Settings className="h-12 w-12 mx-auto text-slate-300" />
            <Sparkles className="h-4 w-4 absolute top-0 right-1/2 translate-x-4 text-purple-400" />
          </div>
          <p className="text-lg font-medium text-slate-600">
            No parameters added yet
          </p>
          <p className="text-sm text-slate-400 mt-1">
            Start by adding your first parameter
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {parameters.map((param, index) => (
            <div key={index} className="flex items-center gap-4 group">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-md">
                <span className="text-xs font-bold text-white">
                  {index + 1}
                </span>
              </div>
              <div className="flex-1 relative">
                <Input
                  placeholder={`Parameter ${index + 1} name`}
                  value={param}
                  onChange={e => onUpdateParameter(index, e.target.value)}
                  className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl text-sm placeholder:text-slate-400 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200 shadow-sm hover:border-slate-300"
                />
                <div className="absolute inset-0 rounded-xl pointer-events-none transition-all duration-200 focus-within:shadow-lg focus-within:shadow-purple-100" />
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => onRemoveParameter(index)}
                disabled={parameters.length <= 1}
                className="opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-red-50 hover:text-red-600 disabled:opacity-30 h-10 w-10 rounded-xl"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={onAddParameter}
        className="w-full flex items-center justify-center gap-3 py-4 border-2 border-dashed border-slate-300 hover:border-purple-400 hover:bg-purple-50 hover:text-purple-600 transition-all duration-200 rounded-xl text-sm font-medium group"
      >
        <div className="p-1 rounded-full bg-purple-100 group-hover:bg-purple-200 transition-colors duration-200">
          <Plus className="h-4 w-4 text-purple-600" />
        </div>
        <span>Add Parameter</span>
      </Button>
    </div>
  );
}

export { ParametersSection };
