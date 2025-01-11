"use server";

import { db } from "@/utils/db";
import { parseStringify } from "../utils";
import { Transaction } from "@/utils/schema";
import { eq, sum } from "drizzle-orm";
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

export const getTotalSales = async () => {
  try {
    const data = await db
      .select({
        totalSales: sum(Transaction.totalSales),
      })
      .from(Transaction);

    if (data?.length > 0) {
      return parseStringify({ data: data[0]?.totalSales });
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

export const addTransaction = async (
  state: unknown,
  form: {
    transactionId: string;
    patientId: string;
    patientName: string;
    sellerEmail: string;
    medicines: [{ medicineId: string; quantity: string }];
    totalSales: string;
    transactionDate: string;
  }
) => {
  const medicineIds = form.medicines.map((item) => item.medicineId);
  const quantities = form.medicines.map((item) => item.quantity);
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
      medicineData: form.medicines,
      medicines: medicineIds,
      quantities: quantities,
      totalSales: totalSales,
      transactionDate: form.transactionDate,
    });

    if (data) {
      for (const medicine of form.medicines) {
        console.log("medicine ids in server: ", medicine.medicineId);
        const medicineRecord = await getMedicineByMedicineId(
          medicine?.medicineId
        );
        if (medicineRecord?.data !== null) {
          const stockQuantity = medicineRecord?.data?.stockQuantity;
          const decrementedStockQuantity =
            Number(stockQuantity) - Number(medicine.quantity);
          const updateStock = await updateStockQuantity(
            medicine.medicineId,
            decrementedStockQuantity
          );
          if (updateStock?.data !== null) {
            console.log(
              medicine.medicineId,
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

export const updateTransaction = async (
  state: unknown,
  form: {
    transactionId: string;
    patientId: string;
    patientName: string;
    sellerEmail: string;
    medicines: [{ medicineId: string; quantity: string }];
    totalSales: string;
    transactionDate: string;
  }
) => {
  try {
    // First get the existing transaction to compare quantities
    const existingTransaction = await db.query.Transaction.findFirst({
      where: eq(Transaction.transactionId, form.transactionId),
    });

    if (!existingTransaction) {
      throw new Error("Transaction not found");
    }

    const existingMedicineData = existingTransaction.medicineData as {
      medicineId: string;
      quantity: string;
    }[];

    // Create a map of existing quantities for easy lookup
    // gumawa ng new array na yung quantity property ay naka number format
    const existingQuantities = new Map(
      existingMedicineData.map((med) => [med.medicineId, Number(med.quantity)])
    );

    const medicineIds = form.medicines.map((item) => item.medicineId); // array na ang laman ay mga medicineId lang
    const quantities = form.medicines.map((item) => item.quantity); // array na ang laman ay mga quantity lang

    // Update the transaction record
    const totalSales =
      form.totalSales.trim() === ""
        ? "0"
        : parseFloat(form.totalSales).toFixed(2).toString();

    const data = await db
      .update(Transaction)
      .set({
        patientId: form.patientId,
        patientName: form.patientName,
        sellerEmail: form.sellerEmail,
        medicineData: form.medicines,
        medicines: medicineIds,
        quantities: quantities,
        totalSales: totalSales,
        transactionDate: form.transactionDate,
      })
      .where(eq(Transaction.transactionId, form.transactionId));

    if (data) {
      // Handle stock updates for each medicine
      for (const medicine of form.medicines) {
        const medicineRecord = await getMedicineByMedicineId(
          medicine.medicineId
        );
        if (!medicineRecord?.data) continue;

        const currentStock = medicineRecord.data.stockQuantity;
        const newQuantity = Number(medicine.quantity);
        const oldQuantity = existingQuantities.get(medicine.medicineId) || 0;

        // Calculate the stock adjustment
        let stockAdjustment = 0;

        if (newQuantity > oldQuantity) {
          // More medicines were added, decrease stock
          stockAdjustment = -(newQuantity - oldQuantity);
        } else if (newQuantity < oldQuantity) {
          // Medicines were returned, increase stock
          stockAdjustment = oldQuantity - newQuantity;
        }

        if (stockAdjustment !== 0) {
          const newStock = Number(currentStock) + stockAdjustment;
          await updateStockQuantity(medicine.medicineId, newStock);
          console.log(
            `Updated stock for medicine ${medicine.medicineId}: ${currentStock} -> ${newStock} (adjustment: ${stockAdjustment})`
          );
        }
      }

      // Handle medicines that were completely removed
      for (const oldMedicine of existingMedicineData) {
        if (
          !form.medicines.find((m) => m.medicineId === oldMedicine.medicineId)
        ) {
          // This medicine was removed, return its quantity to stock
          const medicineRecord = await getMedicineByMedicineId(
            oldMedicine.medicineId
          );
          if (medicineRecord?.data) {
            const currentStock = medicineRecord.data.stockQuantity;
            const returnedQuantity = Number(oldMedicine.quantity);
            const newStock = Number(currentStock) + returnedQuantity;
            await updateStockQuantity(oldMedicine.medicineId, newStock);
            console.log(
              `Returned stock for removed medicine ${oldMedicine.medicineId}: ${currentStock} -> ${newStock} (returned: ${returnedQuantity})`
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
    const transactionRecord = await getTransaction(transactionId);
    if (transactionRecord?.data !== null) {
      const medicines = transactionRecord?.data?.medicineData;
      if (medicines?.length > 0) {
        for (const medicine of medicines) {
          const medicineRecord = await getMedicineByMedicineId(
            medicine.medicineId
          );
          if (medicineRecord?.data !== null) {
            const stockQuantity = medicineRecord?.data?.stockQuantity;
            const incrementedStockQuantity =
              Number(stockQuantity) + Number(medicine.quantity);
            const updateStock = await updateStockQuantity(
              medicine.medicineId,
              incrementedStockQuantity
            );
            if (updateStock?.data !== null) {
              console.log(
                medicine.medicineId,
                "'s stock incremented value: ",
                stockQuantity
              );
            }
          }
        }
      }

      const data = await db
        .delete(Transaction)
        .where(eq(Transaction.transactionId, transactionId));

      if (data) {
        return parseStringify({ data: data });
      }
      return parseStringify({ data: null });
    }
  } catch (error) {
    handleError(error);
  }
};

const handleError = (error: unknown) => {
  console.log("Internal error: ", error);
  return parseStringify({ data: null });
};
