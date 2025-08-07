import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { DatasetDto } from '@api-types/dataset';
import type { AnalysisActions } from '@shared/analysis';

export const useAnalysis = () => {
  const { type } = useParams<{ type?: string }>();
  const navigate = useNavigate();
  const [selectedDataset, setSelectedDataset] = useState<DatasetDto | null>(
    null
  );
  const [selectedAnalysisType, setSelectedAnalysisType] = useState<string>(
    type || 'similarity'
  );
  const [showAnalysisModal, setShowAnalysisModal] = useState(false);

  const actions: AnalysisActions = useMemo(
    () => ({
      handleRunAnalysis: (dataset: DatasetDto) => {
        setSelectedDataset(dataset);
        setShowAnalysisModal(true);
      },
      handleCreateDataset: () => {
        navigate('/datasets?create=true');
      },
      handleViewDocumentation: () => {
        navigate('/analysis/documentation');
      },
    }),
    [navigate]
  );

  return {
    selectedDataset,
    selectedAnalysisType,
    showAnalysisModal,
    setSelectedAnalysisType,
    setShowAnalysisModal,
    actions,
  };
};
