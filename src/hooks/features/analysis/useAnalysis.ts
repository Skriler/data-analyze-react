import { useMemo, useState, useEffect } from 'react';
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
  const [showDocumentationModal, setShowDocumentationModal] = useState(false);

  useEffect(() => {
    if (type && type !== selectedAnalysisType) {
      setSelectedAnalysisType(type);
    }
  }, [type, selectedAnalysisType]);

  const handleAnalysisTypeChange = (newType: string) => {
    setSelectedAnalysisType(newType);
    if (newType !== type) {
      navigate(`/analysis/${newType}`, { replace: true });
    }
  };

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
        setShowDocumentationModal(true);
      },
    }),
    [navigate]
  );

  return {
    selectedDataset,
    selectedAnalysisType,
    showAnalysisModal,
    showDocumentationModal,
    setSelectedAnalysisType: handleAnalysisTypeChange,
    setShowAnalysisModal,
    setShowDocumentationModal,
    actions,
  };
};
