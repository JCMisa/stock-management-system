"use server";

import { db } from "@/utils/db";
import { parseStringify } from "../utils";
import { Appointment } from "@/utils/schema";

export const addAppointment = async (
  appointmentId: string,
  patientId: string,
  doctorId: string,
  patientName: string,
  reason: string,
  status: string,
  createdAt: string
) => {
  try {
    const data = await db.insert(Appointment).values({
      appointmentId: appointmentId,
      patientId: patientId,
      doctorId: doctorId,
      patientName: patientName,
      reason: reason,
      status: status,
      createdAt: createdAt,
    });
    if (data) {
      return parseStringify({ data: data });
    }
    return parseStringify({ data: null });
  } catch (error) {
    handleError(error);
  }
};

const handleError = (error: unknown) => {
  console.log("Internal error: ", error);
  return parseStringify({ data: null });
};
