import { sql } from "drizzle-orm";
import {
  integer,
  numeric,
  pgTable,
  serial,
  text,
  varchar,
} from "drizzle-orm/pg-core";

export const User = pgTable("user", {
  id: serial("id").primaryKey(),
  userId: varchar("userId").notNull(),
  email: varchar("email").notNull(),
  firstname: varchar("firstname"),
  lastname: varchar("lastname"),
  imageUrl: varchar("imageUrl"),
  gender: varchar("gender"),
  age: integer("age"),
  dateOfBirth: varchar("dateOfBirth"),
  contact: varchar("contact"),
  address: varchar("address"),
  bio: text("bio"),
  role: varchar("role"),
  createdAt: varchar("createdAt"),
});

export const Patient = pgTable("patient", {
  id: serial("id").primaryKey(),
  patientId: varchar("patientId").notNull(), //ok
  doctorId: varchar("doctorId"), // doctor who prescribed medicine to the patient - ok
  pharmacistId: varchar("pharmacistId"), // pharmacist who sold medicine to the patient
  addedBy: varchar("addedBy"), // receptionist or admin who added this patient - ok
  updatedBy: varchar("updatedBy"),

  firstname: varchar("firstname"), //ok
  lastname: varchar("lastname"), //ok
  fullname: varchar("fullname"), //ok
  email: varchar("email"), //ok
  imageUrl: varchar("imageUrl"), //ok
  gender: varchar("gender"), //ok
  age: integer("age"), //ok
  address: varchar("address"), //ok
  contact: varchar("contact"), //ok
  occupation: varchar("occupation"), //ok
  emergencyContactName: varchar("emergencyContactName"), //ok
  emergencyContactNumber: varchar("emergencyContactNumber"), //ok
  insuranceProvider: varchar("insuranceProvider"), //ok
  insurancePolicyNumber: varchar("insurancePolicyNumber"), //ok
  identificationCardType: varchar("identificationCardType"), //ok
  identificationCardNumber: varchar("identificationCardNumber"), //ok

  conditionName: varchar("conditionName"), //ok
  conditionDescription: varchar("conditionDescription"), //ok
  conditionSeverity: varchar("conditionSeverity"), //ok
  allergies: varchar("allergies"), //ok
  familyMedicalHistory: varchar("familyMedicalHistory"), //ok

  prescription: text("prescription"), //ok

  medicines: text("medicines")
    .array()
    .default(sql`'{}'::text[]`), // list of medicine ids bought by this patient
  totalSales: numeric("totalSales"), // total sales generated from the bought medicines

  createdAt: varchar("createdAt"), //ok
  updatedAt: varchar("updatedAt"),
});

export const Appointment = pgTable("appointment", {
  id: serial("id").primaryKey(),
  appointmentId: varchar("appointmentId"),
  patientId: varchar("patientId"),
  doctorId: varchar("doctorId"),
  patientName: varchar("patientName"),
  doctorName: varchar("doctorName"),
  reason: varchar("reason"),
  status: varchar("status").default("pending"),
  timeStart: varchar("timeStart"),
  timeEnd: varchar("timeEnd"),
  createdAt: varchar("createdAt"),
});

export const Medicine = pgTable("medicine", {
  id: serial("id").primaryKey(),
  addedBy: varchar("addedBy"), //ok
  createdAt: varchar("createdAt"), //ok

  // basic information
  medicineId: varchar("medicineId"), //ok
  name: varchar("name"), //ok
  brand: varchar("brand"), //ok
  category: varchar("category"), // antibiotic or what - ok

  // composition and dosage
  activeIngredients: text("activeIngredients").array(), //ok
  dosage: varchar("dosage"), // in ml - ok
  form: varchar("form"), // tablet | capsule | syrup - ok

  // packaging and storage
  unitsPerPackage: varchar("unitsPerPackage"), // how many units per package, ml if syrup - ok
  storageCondition: varchar("storageCondition"), // room temperature | refrigeration - ok
  expiryDate: varchar("expiryDate"), //ok

  // inventory management
  stockQuantity: integer("stockQuantity"), // how many in total are there in the inventory - ok
  reorderLevel: integer("reorderLevel"), // quantity level of medicine inventory where you need to re order again - ok
  supplier: varchar("supplier"), // name of supplier - ok
  batchNumber: varchar("batchNumber"), //ok

  // financial information
  costPrice: integer("costPrice"), //ok
  sellingPrice: integer("sellingPrice"), //ok
  discount: integer("discount"), //ok

  // regulatory information
  prescriptionRequired: varchar("prescriptionRequired"), //ok
  fdaApproved: varchar("fdaApproved"), //ok
  usageWarnings: text("usageWarnings"), //ok

  // addtional information
  sideEffects: text("sideEffects"), //ok
  usageInstructions: text("usageInstructions"), //ok

  // optional
  imageUrl: varchar("imageUrl"), //ok
  notes: text("notes"), //ok
});
