import { useSetLayout } from '@hooks/features/layout';
import { useAnalysis } from '@hooks/features/analysis/useAnalysis';
import { useDatasets } from '@hooks/api/useDatasets';
import { AnalysisContent } from '@components/Analysis';

export default function AnalysisPage() {
  const analysisState = useAnalysis();
  const { data: datasets, isLoading } = useDatasets();

  useSetLayout('Analysis', 'Run similarity and clustering analysis');

  return (
    <AnalysisContent
      datasets={datasets}
      isLoading={isLoading}
      {...analysisState}
    />
  );
}
