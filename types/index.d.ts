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
  discount: number;
  prescriptionRequired: boolean;
  fdaApproved: boolean;
  usageWarnings: string;
  sideEffects: string;
  usageInstructions: string;
  imageUrl?: string;
  notes?: string;
}
