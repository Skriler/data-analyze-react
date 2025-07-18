import { useFormContext } from 'react-hook-form';
import { Plus, Trash2, Settings, Sparkles, AlertCircle } from 'lucide-react';
import { Button } from '@components/Ui/Button';
import { Input } from '@components/Ui/Input';
import type { CreateDatasetFormData } from '@shared/dataset';

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
  const {
    formState: { errors },
  } = useFormContext<CreateDatasetFormData>();

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
            <div key={index} className="space-y-2">
              <div className="flex items-center gap-4 group">
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
                    className={`w-full px-4 py-3 bg-white border-2 rounded-xl text-sm placeholder:text-slate-400 transition-all duration-200 shadow-sm hover:border-slate-300 ${
                      errors.parameters?.[index]
                        ? 'border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                        : 'border-slate-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100'
                    }`}
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
              {errors.parameters?.[index] && (
                <div className="ml-12 flex items-center gap-2 text-red-600 text-xs">
                  <AlertCircle className="h-3 w-3" />
                  <span>{errors.parameters[index]?.message}</span>
                </div>
              )}
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

      {/* General parameters validation error */}
      {errors.parameters && typeof errors.parameters.message === 'string' && (
        <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg">
          <AlertCircle className="h-4 w-4" />
          <span>{errors.parameters.message}</span>
        </div>
      )}
    </div>
  );
}

export { ParametersSection };
