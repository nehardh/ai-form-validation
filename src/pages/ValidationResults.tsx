import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AlertTriangle, Info, Edit, ArrowRight } from 'lucide-react';

export const ValidationResults: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 👇 Grab data passed from UploadClaim
  const { extractedData, status, issues } = location.state || {
    extractedData: null,
    status: null,
    issues: [],
  };

  // Group issues like your old code (by type if needed)
  const groupedErrors = (issues || []).reduce((acc: any, error: any) => {
    if (!acc[error.issue]) acc[error.issue] = [];
    acc[error.issue].push(error);
    return acc;
  }, {});

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900">Validation Results</h1>
      <p className="text-gray-600 mt-1">
        Claim Status: <span className="font-semibold">{status}</span>
      </p>

      {issues.length > 0 ? (
        <div className="mt-6">
          <div className="mb-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-center">
              <AlertTriangle className="w-5 h-5 text-amber-600 mr-2" />
              <span className="font-medium text-amber-800">
                {issues.length} validation issues found
              </span>
            </div>
          </div>

          {/* List issues */}
          {issues.map((err: any, i: number) => (
            <div key={i} className="border border-gray-200 rounded-lg mb-4 p-4 bg-red-50">
              <h4 className="font-medium text-red-800">{err.field}</h4>
              <p className="text-sm text-red-600">Issue: {err.issue}</p>
              <p className="text-sm text-gray-700">
                Extracted Value: {extractedData?.fields?.[err.field] || 'N/A'}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4 text-green-700">
          ✅ No validation errors. Claim is ready for submission.
        </div>
      )}

      <div className="mt-8 flex justify-end space-x-4">
        <button
          onClick={() => navigate('/upload')}
          className="px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50"
        >
          Back
        </button>
        <button
          onClick={() => navigate('/claim-review', {
            state: {
              fields: extractedData.fields,
              issues: extractedData.issues
            }
          })}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700"
        >
          Review & Apply Fixes
          <ArrowRight className="w-4 h-4 ml-2" />
        </button>
      </div>
    </div>
  );
};
