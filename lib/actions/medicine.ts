"use server";

import { db } from "@/utils/db";
import { parseStringify } from "../utils";
import { Medicine } from "@/utils/schema";
import moment from "moment";

export const getAllMedicines = async () => {
  try {
    const data = await db.select().from(Medicine);

    return parseStringify({ data: data });
  } catch (error) {
    handleError(error);
  }
};

export const createMedicine = async (
  state: unknown,
  addedBy: string,
  createdAt: string,
  medicineId: string,
  form: {
    name: string;
    brand: string;
    category: string;
    activeIngredients: string[];
    dosage: string;
    form: string;
    unitsPerPackage: string;
    storageCondition: string;
    expiryDate: string;
    stockQuantity: string;
    reorderLevel: string;
    supplier: string;
    batchNumber: string;
    costPrice: string;
    sellingPrice: string;
    discount: string;
    prescriptionRequired: string;
    fdaApproved: string;
    usageWarnings: string;
    sideEffects: string;
    usageInstructions: string;
    notes: string;
  }
) => {
  try {
    const data = await db.insert(Medicine).values({
      addedBy: addedBy,
      createdAt: createdAt,
      medicineId: medicineId,
      name: form.name,
      brand: form.brand,
      category: form.category,
      activeIngredients: form.activeIngredients,
      dosage: form.dosage,
      form: form.form,
      unitsPerPackage: form.unitsPerPackage,
      storageCondition: form.storageCondition,
      expiryDate: moment(form.expiryDate).format("MM-DD-YYYY"),
      stockQuantity: parseInt(form.stockQuantity),
      reorderLevel: parseInt(form.reorderLevel),
      supplier: form.supplier,
      batchNumber: form.batchNumber,
      costPrice: parseInt(form.costPrice),
      sellingPrice: parseInt(form.sellingPrice),
      discount: parseInt(form.discount),
      prescriptionRequired: form.prescriptionRequired === "true",
      fdaApproved: form.fdaApproved === "true",
      usageWarnings: form.usageWarnings,
      sideEffects: form.sideEffects,
      usageInstructions: form.usageInstructions,
      notes: form.notes,
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
