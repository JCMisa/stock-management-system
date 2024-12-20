import { columns } from "@/components/dataTable/medicines/medicine-columns";
import { DataTable } from "@/components/dataTable/medicines/medicine-data-table";
import { getAllMedicines } from "@/lib/actions/medicine";
import { getCurrentUser } from "@/lib/actions/user";
import { redirect } from "next/navigation";
import React from "react";

const MedicinesPage = async () => {
  const user = await getCurrentUser();
  if (user?.data === null) redirect("/sign-in");

  const medicinesList = await getAllMedicines();

  return (
    <div>
      <DataTable
        columns={columns}
        data={medicinesList?.data}
        query1="name"
        showCreate={
          user?.data?.role === "admin" || user?.data?.role === "pharmacist"
        }
      />
    </div>
  );
};

export default MedicinesPage;
