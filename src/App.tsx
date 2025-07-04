import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@libs/queries/queryClient';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import { LayoutProvider, Layout } from '@components/Layout';
import { AuthGuard } from '@components/Auth';
import { Toaster } from '@components/Ui/Toast';

// Pages
import DashboardPage from '@pages/DashboardPage';
import DatasetsPage from '@pages/datasets/DatasetsPage';
import DatasetDetailsPage from '@pages/datasets/DatasetDetailsPage';
import AnalysisPage from '@pages/analysis/AnalysisPage';
import ResultsPage from '@pages/analysis/ResultsPage';
import NotFoundPage from '@pages/NotFoundPage';
import SettingsPage from '@pages/SettingsPage';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <LayoutProvider>
          <Routes>
            {/* Protected routes with layout and auth guard */}
            <Route
              path="/*"
              element={
                <Layout>
                  <AuthGuard>
                    <Routes>
                      <Route path="/" element={<DashboardPage />} />
                      <Route path="/datasets" element={<DatasetsPage />} />
                      <Route
                        path="/datasets/:id"
                        element={<DatasetDetailsPage />}
                      />

                      <Route path="/analysis" element={<AnalysisPage />} />
                      <Route
                        path="/analysis/:datasetId"
                        element={<AnalysisPage />}
                      />

                      <Route path="/results" element={<ResultsPage />} />
                      <Route
                        path="/results/:datasetId"
                        element={<ResultsPage />}
                      />

                      <Route path="/settings" element={<SettingsPage />} />
                      <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                  </AuthGuard>
                </Layout>
              }
            />
          </Routes>
        </LayoutProvider>
        <Toaster />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
