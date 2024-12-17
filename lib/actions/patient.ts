"use server";

import { db } from "@/utils/db";
import { parseStringify } from "../utils";
import { Patient } from "@/utils/schema";

export const getAllPatients = async () => {
  try {
    const data = await db.select().from(Patient);

    return parseStringify({ data: data });
  } catch (error) {
    handleError(error);
  }
};

const handleError = (error: unknown) => {
  console.log("Internal error: ", error);
  return parseStringify({ data: null });
};
