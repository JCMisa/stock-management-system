import React, { useActionState, useEffect, useState } from "react";
import { LoaderCircle, PlusCircle } from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { getCurrentUser } from "@/lib/actions/user";
import { createPatientLayout } from "@/lib/actions/patient";
import { useRouter } from "next/navigation";
import LoaderDialog from "@/components/custom/LoaderDialog";

const AddPatientLayout = () => {
  const router = useRouter();

  const [currentUser, setCurrentUser] = useState<UserType>();
  const [gender, setGender] = useState<string>("male");

  const getUser = async () => {
    const result = await getCurrentUser();
    if (result?.data !== null) {
      setCurrentUser(result?.data);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleSubmit = async (prevState: unknown, formData: FormData) => {
    try {
      const patientId = uuidv4();

      const formField = {
        firstname: formData.get("firstname") as string,
        lastname: formData.get("lastname") as string,
        email: formData.get("email") as string,
        conditionName: formData.get("conditionName") as string,
        age: formData.get("age") as string,
        gender,
      };

      const result = await createPatientLayout(
        prevState,
        patientId,
        currentUser?.email as string,
        formField
      );
      if (result?.data !== null) {
        toast(
          <p className="font-bold text-sm text-green-500">
            Proceed to complete the patient information
          </p>
        );

        router.push(`/dashboard/manage/patients/create/${patientId}`);
      }
    } catch (error) {
      toast(
        <p className="font-bold text-sm text-red-500">
          Failed to create the patient
        </p>
      );
      console.log("Add patient info error: ", error);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state, formAction, uploading] = useActionState(
    handleSubmit,
    undefined
  );

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button>
            <PlusCircle className="h-4 w-4 mr-2" /> Add Patient
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="h-[80%] overflow-auto card-scroll">
          <AlertDialogHeader>
            <AlertDialogTitle>Create New Patient</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-500 dark:text-gray-400">
              Add patient initial information and complete them in the next
              step.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div>
            <Separator />
            <form action={formAction} className="flex flex-col gap-5">
              {/* personal info */}
              <div className="pt-8">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-dark dark:text-white">
                    Personal Information
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Use a permanent address where you can receive mail.
                  </p>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-center gap-4 w-full mt-6">
                    <div className="w-full">
                      <div className="sm:col-span-3">
                        <label
                          htmlFor="first-name"
                          className="block text-sm font-medium text-gray-500 dark:text-gray-400"
                        >
                          First name
                        </label>
                        <div className="mt-1">
                          <Input
                            type="text"
                            name="firstname"
                            id="firstname"
                            placeholder="Enter your first name"
                            className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="w-full">
                      <label
                        htmlFor="last-name"
                        className="block text-sm font-medium text-gray-500 dark:text-gray-400"
                      >
                        Last name
                      </label>
                      <div className="mt-1">
                        <Input
                          type="text"
                          name="lastname"
                          id="lastname"
                          placeholder="Enter your last name"
                          className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-4 w-full mt-6">
                    <div className="w-full">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-500 dark:text-gray-400"
                      >
                        Email address
                      </label>
                      <div className="mt-1">
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Enter your email address"
                          className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="w-full">
                      <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                        Condition
                      </label>
                      <Input
                        type="text"
                        id="conditionName"
                        name="conditionName"
                        placeholder="e.g. Stomach pain"
                        className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-4 w-full mt-6">
                    <div className="w-full">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-500 dark:text-gray-400"
                      >
                        Age
                      </label>
                      <div className="mt-1">
                        <Input
                          id="age"
                          name="age"
                          type="number"
                          placeholder="Enter age here"
                          className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="w-full">
                      <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                        Gender
                      </label>
                      <Select
                        onValueChange={(value) =>
                          setGender(value ? value : "male")
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={"male"}>Male</SelectItem>
                          <SelectItem value={"female"}>Female</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <AlertDialogFooter className="mt-5">
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <Button type="submit">
                  {uploading ? (
                    <LoaderCircle className="w-5 h-5 animate-spin" />
                  ) : (
                    "Continue"
                  )}
                </Button>
              </AlertDialogFooter>
            </form>
          </div>
        </AlertDialogContent>
      </AlertDialog>
      <LoaderDialog loading={uploading} />
    </>
  );
};

export default AddPatientLayout;
