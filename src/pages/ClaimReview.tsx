import React, { useState } from 'react';
import { mockValidationErrors } from '../data/mockData';
import { FileText, CheckCircle, AlertTriangle } from 'lucide-react';

export const ClaimReview: React.FC = () => {
  const [editableFields, setEditableFields] = useState({
    'Patient Name': 'John Doe',
    'Policy Number': 'POL-2024-001234',
    'Diagnosis Code': 'Z51.11',
    'Procedure Code': '96413',
    'Date of Service': '2024-12-15',
    'Provider ID': 'PRV001',
    'Patient DOB': '1980-05-15',
    'Total Charges': '$250.00'
  });

  const [comparisonMode, setComparisonMode] = useState<'original' | 'suggested'>('suggested');

  const handleFieldChange = (field: string, value: string) => {
    setEditableFields(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getFieldStatus = (field: string) => {
    const error = mockValidationErrors.find(e => e.field === field);
    if (!error) return 'valid';
    if (editableFields[field] === error.suggestedValue) return 'fixed';
    if (editableFields[field] === error.originalValue) return 'error';
    return 'modified';
  };

  const getFieldColor = (status: string) => {
    switch (status) {
      case 'error': return 'border-red-300 bg-red-50';
      case 'fixed': return 'border-green-300 bg-green-50';
      case 'modified': return 'border-blue-300 bg-blue-50';
      default: return 'border-gray-300 bg-white';
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Claim Review</h1>
        <p className="text-gray-600 mt-1">Review and edit claim data before submission</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Preview Section */}
        <div className="bg-white border border-gray-200 rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Form Preview</h3>
              <div className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-gray-500" />
                <span className="text-sm text-gray-600">cms1500_john_doe.pdf</span>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg h-96 flex items-center justify-center">
              <div className="text-center">
                <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Form Preview</p>
                <p className="text-sm text-gray-500">CMS-1500 Claim Form</p>
              </div>
            </div>
          </div>
        </div>

        {/* Editable Fields Section */}
        <div className="bg-white border border-gray-200 rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Extracted Fields</h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setComparisonMode('original')}
                  className={`px-3 py-1 text-xs rounded ${
                    comparisonMode === 'original' 
                      ? 'bg-red-100 text-red-800' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Original
                </button>
                <button
                  onClick={() => setComparisonMode('suggested')}
                  className={`px-3 py-1 text-xs rounded ${
                    comparisonMode === 'suggested' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  AI Suggested
                </button>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {Object.entries(editableFields).map(([field, value]) => {
              const status = getFieldStatus(field);
              const error = mockValidationErrors.find(e => e.field === field);
              
              return (
                <div key={field} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700">{field}</label>
                    {status === 'error' && <AlertTriangle className="w-4 h-4 text-red-500" />}
                    {status === 'fixed' && <CheckCircle className="w-4 h-4 text-green-500" />}
                  </div>
                  
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => handleFieldChange(field, e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 ${getFieldColor(status)}`}
                  />
                  
                  {error && (
                    <div className="text-xs space-y-1">
                      <div className="flex justify-between">
                        <span className="text-red-600">Original: {error.originalValue || 'Empty'}</span>
                        <span className="text-green-600">Suggested: {error.suggestedValue}</span>
                      </div>
                      <p className="text-gray-500">{error.message}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Summary Section */}
      <div className="mt-8 bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Review Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <div className="text-2xl font-bold text-red-600">
              {Object.keys(editableFields).filter(field => getFieldStatus(field) === 'error').length}
            </div>
            <div className="text-sm text-red-800">Remaining Errors</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {Object.keys(editableFields).filter(field => getFieldStatus(field) === 'fixed').length}
            </div>
            <div className="text-sm text-green-800">Fixed Issues</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {Object.keys(editableFields).filter(field => getFieldStatus(field) === 'modified').length}
            </div>
            <div className="text-sm text-blue-800">Manual Edits</div>
          </div>
        </div>
        
        <div className="flex justify-end space-x-4">
          <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
            Save Draft
          </button>
          <button className="px-6 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700">
            Confirm & Submit
          </button>
        </div>
      </div>
    </div>
  );
};