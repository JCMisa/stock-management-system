"use server";

import { db } from "@/utils/db";
import { parseStringify } from "../utils";
import { Transaction } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { getMedicineByMedicineId, updateStockQuantity } from "./medicine";

export const getAllTransactions = async () => {
  try {
    const data = await db.select().from(Transaction);

    return parseStringify({ data: data });
  } catch (error) {
    handleError(error);
  }
};

export const getTransaction = async (transactionId: string) => {
  try {
    const data = await db
      .select()
      .from(Transaction)
      .where(eq(Transaction.transactionId, transactionId));

    if (data?.length > 0) {
      return parseStringify({ data: data[0] });
    }
    return parseStringify({ data: null });
  } catch (error) {
    handleError(error);
  }
};

export const createTransaction = async (
  state: unknown,
  form: {
    transactionId: string;
    patientId: string;
    patientName: string;
    sellerEmail: string;
    medicines: string[];
    totalSales: string;
    transactionDate: string;
  }
) => {
  try {
    const totalSales =
      form.totalSales.trim() === ""
        ? "0"
        : parseFloat(form.totalSales).toFixed(2).toString();

    const data = await db.insert(Transaction).values({
      transactionId: form.transactionId as string,
      patientId: form.patientId,
      patientName: form.patientName,
      sellerEmail: form.sellerEmail,
      medicines: form.medicines,
      totalSales: totalSales,
      transactionDate: form.transactionDate,
    });

    if (data) {
      for (const medicineId of form.medicines) {
        console.log("medicine ids in server: ", medicineId);
        const medicineRecord = await getMedicineByMedicineId(medicineId);
        if (medicineRecord?.data !== null) {
          const stockQuantity = medicineRecord?.data?.stockQuantity;
          const decrementedStockQuantity = Number(stockQuantity) - 1;
          const updateStock = await updateStockQuantity(
            medicineId,
            decrementedStockQuantity
          );
          if (updateStock?.data !== null) {
            console.log(
              medicineId,
              "'s stock decremented value: ",
              stockQuantity
            );
          }
        }
      }
      return parseStringify({ data: data });
    }
    return parseStringify({ data: null });
  } catch (error) {
    handleError(error);
  }
};

export const deleteTransaction = async (transactionId: string) => {
  try {
    const data = await db
      .delete(Transaction)
      .where(eq(Transaction.transactionId, transactionId));

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
