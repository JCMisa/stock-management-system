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
