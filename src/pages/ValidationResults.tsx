import React from 'react';
import { useNavigate } from 'react-router-dom';
import { mockValidationErrors } from '../data/mockData';
import { AlertTriangle, Info, Edit, ArrowRight } from 'lucide-react';

const errorTypeColors = {
  A: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-800', dot: 'bg-red-500' },
  B: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-800', dot: 'bg-orange-500' },
  C: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-800', dot: 'bg-blue-500' },
  D: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-800', dot: 'bg-purple-500' }
};

const errorTypeNames = {
  A: 'Missing/Blank Fields',
  B: 'Format/Syntax Issues', 
  C: 'Medical Mismatch',
  D: 'Cross-field Conflicts'
};

export const ValidationResults: React.FC = () => {
  const navigate = useNavigate();
  
  const groupedErrors = mockValidationErrors.reduce((acc, error) => {
    if (!acc[error.type]) {
      acc[error.type] = [];
    }
    acc[error.type].push(error);
    return acc;
  }, {} as Record<string, typeof mockValidationErrors>);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Validation Results</h1>
        <p className="text-gray-600 mt-1">Review validation errors and AI suggestions for claim CLM-001</p>
      </div>

      <div className="mb-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
        <div className="flex items-center">
          <AlertTriangle className="w-5 h-5 text-amber-600 mr-2" />
          <span className="font-medium text-amber-800">
            {mockValidationErrors.length} validation errors found that require attention
          </span>
        </div>
      </div>

      <div className="space-y-8">
        {Object.entries(groupedErrors).map(([type, errors]) => (
          <div key={type} className="bg-white border border-gray-200 rounded-lg">
            <div className={`px-6 py-4 border-b border-gray-200 ${errorTypeColors[type as keyof typeof errorTypeColors].bg}`}>
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full ${errorTypeColors[type as keyof typeof errorTypeColors].dot} mr-3`}></div>
                <h3 className={`text-lg font-medium ${errorTypeColors[type as keyof typeof errorTypeColors].text}`}>
                  Type {type}: {errorTypeNames[type as keyof typeof errorTypeNames]}
                </h3>
                <span className={`ml-2 px-2 py-1 text-xs rounded-full ${errorTypeColors[type as keyof typeof errorTypeColors].bg} ${errorTypeColors[type as keyof typeof errorTypeColors].text}`}>
                  {errors.length} error{errors.length > 1 ? 's' : ''}
                </span>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {errors.map((error, index) => (
                <div key={index} className="border border-gray-200 rounded-lg">
                  <div className="p-4 bg-gray-50 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">{error.field}</h4>
                        <p className="text-sm text-gray-600">{error.message}</p>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600">
                        <Info className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                          Original Value
                        </label>
                        <div className="px-3 py-2 bg-red-50 border border-red-200 rounded text-sm text-red-800">
                          {error.originalValue || 'Empty'}
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                          AI Suggested Value
                        </label>
                        <div className="px-3 py-2 bg-green-50 border border-green-200 rounded text-sm text-green-800">
                          {error.suggestedValue}
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-start">
                        <Info className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-blue-800 mb-1">AI Suggestion</p>
                          <p className="text-sm text-blue-700">{error.aiSuggestion}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-end space-x-4">
        <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
          <Edit className="w-4 h-4 mr-2" />
          Edit Manually
        </button>
        <button
          onClick={() => navigate('/claim-review')}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700"
        >
          Review & Apply Fixes
          <ArrowRight className="w-4 h-4 ml-2" />
        </button>
      </div>
    </div>
  );
};