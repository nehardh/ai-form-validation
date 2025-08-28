import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, FileText, Eye, Save, CheckCircle } from 'lucide-react';

export const UploadClaim: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [extractedData, setExtractedData] = useState<any>(null);
  const navigate = useNavigate();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleFile = (selectedFile: File) => {
    setFile(selectedFile);
    // Simulate OCR extraction
    setTimeout(() => {
      setExtractedData({
        'Patient Name': 'John Doe',
        'Policy Number': '',
        'Diagnosis Code': 'X123',
        'Procedure Code': '99213',
        'Date of Service': '2025-08-01',
        'Provider ID': 'PRV001',
        'Patient DOB': '1980-05-15',
        'Total Charges': '$250.00'
      });
    }, 1500);
  };

  const handleValidate = () => {
    navigate('/validation-results');
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Upload Claim</h1>
        <p className="text-gray-600 mt-1">Upload CMS-1500 or UB-04 claim forms for validation</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload Section */}
        <div className="space-y-6">
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive
                ? 'border-emerald-400 bg-emerald-50'
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {file ? (
              <div className="space-y-4">
                <FileText className="w-12 h-12 text-emerald-600 mx-auto" />
                <div>
                  <p className="font-medium text-gray-900">{file.name}</p>
                  <p className="text-sm text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
                <div className="flex justify-center space-x-2">
                  <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    <Eye className="w-4 h-4 mr-1" />
                    Preview
                  </button>
                  <button
                    onClick={() => setFile(null)}
                    className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                <div>
                  <p className="text-lg font-medium text-gray-900">Drop your files here</p>
                  <p className="text-sm text-gray-500">or click to browse</p>
                </div>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileInput}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 cursor-pointer"
                >
                  Select File
                </label>
                <p className="text-xs text-gray-400">Supports PDF, JPG, PNG files up to 10MB</p>
              </div>
            )}
          </div>
        </div>

        {/* Extracted Data Section */}
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Extracted Fields</h3>
              <p className="text-sm text-gray-600">AI-extracted data from uploaded claim</p>
            </div>
            
            {extractedData ? (
              <div className="p-6">
                <div className="space-y-4">
                  {Object.entries(extractedData).map(([key, value]) => (
                    <div key={key} className="grid grid-cols-3 gap-4 items-center">
                      <label className="text-sm font-medium text-gray-700">{key}</label>
                      <input
                        type="text"
                        value={value as string}
                        className={`col-span-2 px-3 py-2 border rounded-md text-sm ${
                          value === '' 
                            ? 'border-red-300 bg-red-50' 
                            : 'border-gray-300'
                        }`}
                        readOnly
                      />
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 flex space-x-4">
                  <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    <Save className="w-4 h-4 mr-2" />
                    Save Draft
                  </button>
                  <button
                    onClick={handleValidate}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Validate
                  </button>
                </div>
              </div>
            ) : file ? (
              <div className="p-6">
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto"></div>
                  <p className="mt-4 text-sm text-gray-600">Extracting data from uploaded file...</p>
                </div>
              </div>
            ) : (
              <div className="p-6">
                <div className="text-center py-12 text-gray-400">
                  <FileText className="w-12 h-12 mx-auto mb-4" />
                  <p>Upload a file to extract claim data</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};