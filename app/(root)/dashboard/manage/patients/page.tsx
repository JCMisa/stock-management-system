import { columns } from "@/components/dataTable/patients/patient-columns";
import { DataTable } from "@/components/dataTable/patients/patient-data-table";
import { getAllPatients } from "@/lib/actions/patient";
import { getCurrentUser } from "@/lib/actions/user";
import { redirect } from "next/navigation";
import React from "react";

const ManagePatientsPage = async () => {
  try {
    const [user, patientList] = await Promise.all([
      getCurrentUser(),
      getAllPatients(),
    ]);
    if (user?.data === null) redirect("/sign-in");

    return (
      <div>
        <DataTable
          columns={columns}
          data={patientList?.data?.length > 0 ? patientList?.data : []}
          query1="fullname"
          showCreate={
            user?.data?.role === "admin" || user?.data?.role === "receptionist"
          }
        />
      </div>
    );
  } catch (error) {
    console.error("Failed to load patients data:", error);
    return <div>Error loading data.</div>;
  }
};

export default ManagePatientsPage;
