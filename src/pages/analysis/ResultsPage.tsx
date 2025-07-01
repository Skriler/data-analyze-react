import { useSetLayout } from '@components/Layout';
import { useDatasets } from '@hooks/api/useDatasets';
import { useResults } from '@hooks/features/useResults';
import { ResultsContent } from '@components/Results';

export default function Results() {
  const { data: datasets } = useDatasets();
  const resultsState = useResults();

  useSetLayout('Results', 'View analysis results and insights');

  return <ResultsContent datasets={datasets} {...resultsState} />;
}
