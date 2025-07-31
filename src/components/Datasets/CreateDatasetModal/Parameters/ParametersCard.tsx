import { SectionCard, SectionHeader } from '../Common';
import { ParametersSection } from './ParametersSection';

interface ParametersCardProps {
  parameters: string[];
  addParameter: () => void;
  removeParameter: (index: number) => void;
  updateParameter: (index: number, value: string) => void;
}

const ParametersCard: React.FC<ParametersCardProps> = ({
  parameters,
  addParameter,
  removeParameter,
  updateParameter,
}) => {
  return (
    <div className="space-y-4">
      <SectionHeader
        icon={
          <div className="h-4 w-4 rounded-full bg-gradient-to-br from-purple-500 to-purple-600" />
        }
        title="Parameters"
        badge={`${parameters.length} parameter${parameters.length !== 1 ? 's' : ''}`}
      />
      <SectionCard>
        <ParametersSection
          parameters={parameters}
          onAddParameter={addParameter}
          onRemoveParameter={removeParameter}
          onUpdateParameter={updateParameter}
        />
      </SectionCard>
    </div>
  );
};

export { ParametersCard };
