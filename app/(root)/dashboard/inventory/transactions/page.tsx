import { columns } from "@/components/dataTable/transactions/transaction-columns";
import { DataTable } from "@/components/dataTable/transactions/transaction-data-table";
import { getAllTransactions } from "@/lib/actions/transaction";
import { getCurrentUser } from "@/lib/actions/user";
import { redirect } from "next/navigation";
import React from "react";

const TransactionsPage = async () => {
  const user = await getCurrentUser();
  if (user?.data === null) redirect("/sign-in");

  const transactionsList = await getAllTransactions();
  return (
    <div>
      <DataTable
        columns={columns}
        data={transactionsList?.data}
        query1="patientName"
        showCreate={
          user?.data?.role === "admin" || user?.data?.role === "pharmacist"
        }
      />
    </div>
  );
};

export default TransactionsPage;
