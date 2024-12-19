import { columns } from "@/components/dataTable/appointments/appointment-columns";
import { DataTable } from "@/components/dataTable/appointments/appointment-data-table";
import {
  getAllAppointments,
  getDoctorAppointments,
} from "@/lib/actions/appointment";
import { getCurrentUser } from "@/lib/actions/user";
import { redirect } from "next/navigation";
import React from "react";

const AppointmentsPage = async () => {
  const user = await getCurrentUser();
  if (user?.data === null) redirect("/sign-in");

  const allAppointmentsList = await getAllAppointments();
  const doctorAppointmentsList = await getDoctorAppointments(
    user?.data?.userId
  );
  return (
    <div>
      <DataTable
        columns={columns}
        data={
          user?.data?.role === "admin"
            ? allAppointmentsList?.data
            : doctorAppointmentsList?.data
        }
        query1="patientName"
        showCreate={
          user?.data?.role === "admin" || user?.data?.role === "doctor"
        }
      />
    </div>
  );
};

export default AppointmentsPage;
