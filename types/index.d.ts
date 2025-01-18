declare interface UserType {
  id: number;
  userId: string;
  email: string;
  firstname: string;
  lastname: string;
  imageUrl: string;
  gender: string;
  age: number;
  dateOfBirth: string;
  contact: string;
  address: string;
  bio: string;
  role: string;
  roleChangeRequest: number;
  createdAt: string;
}

declare interface PatientType {
  id: number;
  patientId: string;
  doctorId: string;
  pharmacistId: string;
  addedBy: string;
  firstname: string;
  lastname: string;
  fullname: string;
  email: string;
  imageUrl: string;
  gender: string;
  age: number;
  address: string;
  contact: string;
  occupation: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  insuranceProvider: string;
  insurancePolicyNumber: string;
  identificationCardType: string;
  identificationCardNumber: string;
  identificationImageUrl: string;
  conditionName: string;
  conditionDescription: string;
  conditionSeverity: string;
  allergies: string;
  familyMedicalHistory: string;
  prescription: string;
  medicines: string[];
  totalSales: number;
  createdAt: string;
  updatedAt: string;
}

declare interface AppointmentType {
  id: number;
  appointmentId: string;
  patientId: string;
  doctorId: string;
  patientName: string;
  doctorName: string;
  reason: string;
  status: string;
  date: string;
  timeStart: string;
  timeEnd: string;
  createdAt: string;
}

declare interface MedicineType {
  id: number;
  addedBy: string;
  createdAt: string;
  medicineId: string;
  name: string;
  brand: string;
  category: string;
  activeIngredients: string[];
  dosage: string;
  form: string;
  unitsPerPackage: string;
  storageCondition: string;
  expiryDate: string;
  stockQuantity: string;
  reorderLevel: string;
  supplier: string;
  batchNumber: string;
  costPrice: number;
  sellingPrice: number;
  prescriptionRequired: string;
  fdaApproved: string;
  usageWarnings: string;
  sideEffects: string;
  usageInstructions: string;
  imageUrl?: string;
  notes?: string;
}

declare interface TransactionType {
  id: number;
  transactionId: string;
  patientId: string;
  patientName: string;
  sellerEmail: string;
  medicines: string[];
  totalSales: number;
  transactionDate: string;
}

declare interface RoleChangeRequestType {
  id: string;
  roleChangeRequestId: string;
  requestOwner: string;
  currentRole: string;
  requestedRole: string;
  reason: string;
  imageProof: string;
  status: string;
  createdAt: string;
}
