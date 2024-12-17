import { columns } from "@/components/dataTable/patient-columns";
import { DataTable } from "@/components/dataTable/patient-data-table";
import { getAllPatients } from "@/lib/actions/patient";
import { getCurrentUser } from "@/lib/actions/user";
import { redirect } from "next/navigation";
import React from "react";

const ManagePatientsPage = async () => {
  const user = await getCurrentUser();
  if (user?.data === null) redirect("/sign-in");

  const patientList = await getAllPatients();

  return (
    <div>
      <DataTable
        columns={columns}
        data={patientList?.data}
        query1="fullname"
        showCreate={
          user?.data?.role === "admin" || user?.data?.role === "receptionist"
        }
      />
    </div>
  );
};

export default ManagePatientsPage;
