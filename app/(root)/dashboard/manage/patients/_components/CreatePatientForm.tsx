/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Input } from "@/components/ui/input";
import React, { useActionState, useEffect, useState } from "react";
import UploadPatientImage from "./UploadPatientImage";
import { toast } from "sonner";
import { getPatientLayout } from "@/lib/actions/patient";

const CreatePatientForm = ({ patientId }: { patientId: string }) => {
  const [patientLayout, setPatientLayout] = useState<any>();

  const getPatient = async () => {
    try {
      const result = await getPatientLayout(patientId);
      if (result?.data !== null) {
        setPatientLayout(result?.data);
      }
    } catch {
      toast(
        <p className="font-bold text-sm text-red-500">
          Internal error occured while fetching the patient
        </p>
      );
    }
  };

  useEffect(() => {
    getPatient();
  }, [patientId]);

  const handleSubmit = async (prevState: unknown, formData: FormData) => {};

  const [state, formAction, loading] = useActionState(handleSubmit, undefined);

  return (
    <form
      action={formAction}
      className="bg-dark-100 border border-t-primary rounded-lg flex flex-col gap-4 p-3 py-5"
    >
      {/* imageUrl- firstname - lastname */}
      <div className="flex flex-col gap-2">
        <h1 className="text-center text-2xl font-bold">Personal Information</h1>
        <div className="flex flex-col gap-2 mt-3">
          <div className="flex flex-col gap-1">
            <UploadPatientImage patient={patientLayout} />
            <p className="text-xs text-gray-400 -mt-6">
              Click the image to update patient profile image
            </p>
          </div>
          <div className="flex items-center justify-center gap-3 w-full mt-5">
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="firstname" className="text-xs text-gray-400">
                First Name
              </label>
              <Input
                type="text"
                id="firstname"
                name="firstname"
                defaultValue={patientLayout?.firstname}
                placeholder="Enter first name"
              />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="firstname" className="text-xs text-gray-400">
                Last Name
              </label>
              <Input
                type="text"
                id="lastname"
                name="lastname"
                defaultValue={patientLayout?.lastname}
                placeholder="Enter last name"
              />
            </div>
          </div>
          {/* todo: add other fields to fill up */}
        </div>
      </div>
    </form>
  );
};

export default CreatePatientForm;
