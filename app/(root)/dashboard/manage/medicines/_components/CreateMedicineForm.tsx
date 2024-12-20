"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { medicineCategories } from "@/constants";
import { createMedicine } from "@/lib/actions/medicine";
import { getCurrentUser } from "@/lib/actions/user";
import { LoaderCircle, Send, X } from "lucide-react";
import moment from "moment";
import React, { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

const CreateMedicineForm = () => {
  const [currentUser, setCurrentUser] = useState<UserType>();

  const [category, setCategory] = useState<string>("");
  const [form, setForm] = useState<string>("");
  const [storageCondition, setStorageCondition] = useState<string>("");
  const [prescriptionRequired, setPrescriptionRequired] = useState<string>(""); // convert to boolean before passing to db
  const [fdaApproved, setFdaApproved] = useState<string>(""); // convert to boolean before passing to db

  // for input with multiple values
  const [ingredients, setIngredients] = useState<string>("");
  const [ingredientsArray, setIngredientsArray] = useState<string[]>([]); // stringify or join this first before assigning in the database
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const lastChar = value.charAt(value.length - 1);
    if (lastChar === ",") {
      const trimmedValue = value.slice(0, -1).trim();
      if (trimmedValue) {
        setIngredientsArray((prevArray) => [...prevArray, trimmedValue]);
        console.log(ingredientsArray);
      }
      setIngredients("");
    } else {
      setIngredients(value);
    }
  };
  const removeItem = (index: number) => {
    setIngredientsArray((prevArray) => prevArray.filter((_, i) => i !== index));
  };
  // for input with multiple values

  // get the current user
  const getUser = async () => {
    try {
      const result = await getCurrentUser();
      if (result?.data !== null) {
        setCurrentUser(result?.data);
      }
    } catch {
      toast(
        <p className="font-bold text-sm text-red-500">
          Internal error occured whil fetching user
        </p>
      );
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  // get the current user

  const handleSubmit = async (prevState: unknown, formData: FormData) => {
    try {
      const medicineId = uuidv4();

      const formField = {
        name: formData.get("name") as string,
        brand: formData.get("brand") as string,
        category: category as string,
        activeIngredients: ingredientsArray as string[],
        dosage: formData.get("dosage") as string,
        form: form as string,
        unitsPerPackage: formData.get("unitsPerPackage") as string,
        storageCondition: storageCondition as string,
        expiryDate: formData.get("expiryDate") as string,
        stockQuantity: formData.get("stockQuantity") as string,
        reorderLevel: formData.get("reorderLevel") as string,
        supplier: formData.get("supplier") as string,
        batchNumber: formData.get("batchNumber") as string,
        costPrice: formData.get("costPrice") as string,
        sellingPrice: formData.get("sellingPrice") as string,
        discount: formData.get("discount") as string,
        prescriptionRequired: prescriptionRequired as string,
        fdaApproved: fdaApproved as string,
        usageWarnings: formData.get("usageWarnings") as string,
        sideEffects: formData.get("sideEffects") as string,
        usageInstructions: formData.get("usageInstructions") as string,
        notes: formData.get("notes") as string,
      };

      const result = await createMedicine(
        prevState,
        currentUser?.email as string,
        moment().format("MM-DD-YYYY"),
        medicineId,
        formField
      );

      if (result?.data !== null) {
        toast(
          <p className="font-bold text-sm text-green-500">
            Medicine created successfully
          </p>
        );
      }
    } catch (error) {
      toast(
        <p className="font-bold text-sm text-red-500">
          Internal error occured while creating the medicine.
        </p>
      );
      console.log("create medicine error: ", error);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state, formAction, loading] = useActionState(handleSubmit, undefined);

  return (
    <form
      action={formAction}
      className="bg-dark-100 border border-t-primary rounded-lg flex flex-col gap-4 p-5"
    >
      {/* name - brand - category */}
      <div className="flex flex-col gap-2">
        <h1 className="text-center text-2xl font-bold">Basic Information</h1>
        <Separator className="border border-dark-200" />
        <div className="flex flex-col gap-4 mt-3">
          <div className="flex items-center justify-center gap-4 w-full mt-5">
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="" className="text-xs text-gray-400">
                Medicine Name
              </label>
              <Input
                type="text"
                id="name"
                name="name"
                placeholder="Enter medicine name"
              />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="" className="text-xs text-gray-400">
                Medicine Brand
              </label>
              <Input
                type="text"
                id="brand"
                name="brand"
                placeholder="Enter medicine brand"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="" className="text-xs text-gray-400">
              Medicine Category
            </label>
            <Select
              onValueChange={(value) =>
                setCategory(value ? value : "Antibiotic")
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {medicineCategories.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* activeIngredients - dosage - form */}
      <div className="flex flex-col gap-2 mt-10 border border-transparent border-t-primary py-3">
        <h1 className="text-center text-2xl font-bold">
          Composition and Dosage
        </h1>
        <Separator className="border border-dark-200" />
        <div className="flex flex-col gap-4 mt-3">
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="" className="text-xs text-gray-400">
              Active Ingredients
            </label>
            <div className="rounded-lg p-3 bg-dark">
              <p className="text-xs text-gray-400">
                Please add a comma after each tag
              </p>
              <ul className="flex items-center gap-2 overflow-auto card-scroll mt-3">
                {ingredientsArray.map((item: string, index: number) => (
                  <li
                    key={index}
                    className="min-w-32 max-w-32 min-h-12 max-h-12 text-xs rounded-lg bg-dark-100 flex items-center gap-2 justify-between p-3 overflow-hidden"
                  >
                    {item}
                    <X
                      onClick={() => removeItem(index)}
                      className="w-5 h-5 cursor-pointer text-red-500 p-1 bg-dark rounded-full"
                    />
                  </li>
                ))}
              </ul>
              <Input
                type="text"
                value={ingredients}
                onChange={handleInputChange}
                className="bg-dark-100 mt-3"
                placeholder="Add more ingredients"
              />
              <div className="flex items-end justify-end mt-2">
                <Button
                  className="bg-red-500 hover:bg-red-600 transition-all"
                  onClick={() => setIngredientsArray([])}
                >
                  Remove All
                </Button>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-4 w-full">
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="" className="text-xs text-gray-400">
                Dosage (in mL)
              </label>
              <Input
                type="text"
                id="dosage"
                name="dosage"
                placeholder="Enter medicine dosage"
              />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="" className="text-xs text-gray-400">
                Medicine Form
              </label>
              <Select
                onValueChange={(value) => setForm(value ? value : "tablet")}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Form" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tablet">Tablet</SelectItem>
                  <SelectItem value="capsule">Capsule</SelectItem>
                  <SelectItem value="syrup">Syrup</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* unitsPerPackage - storageCondition - expiryDate */}
      <div className="flex flex-col gap-2 mt-10 border border-transparent border-t-primary py-3">
        <h1 className="text-center text-2xl font-bold">
          Packaging and Storage
        </h1>
        <Separator className="border border-dark-200" />
        <div className="flex flex-col gap-4 mt-3">
          <div className="flex items-center justify-center gap-4 w-full mt-5">
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="" className="text-xs text-gray-400">
                How many units per package?
              </label>
              <Input type="text" id="unitsPerPackage" name="unitsPerPackage" />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="" className="text-xs text-gray-400">
                Where should the storage be?
              </label>
              <Select
                onValueChange={(value) =>
                  setStorageCondition(value ? value : "room temperature")
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Temperature" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="room temperature">
                    Room Temperature
                  </SelectItem>
                  <SelectItem value="refrigeration">Refrigeration</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="" className="text-xs text-gray-400">
              Expiration Date
            </label>
            <Input type="date" id="expiryDate" name="expiryDate" />
          </div>
        </div>
      </div>

      {/* stockQuantity - reorderLevel - supplier - batchNumber */}
      <div className="flex flex-col gap-2 mt-10 border border-transparent border-t-primary py-3">
        <h1 className="text-center text-2xl font-bold">Inventory Management</h1>
        <Separator className="border border-dark-200" />
        <div className="flex flex-col gap-4 mt-3">
          <div className="flex items-center justify-center gap-4 w-full mt-5">
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="" className="text-xs text-gray-400">
                Total stocks quantity
              </label>
              <Input type="number" id="stockQuantity" name="stockQuantity" />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="" className="text-xs text-gray-400">
                Stock quantity level before re-stocking
              </label>
              <Input type="number" id="reorderLevel" name="reorderLevel" />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 mt-3">
          <div className="flex items-center justify-center gap-4 w-full mt-5">
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="" className="text-xs text-gray-400">
                Supplier Name
              </label>
              <Input type="text" id="supplier" name="supplier" />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="" className="text-xs text-gray-400">
                Batch No.
              </label>
              <Input type="text" id="batchNumber" name="batchNumber" />
            </div>
          </div>
        </div>
      </div>

      {/* costPrice - sellingPrice - discount */}
      <div className="flex flex-col gap-2 mt-10 border border-transparent border-t-primary py-3">
        <h1 className="text-center text-2xl font-bold">
          Financial Information
        </h1>
        <Separator className="border border-dark-200" />
        <div className="flex flex-col gap-4 mt-3">
          <div className="flex items-center justify-center gap-4 w-full mt-5">
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="" className="text-xs text-gray-400">
                Cost Price
              </label>
              <Input type="number" id="costPrice" name="costPrice" />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="" className="text-xs text-gray-400">
                Selling Price
              </label>
              <Input type="number" id="sellingPrice" name="sellingPrice" />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="" className="text-xs text-gray-400">
            Discount (if any)
          </label>
          <Input type="number" id="discount" name="discount" />
        </div>
      </div>

      {/* prescriptionRequired - fdaApproved - usageWarnings */}
      <div className="flex flex-col gap-2 mt-10 border border-transparent border-t-primary py-3">
        <h1 className="text-center text-2xl font-bold">
          Regulatory Information
        </h1>
        <Separator className="border border-dark-200" />
        <div className="flex flex-col gap-4 mt-3">
          <div className="flex items-center justify-center gap-4 w-full mt-5">
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="" className="text-xs text-gray-400">
                Does this medicine needs prescription to be sold?
              </label>
              <Select
                onValueChange={(value) =>
                  setPrescriptionRequired(value ? value : "true")
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Needs prescription" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={"true"}>Needs prescription</SelectItem>
                  <SelectItem value={"false"}>
                    Do not need prescription
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="" className="text-xs text-gray-400">
                Is this medicine FDA approved?
              </label>
              <Select
                onValueChange={(value) =>
                  setFdaApproved(value ? value : "true")
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="FDA Approved" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={"true"}>FDA Approved</SelectItem>
                  <SelectItem value={"false"}>Not FDA Approved</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="" className="text-xs text-gray-400">
            Usage Warnings
          </label>
          <Textarea
            rows={5}
            id="usageWarnings"
            name="usageWarnings"
            placeholder="Enter usage warnings..."
          />
        </div>
      </div>

      {/* sideEffects - usageInstructions - notes */}
      <div className="flex flex-col gap-2 mt-10 border border-transparent border-t-primary py-3">
        <h1 className="text-center text-2xl font-bold">
          Additional Information
        </h1>
        <Separator className="border border-dark-200" />
        <div className="flex flex-col gap-4 mt-3">
          <div className="flex flex-col gap-1 w-full mt-5">
            <label htmlFor="" className="text-xs text-gray-400">
              Side Effects (if any)
            </label>
            <Textarea
              rows={5}
              id="sideEffects"
              name="sideEffects"
              placeholder="Enter side effects if any..."
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="" className="text-xs text-gray-400">
              Usage Instructions
            </label>
            <Textarea
              rows={5}
              id="usageInstructions"
              name="usageInstructions"
              placeholder="Enter instructions here..."
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="" className="text-xs text-gray-400">
              Notes
            </label>
            <Textarea
              rows={5}
              id="notes"
              name="notes"
              placeholder="Enter additional notes..."
            />
          </div>
        </div>
      </div>

      <div className="flex items-end justify-end">
        <Button
          type="submit"
          className="flex items-center gap-2 justify-center min-w-52 max-w-52"
          disabled={loading}
        >
          {loading ? (
            <LoaderCircle className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <Send className="w-5 h-5" /> Submit
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

export default CreateMedicineForm;