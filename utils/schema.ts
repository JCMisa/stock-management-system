import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const User = pgTable("user", {
  id: serial("id").primaryKey(),
  userId: varchar("userId").notNull(),
  email: varchar("email").notNull(),
  firstname: varchar("firstname"),
  lastname: varchar("lastname"),
  imageUrl: varchar("imageUrl"),
  gender: varchar("gender"),
  dateOfBirth: varchar("dateOfBirth"),
  contact: varchar("contact"),
  address: varchar("address"),
  role: varchar("role"),
});
