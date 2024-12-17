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
  medicines: string[];
  totalSales: number;
  createdAt: string;
  updatedAt: string;
}
