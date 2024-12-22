import { getAllMedicines } from "@/lib/actions/medicine";
import React from "react";
import { DataTable } from "../data-table-components/data-table";
import { columns } from "../data-table-components/columns";

const InventoryStatusPage = async () => {
  const medicinesList = await getAllMedicines();

  return (
    <div className="h-full flex-1 flex-col space-y-2 p-8 md:flex">
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">
          Here&apos;s a list of medicines and their respective stocks.
        </p>
      </div>
      <DataTable data={medicinesList?.data} columns={columns} />
    </div>
  );
};

export default InventoryStatusPage;
