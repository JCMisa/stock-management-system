"use server";

import { db } from "@/utils/db";
import { parseStringify } from "../utils";
import { Medicine } from "@/utils/schema";
import moment from "moment";
import { eq } from "drizzle-orm";

export const getAllMedicines = async () => {
  try {
    const data = await db.select().from(Medicine);

    return parseStringify({ data: data });
  } catch (error) {
    handleError(error);
  }
};

export const getMedicineByMedicineId = async (medicineId: string) => {
  try {
    const data = await db
      .select()
      .from(Medicine)
      .where(eq(Medicine.medicineId, medicineId));

    if (data?.length > 0) {
      return parseStringify({ data: data[0] });
    }
    return parseStringify({ data: null });
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
      stockQuantity: parseInt(form.stockQuantity) || 0,
      reorderLevel: parseInt(form.reorderLevel) || 0,
      supplier: form.supplier,
      batchNumber: form.batchNumber,
      costPrice: parseInt(form.costPrice) || 0,
      sellingPrice: parseInt(form.sellingPrice) || 0,
      discount: parseInt(form.discount) || 0,
      prescriptionRequired: form.prescriptionRequired,
      fdaApproved: form.fdaApproved,
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

export const updateMedicine = async (
  state: unknown,
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
    const existingMedicine = await getMedicineByMedicineId(medicineId);
    const expiryDate = form.expiryDate
      ? moment(form.expiryDate).format("MM-DD-YYYY")
      : existingMedicine.expiryDate;

    const data = await db
      .update(Medicine)
      .set({
        name: form.name,
        brand: form.brand,
        category: form.category,
        activeIngredients: form.activeIngredients,
        dosage: form.dosage,
        form: form.form,
        unitsPerPackage: form.unitsPerPackage,
        storageCondition: form.storageCondition,
        expiryDate: expiryDate,
        stockQuantity: parseInt(form.stockQuantity) || 0,
        reorderLevel: parseInt(form.reorderLevel) || 0,
        supplier: form.supplier,
        batchNumber: form.batchNumber,
        costPrice: parseInt(form.costPrice) || 0,
        sellingPrice: parseInt(form.sellingPrice) || 0,
        discount: parseInt(form.discount) || 0,
        prescriptionRequired: form.prescriptionRequired,
        fdaApproved: form.fdaApproved,
        usageWarnings: form.usageWarnings,
        sideEffects: form.sideEffects,
        usageInstructions: form.usageInstructions,
        notes: form.notes,
      })
      .where(eq(Medicine.medicineId, medicineId));

    if (data) {
      return parseStringify({ data: data });
    }
    return parseStringify({ data: null });
  } catch (error) {
    handleError(error);
  }
};

export const updateMedicineImage = async (
  medicineId: string,
  downloadUrl: string
) => {
  try {
    const data = await db
      .update(Medicine)
      .set({
        imageUrl: downloadUrl,
      })
      .where(eq(Medicine.medicineId, medicineId));

    if (data) {
      return parseStringify({ data: data });
    }
    return parseStringify({ data: null });
  } catch (error) {
    handleError(error);
  }
};

export const deleteMedicine = async (medicineId: string) => {
  try {
    const data = await db
      .delete(Medicine)
      .where(eq(Medicine.medicineId, medicineId));

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
