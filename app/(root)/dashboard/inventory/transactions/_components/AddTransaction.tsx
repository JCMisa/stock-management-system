import { LoaderCircle, PlusCircle, X } from "lucide-react";
import React, { useActionState, useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { getAllPatients } from "@/lib/actions/patient";
import Image from "next/image";
import { getAllMedicines } from "@/lib/actions/medicine";
import { v4 as uuidv4 } from "uuid";
import { getCurrentUser } from "@/lib/actions/user";
import { AlertDialogDescription } from "@radix-ui/react-alert-dialog";
import moment from "moment";
import { createTransaction } from "@/lib/actions/transaction";

const AddTransaction = () => {
  const [currentUser, setCurrentUser] = useState<UserType>();
  const [patientsList, setPatientsList] = useState<PatientType[]>([]);
  const [medicinesList, setMedicinesList] = useState<MedicineType[]>([]);
  const [patientId, setPatientId] = useState<string>("");

  const [medicinesArray, setMedicinesArray] = useState<string[]>([]); // use medicinesArray as value of medicines property in db
  const handleSelectChange = (value: string) => {
    if (value) {
      setMedicinesArray((prevArray) => [...prevArray, value]);
    }
    console.log("medicines: ", medicinesArray);
    console.log("total sales: ", getTotalSales());
  };
  const removeItem = (index: number) => {
    setMedicinesArray((prevArray) => prevArray.filter((_, i) => i !== index));
  };

  const getTotalSales = () => {
    return medicinesArray.reduce((acc: number, curr) => {
      const medicine = medicinesList.find((m) => m.medicineId === curr);
      if (medicine) {
        return acc + Number(medicine.sellingPrice);
      }
      return acc;
    }, 0);
  };

  const getUser = async () => {
    try {
      const result = await getCurrentUser();
      if (result?.data !== null) {
        setCurrentUser(result?.data);
      }
    } catch {
      toast(
        <p className="text-sm font-bold text-red-500">
          Internal error occured while fetching current user
        </p>
      );
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  const getPatientsList = async () => {
    try {
      const result = await getAllPatients();
      if (result?.data !== null) {
        setPatientsList(result?.data);
      }
    } catch {
      toast(
        <p className="text-sm font-bold text-red-500">
          Internal error occured while fetching all patients
        </p>
      );
    }
  };
  useEffect(() => {
    getPatientsList();
  }, []);

  const getMedicinesList = async () => {
    try {
      const result = await getAllMedicines();
      if (result?.data !== null) {
        setMedicinesList(result?.data);
      }
    } catch {
      toast(
        <p className="text-sm font-bold text-red-500">
          Internal error occured while fetching all medicines
        </p>
      );
    }
  };
  useEffect(() => {
    getMedicinesList();
  }, []);

  const handleSubmit = async (prevState: unknown, formData: FormData) => {
    try {
      const transactionId = uuidv4();

      const formField = {
        transactionId: transactionId as string,
        patientId: patientId as string,
        patientName: formData.get("patientName") as string,
        sellerEmail: currentUser?.email as string,
        medicines: medicinesArray as string[],
        totalSales: getTotalSales().toString(),
        transactionDate: moment().format("MM-DD-YYYY"),
      };

      const result = await createTransaction(prevState, formField);

      if (result?.data !== null) {
        toast(
          <p className="font-bold text-sm text-green-500">
            Transaction created successfully
          </p>
        );
      }
    } catch {
      toast(
        <p className="text-sm font-bold text-red-500">
          Internal error occured while saving transaction
        </p>
      );
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state, formAction, loading] = useActionState(handleSubmit, undefined);

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <div className="flex items-center justify-center gap-1 p-3 px-5 min-w-52 max-w-52 bg-primary hover:bg-primary-100 transition-all cursor-pointer rounded-lg">
          <PlusCircle className="w-5 h-5" />
          <p className="text-sm">Add Transaction</p>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-h-[30rem] overflow-auto card-scroll">
        <AlertDialogHeader>
          <AlertDialogTitle>Add New Transaction</AlertDialogTitle>
          <AlertDialogDescription className="text-xs text-gray-400">
            Add new transaction and provide bought medicines to calculate
            generated income.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <form action={formAction} className="flex flex-col w-full">
          <div className="flex flex-col gap-3 w-full">
            <div className="flex items-center justify-center w-full gap-2">
              <div className="flex flex-col gap-1 w-full">
                <label className="text-xs text-gray-400">
                  Patient ID <span className="text-[10px]">optional</span>
                </label>
                <Select
                  onValueChange={(value) =>
                    setPatientId(value ? value : "no record")
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Patient" />
                  </SelectTrigger>
                  <SelectContent>
                    {patientsList?.length > 0 &&
                      patientsList?.map((patient) => (
                        <SelectItem
                          key={patient?.patientId}
                          value={patient?.patientId}
                        >
                          <div className="flex items-center gap-2">
                            {patient?.imageUrl ? (
                              <Image
                                src={patient?.imageUrl}
                                alt="avatar"
                                width={1000}
                                height={1000}
                                className="w-7 h-7 rounded-full"
                              />
                            ) : (
                              <Image
                                src={"/empty-img.png"}
                                alt="avatar"
                                width={1000}
                                height={1000}
                                className="w-7 h-7 rounded-full"
                              />
                            )}
                            <p className="text-sm">{patient?.fullname}</p>
                          </div>
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-1 w-full">
                <label className="text-xs text-gray-400">Patient Name</label>
                <Input
                  type="text"
                  name="patientName"
                  placeholder="Enter patient name"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1 mt-3">
              <p className="text-xs text-gray-400">Please select medicines</p>
              <ul className="flex items-center w-[27rem] gap-2 overflow-auto card-scroll mb-3">
                {medicinesArray.map((item: string, index: number) => (
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
              <Select onValueChange={handleSelectChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select medicines" />
                </SelectTrigger>
                <SelectContent>
                  {medicinesList?.length > 0 &&
                    medicinesList?.map((medicine) => (
                      <SelectItem
                        key={medicine?.medicineId}
                        value={medicine?.medicineId}
                      >
                        <div className="flex items-center gap-2">
                          {medicine?.imageUrl ? (
                            <Image
                              src={medicine?.imageUrl}
                              alt="avatar"
                              width={1000}
                              height={1000}
                              className="w-7 h-7 rounded-full"
                            />
                          ) : (
                            <Image
                              src={"/empty-img.png"}
                              alt="avatar"
                              width={1000}
                              height={1000}
                              className="w-7 h-7 rounded-full"
                            />
                          )}
                          <p className="text-sm">{medicine?.name}</p>
                        </div>
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <div className="flex items-end justify-end mt-2">
                <div
                  className="text-red-500 hover:text-red-600 transition-all text-xs cursor-pointer"
                  onClick={() => setMedicinesArray([])}
                >
                  Remove All
                </div>
              </div>
            </div>
          </div>

          <AlertDialogFooter className="mt-4">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button type="submit" className="flex items-center gap-1">
              {loading ? (
                <LoaderCircle className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <PlusCircle className="w-5 h-5" /> Add
                </>
              )}
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AddTransaction;
