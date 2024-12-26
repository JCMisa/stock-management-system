import React, { useActionState, useEffect, useState } from "react";
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
import { LoaderCircle, Pencil } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  getAppointmentByAppointmentId,
  updateAppointment,
} from "@/lib/actions/appointment";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { getPatientLayout } from "@/lib/actions/patient";
import LoaderDialog from "@/components/custom/LoaderDialog";

const EditAppointment = ({ appointmentId }: { appointmentId: string }) => {
  const [appointment, setAppointment] = useState<AppointmentType>();
  const [patient, setPatient] = useState<PatientType>();
  const [status, setStatus] = useState<string>(appointment?.status as string);
  const [prescription, setPrescription] = useState<string>(
    patient?.prescription as string
  );
  const [loading, setLoading] = useState(false);

  const handleQuillChange = (value: string) => {
    setPrescription(value);
  };

  const getAppointment = async () => {
    try {
      setLoading(true);

      const result = await getAppointmentByAppointmentId(appointmentId);

      if (result?.data !== null) {
        setAppointment(result?.data);
      }
    } catch {
      toast(
        <p className="font-bold text-sm text-red-500">
          Internal error occured while fetching the appointment
        </p>
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAppointment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appointmentId]);

  const getPatientInfo = async () => {
    try {
      setLoading(true);

      const result = await getPatientLayout(appointment?.patientId as string);
      if (result?.data !== null) {
        setPatient(result.data);
      }
    } catch {
      toast(
        <p className="font-bold text-sm text-red-500">
          Internal error occured while fetching the patient
        </p>
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPatientInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appointmentId]);

  const handleSubmit = async (prevState: unknown, formData: FormData) => {
    try {
      const finalStatus = status || appointment?.status;
      const finalPrescription = prescription || patient?.prescription;

      const formField = {
        patientName: formData.get("patientName") as string,
        doctorName: formData.get("doctorName") as string,
        reason: formData.get("reason") as string,
        status: finalStatus as string,
        timeStart: formData.get("timeStart") as string,
        timeEnd: formData.get("timeEnd") as string,
        prescription: finalPrescription as string,
      };

      const result = await updateAppointment(
        appointmentId,
        patient?.patientId || (appointment?.patientId as string),
        formField
      );

      if (result?.data !== null) {
        toast(
          <p className="font-bold text-sm text-green-500">
            Patient updated successfully
          </p>
        );
      }
    } catch {
      toast(
        <p className="font-bold text-sm text-red-500">
          Internal error occured while updating appointment
        </p>
      );
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
        <AlertDialogTrigger className="w-full">
          <div className="flex items-center gap-2 p-2 hover:bg-light hover:text-dark transition-all w-full rounded-sm">
            <Pencil className="h-4 w-4 mr-2" />
            <p className="text-sm">Edit</p>
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Manage Appointment</AlertDialogTitle>
            <AlertDialogDescription>
              Edit necessary details for your patient and your patient&apos;s
              appointment
            </AlertDialogDescription>
          </AlertDialogHeader>
          <form
            action={formAction}
            className="min-h-[30rem] max-h-[30rem] overflow-auto card-scroll"
          >
            <div className="mt-5 flex flex-col gap-5">
              <div className="flex flex-row items-center justify-center gap-3 w-full">
                <div className="flex flex-col gap-1 w-full">
                  <label className="text-xs text-gray-400">Patient Name</label>
                  <Input
                    type="text"
                    id="patientName"
                    name="patientName"
                    defaultValue={appointment?.patientName}
                  />
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <label className="text-xs text-gray-400">Doctor Name</label>
                  <Input
                    type="text"
                    id="doctorName"
                    name="doctorName"
                    defaultValue={appointment?.doctorName}
                  />
                </div>
              </div>
              <div className="flex flex-row items-center justify-center gap-3 w-full">
                <div className="flex flex-col gap-1 w-full">
                  <label className="text-xs text-gray-400">
                    Appointment Reason
                  </label>
                  <Textarea
                    rows={5}
                    id="reason"
                    name="reason"
                    defaultValue={appointment?.reason}
                  />
                </div>
              </div>
              <div className="flex flex-row items-center justify-center gap-3 w-full">
                <div className="flex flex-col gap-1 w-full">
                  <label className="text-xs text-gray-400">
                    Appointment Status
                  </label>
                  <Select
                    onValueChange={(value) =>
                      setStatus(value ? value : "pending")
                    }
                    defaultValue={appointment?.status}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={"pending"}>Pending</SelectItem>
                      <SelectItem value={"completed"}>Completed</SelectItem>
                      <SelectItem value={"canceled"}>Canceled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex flex-row items-center justify-center gap-3 w-full">
                <div className="flex flex-col gap-1 w-full">
                  <label className="text-xs text-gray-400">Time Start</label>
                  <Input
                    type="time"
                    id="timeStart"
                    name="timeStart"
                    defaultValue={appointment?.timeStart}
                  />
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <label className="text-xs text-gray-400">Time End</label>
                  <Input
                    type="time"
                    id="timeEnd"
                    name="timeEnd"
                    defaultValue={appointment?.timeEnd}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-400">Prescription</label>
                <ReactQuill
                  theme="snow"
                  className="bg-dark"
                  defaultValue={patient?.prescription}
                  value={prescription}
                  onChange={handleQuillChange}
                />
              </div>
            </div>
            <AlertDialogFooter className="mt-5">
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Button type="submit" disabled={uploading}>
                {uploading ? (
                  <LoaderCircle className="h-5 w-5 animate-spin" />
                ) : (
                  "Save"
                )}
              </Button>
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialog>

      <LoaderDialog loading={loading || uploading} />
    </>
  );
};

export default EditAppointment;
