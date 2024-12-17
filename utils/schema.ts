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
  patientId: varchar("patientId").notNull(),
  doctorId: varchar("doctorId"), // doctor who prescribed medicine to the patient
  pharmacistId: varchar("pharmacistId"), // pharmacist who sold medicine to the patient
  addedBy: varchar("addedBy"), // receptionist or admin who added this patient

  firstname: varchar("firstname"),
  lastname: varchar("lastname"),
  fullname: varchar("fullname"),
  email: varchar("email"),
  imageUrl: varchar("imageUrl"),
  gender: varchar("gender"),
  age: integer("age"),
  address: varchar("address"),
  contact: varchar("contact"),
  occupation: varchar("occupation"),
  emergencyContactName: varchar("emergencyContactName"),
  emergencyContactNumber: varchar("emergencyContactNumber"),
  insuranceProvider: varchar("insuranceProvider"),
  insurancePolicyNumber: varchar("insurancePolicyNumber"),
  identificationCardType: varchar("identificationCardType"),
  identificationCardNumber: varchar("identificationCardNumber"),
  identificationImageUrl: varchar("identificationImageUrl"),

  conditionName: varchar("conditionName"),
  conditionDescription: varchar("conditionDescription"),
  conditionSeverity: varchar("conditionSeverity"),
  allergies: varchar("allergies"),
  familyMedicalHistory: varchar("familyMedicalHistory"),

  medicines: text("medicines")
    .array()
    .default(sql`'{}'::text[]`), // list of medicine ids bought by this patient
  totalSales: numeric("totalSales"), // total sales generated from the bought medicines

  createdAt: varchar("createdAt"),
  updatedAt: varchar("updatedAt"),
});
