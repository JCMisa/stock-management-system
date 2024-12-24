import {
  getAllMedicines,
  getExpiredMedicinesCount,
  getTotalStocks,
} from "@/lib/actions/medicine";
import React from "react";
import { DataTable } from "../data-table-components/data-table";
import { columns } from "../data-table-components/columns";
import DataCard from "./_components/DataCard";
import { Activity, ChevronsDown, DollarSign } from "lucide-react";

const InventoryStatusPage = async () => {
  const medicinesList = await getAllMedicines();

  // const totalStocks = await getTotalStocks();
  // const expiredMedicinesCount = await getExpiredMedicinesCount();

  const [totalStocks, expiredMedicinesCount] = await Promise.all([
    getTotalStocks(),
    getExpiredMedicinesCount(),
  ]);

  return (
    <div className="h-full flex-1 flex-col space-y-2 p-8 md:flex">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        <DataCard
          label="Total Revenue"
          value="Php 45,231.89"
          icon={<DollarSign className="w-4 h-4 text-green-500" />}
        />
        <DataCard
          label="Total Stocks"
          value={totalStocks?.data ? totalStocks?.data : 0}
          icon={<Activity className="w-4 h-4 text-orange-500" />}
        />
        <DataCard
          label="Expired Medicines"
          value={expiredMedicinesCount?.data ? expiredMedicinesCount?.data : 0}
          icon={<ChevronsDown className="w-4 h-4 text-red-500" />}
        />
      </div>
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
