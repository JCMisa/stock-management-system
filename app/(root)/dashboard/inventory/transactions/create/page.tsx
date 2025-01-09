/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useActionState, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { LoaderCircle, Search } from "lucide-react";
import { toast } from "sonner";
import { getAllPatients, getPatientLayout } from "@/lib/actions/patient";
import Image from "next/image";
import moment from "moment";
import { Button } from "@/components/ui/button";
import LoaderDialog from "@/components/custom/LoaderDialog";
import { v4 as uuidv4 } from "uuid";
import { getCurrentUser } from "@/lib/actions/user";
import { getAllMedicines } from "@/lib/actions/medicine";
import { addTransaction } from "@/lib/actions/transaction";
import { useRouter } from "next/navigation";

const CreateTransaction = () => {
  const router = useRouter();

  const [patientsList, setPatientsList] = useState<PatientType[]>([]);
  const [currentUser, setCurrentUser] = useState<UserType>();
  const [medicinesList, setMedicinesList] = useState<MedicineType[]>([]);
  const [patientId, setPatientId] = useState<string>("");
  const [filteredPatients, setFilteredPatients] = useState(patientsList);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [patientPrescription, setPatientPrescription] = useState<string>("");
  const [medicineData, setMedicineData] = useState([
    { medicineId: "", quantity: "" },
  ]);
  const [loading, setLoading] = useState(false);

  const getPatientsList = async () => {
    try {
      setLoading(true);

      const result = await getAllPatients();
      if (result?.data !== null) {
        setPatientsList(result.data);
      } else {
        setPatientsList([]);
      }
    } catch {
      toast(
        <p className="text-sm font-bold text-red-500">
          Internal error occured while fetching all patients
        </p>
      );
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getPatientsList();
  }, []);

  useEffect(() => {
    setFilteredPatients(patientsList);
  }, [patientsList]);

  useEffect(() => {
    if (date) {
      const formatedDate = moment(date).format("MM-DD-YYYY");
      if (formatedDate === "") {
        setFilteredPatients(patientsList);
      } else {
        const filtered = patientsList.filter((patient) =>
          patient?.createdAt.toLowerCase().includes(formatedDate)
        );
        setFilteredPatients(filtered);
      }
    }
  }, [date, patientsList]);

  const handleSearch = () => {
    if (searchTerm !== "") {
      const formattedSearchTerm = searchTerm.toLowerCase();
      if (formattedSearchTerm.trim() === "") {
        setFilteredPatients(patientsList);
      } else {
        const filtered = patientsList.filter((patient) =>
          patient?.fullname.toLowerCase().includes(formattedSearchTerm)
        );
        setFilteredPatients(filtered);
      }
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const getUser = async () => {
    try {
      setLoading(true);

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
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  const getMedicinesList = async () => {
    try {
      setLoading(true);

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
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getMedicinesList();
  }, []);

  const getPatientPrescription = async () => {
    try {
      const result = await getPatientLayout(patientId);
      if (result?.data !== null) {
        setPatientPrescription(result?.data?.prescription);
      }
    } catch {
      toast(
        <p className="text-sm font-bold text-red-500">
          Internal error occured while fetching patient prescription
        </p>
      );
    }
  };
  useEffect(() => {
    getPatientPrescription();
  }, [patientId]);

  const handleAddMedicine = () => {
    setMedicineData([...medicineData, { medicineId: "", quantity: "" }]);
  };

  const handleRemove = (i: number) => {
    const deleteVal = [...medicineData];
    deleteVal.splice(i, 1);
    setMedicineData(deleteVal);
  };

  const handleQuantityChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    i: number
  ) => {
    const { name, value } = e.target;
    const onChangeVal = [...medicineData];
    onChangeVal[i] = { ...onChangeVal[i], [name]: value };
    setMedicineData(onChangeVal);
  };

  const handleMedicineChange = (val: string, i: number) => {
    const onChangeVal = [...medicineData];
    onChangeVal[i] = { ...onChangeVal[i], medicineId: val };
    setMedicineData(onChangeVal);
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    medicineData.forEach(({ medicineId, quantity }) => {
      const medicine = medicinesList.find(
        (med) => med.medicineId === medicineId
      );
      if (medicine) {
        totalPrice += medicine.sellingPrice * Number(quantity);
      }
    });
    return totalPrice;
  };

  // const saveMedicineData = () => {
  //   console.log(medicineData);

  //   const totalPrice = calculateTotalPrice();
  //   console.log("Total Price:", totalPrice, "pesos");
  // };

  const handleSubmit = async (prevState: unknown, formData: FormData) => {
    try {
      const transactionId = uuidv4();

      const formField = {
        transactionId: transactionId as string,
        patientId: patientId as string,
        patientName: formData.get("patientName") as string,
        sellerEmail: currentUser?.email as string,
        medicines: medicineData as [{ medicineId: string; quantity: string }],
        totalSales: calculateTotalPrice().toString(),
        transactionDate: moment().format("MM-DD-YYYY"),
      };

      const result = await addTransaction(prevState, formField);

      if (result?.data !== null) {
        toast(
          <p className="font-bold text-sm text-green-500">
            Transaction created successfully
          </p>
        );

        router.push("/dashboard/inventory/transactions");
      }
    } catch {
      toast(
        <p className="text-red-500 text-sm font-bold">
          Internal error occured while adding transaction
        </p>
      );
    } finally {
      setLoading(false);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state, formAction, pending] = useActionState(handleSubmit, undefined);

  return (
    <div>
      <h2 className="text-2xl font-bold">Add Transaction</h2>
      <p className="text-sm text-gray-400">
        Add new transaction and provide bought medicines to calculate generated
        income.
      </p>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5 my-5">
        {/* form area */}
        <form className="flex flex-col gap-4" action={formAction}>
          {/* select patient */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-400">
              Patient (optional)
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
                <div className="mb-3 flex items-start justify-between w-full gap-3 bg-dark-100">
                  <div className="flex items-center border border-gray-400 rounded-lg px-3 w-full">
                    <Search
                      onClick={handleSearch}
                      className="cursor-pointer hover:scale-95"
                    />
                    <Input
                      type="text"
                      className="border-none bg-dark-100"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Search patients"
                    />
                  </div>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                  />
                </div>
                <div className="min-h-52 max-h-52 overflow-auto card-scroll">
                  {(filteredPatients?.length > 0
                    ? filteredPatients
                    : patientsList
                  )?.map((patient) => (
                    <SelectItem
                      key={patient?.patientId}
                      value={patient?.patientId}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1">
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

                        <p className="text-xs text-gray-400 flex items-center gap-2">
                          Appointment date: {patient?.createdAt}
                        </p>
                      </div>
                    </SelectItem>
                  ))}
                </div>
              </SelectContent>
            </Select>
          </div>

          {/* patient name */}
          <div className="flex flex-col gap-1 w-full">
            <label className="text-sm font-medium text-gray-400">
              Patient Name
            </label>
            <Input
              type="text"
              name="patientName"
              placeholder="Enter patient name"
            />
          </div>

          {/* multiple medicines can be picked */}
          <div className="flex flex-col gap-1 w-full my-3">
            <div className="w-full flex items-center justify-between">
              <label className="text-sm font-medium text-gray-400">
                Medicines
              </label>
              <Button type="button" onClick={handleAddMedicine}>
                Add
              </Button>
            </div>
            {medicineData.map((val, i: number) => (
              <div key={i} className="flex items-center gap-3">
                {/* <Input
                  name="medicineId"
                  value={val.medicineId}
                  onChange={(e) => handleChange(e, i)}
                /> */}
                <Select onValueChange={(val) => handleMedicineChange(val, i)}>
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
                <Input
                  name="quantity"
                  type="number"
                  value={val.quantity}
                  onChange={(e) => handleQuantityChange(e, i)}
                />
                <Button
                  type="button"
                  className="bg-red-500 hover:bg-red-600"
                  onClick={() => handleRemove(i)}
                >
                  Remove
                </Button>
              </div>
            ))}
            {/* <p>{JSON.stringify(medicineData)}</p> */}
            {/* <Button type="button" onClick={saveMedicineData}>
              Save
            </Button> */}
          </div>

          <Button type="submit" disabled={pending}>
            {pending ? (
              <LoaderCircle className="w-5 h-5 animate-spin" />
            ) : (
              "Submit"
            )}
          </Button>
        </form>

        {/* prescription area */}
        {patientPrescription ? (
          <div dangerouslySetInnerHTML={{ __html: patientPrescription }} />
        ) : (
          <p className="text-sm text-gray-400 text-center">
            No prescription available.
          </p>
        )}
      </div>

      <LoaderDialog loading={loading} />
    </div>
  );
};

export default CreateTransaction;
