import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Layout } from './components/Layout/Layout';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { UploadClaim } from './pages/UploadClaim';
import { ValidationResults } from './pages/ValidationResults';
import { ClaimReview } from './pages/ClaimReview';
import { PendingClaims } from './pages/PendingClaims';
import { ValidatedClaims } from './pages/ValidatedClaims';
import { Reports } from './pages/Reports';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="upload" element={<UploadClaim />} />
            <Route path="validation-results" element={<ValidationResults />} />
            <Route path="claim-review" element={<ClaimReview />} />
            <Route path="pending" element={<PendingClaims />} />
            <Route path="validated" element={<ValidatedClaims />} />
            <Route path="reports" element={<Reports />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;