import { SectionCard, SectionHeader } from '../Common';
import { ParametersSection } from './ParametersSection';

function ParametersCard({
  parameters,
  addParameter,
  removeParameter,
  updateParameter,
}: any) {
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
}

export { ParametersCard };
