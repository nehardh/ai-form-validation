import { Claim, ValidationError, DashboardStats } from '../types';

export const mockStats: DashboardStats = {
  claimsUploaded: 247,
  claimsWithErrors: 42,
  validatedClaims: 183,
  avgProcessingTime: 3.2
};

export const mockValidationErrors: ValidationError[] = [
  {
    type: 'A',
    field: 'Policy Number',
    message: 'Required field is missing',
    tooltip: 'Policy number must be provided for claim processing',
    aiSuggestion: 'Based on patient name and provider, suggest verifying with patient records',
    originalValue: '',
    suggestedValue: 'POL-2024-001234'
  },
  {
    type: 'B',
    field: 'Diagnosis Code',
    message: 'Invalid ICD-10 format',
    tooltip: 'ICD-10 codes must follow standard format (Letter + 2-3 digits + optional decimal)',
    aiSuggestion: 'Correct format should be a valid ICD-10 code',
    originalValue: 'X123',
    suggestedValue: 'Z51.11'
  },
  {
    type: 'C',
    field: 'Procedure Code',
    message: 'CPT code does not match diagnosis',
    tooltip: 'The procedure code should align with the diagnosis provided',
    aiSuggestion: 'For diagnosis Z51.11, suggested CPT codes are 96413, 96415',
    originalValue: '99213',
    suggestedValue: '96413'
  },
  {
    type: 'D',
    field: 'Date of Service',
    message: 'Service date is in the future',
    tooltip: 'Service date cannot be later than current date',
    aiSuggestion: 'Verify the correct service date with provider records',
    originalValue: '2025-08-01',
    suggestedValue: '2024-12-15'
  }
];

export const mockClaims: Claim[] = [
  {
    id: 'CLM-001',
    patientName: 'John Doe',
    policyNumber: '',
    diagnosisCode: 'X123',
    procedureCode: '99213',
    dateOfService: '2025-08-01',
    providerId: 'PRV001',
    status: 'pending',
    uploadDate: '2024-12-20',
    fileName: 'cms1500_john_doe.pdf',
    errors: mockValidationErrors
  },
  {
    id: 'CLM-002',
    patientName: 'Jane Smith',
    policyNumber: 'POL-2024-002',
    diagnosisCode: 'Z51.11',
    procedureCode: '96413',
    dateOfService: '2024-12-18',
    providerId: 'PRV002',
    status: 'validated',
    uploadDate: '2024-12-19',
    fileName: 'ub04_jane_smith.pdf',
    errors: []
  }
];

export const mockChartData = {
  statusData: [
    { name: 'Validated', value: 183, color: '#10B981' },
    { name: 'Pending', value: 42, color: '#F59E0B' },
    { name: 'Errors', value: 22, color: '#EF4444' }
  ],
  errorTypesData: [
    { name: 'Missing Fields', count: 28, type: 'A' },
    { name: 'Format Issues', count: 15, type: 'B' },
    { name: 'Medical Mismatch', count: 12, type: 'C' },
    { name: 'Cross-field Conflicts', count: 8, type: 'D' }
  ],
  processingTimeData: [
    { month: 'Aug', time: 4.2 },
    { month: 'Sep', time: 3.8 },
    { month: 'Oct', time: 3.5 },
    { month: 'Nov', time: 3.2 },
    { month: 'Dec', time: 3.0 }
  ]
};