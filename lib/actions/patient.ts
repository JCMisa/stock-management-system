"use server";

import { db } from "@/utils/db";
import { parseStringify } from "../utils";
import { Patient } from "@/utils/schema";
import { eq } from "drizzle-orm";

export const getAllPatients = async () => {
  try {
    const data = await db.select().from(Patient);

    return parseStringify({ data: data });
  } catch (error) {
    handleError(error);
  }
};

export const getPatientLayout = async (patientId: string) => {
  try {
    const data = await db
      .select()
      .from(Patient)
      .where(eq(Patient.patientId, patientId));
    if (data?.length > 0) {
      return parseStringify({ data: data[0] });
    }
    return parseStringify({ data: null });
  } catch (error) {
    handleError(error);
  }
};

export const createPatientLayout = async (
  state: unknown,
  patientId: string,
  addedBy: string,
  form: {
    firstname: string;
    lastname: string;
    email: string;
    conditionName: string;
    age: string;
    gender: string;
  }
) => {
  try {
    const data = await db.insert(Patient).values({
      patientId: patientId,
      addedBy: addedBy,
      firstname: form.firstname,
      lastname: form.lastname,
      email: form.email,
      conditionName: form.conditionName,
      age: Number(form.age),
      gender: form.gender,
    });

    if (data) {
      return parseStringify({ data: data });
    }
    return parseStringify({ data: null });
  } catch (error) {
    handleError(error);
  }
};

export const updatePatientAvatar = async (
  patientId: string,
  downloadUrl: string
) => {
  try {
    const data = await db
      .update(Patient)
      .set({
        imageUrl: downloadUrl,
      })
      .where(eq(Patient.patientId, patientId));

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
