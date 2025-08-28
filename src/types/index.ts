export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface Claim {
  id: string;
  patientName: string;
  policyNumber: string;
  diagnosisCode: string;
  procedureCode: string;
  dateOfService: string;
  providerId: string;
  status: 'draft' | 'pending' | 'validated' | 'submitted' | 'rejected';
  uploadDate: string;
  fileName: string;
  errors: ValidationError[];
}

export interface ValidationError {
  type: 'A' | 'B' | 'C' | 'D';
  field: string;
  message: string;
  tooltip: string;
  aiSuggestion: string;
  originalValue: string;
  suggestedValue: string;
}

export interface DashboardStats {
  claimsUploaded: number;
  claimsWithErrors: number;
  validatedClaims: number;
  avgProcessingTime: number;
}