import { columns } from "@/components/dataTable/roleChange/roleChange-columns";
import { DataTable } from "@/components/dataTable/roleChange/roleChange-data-table";
import { getAllRequests } from "@/lib/actions/roleChangeRequest";
import { getCurrentUser } from "@/lib/actions/user";
import { redirect } from "next/navigation";
import React from "react";

const RoleChangePage = async () => {
  try {
    const [user, requestsList] = await Promise.all([
      getCurrentUser(),
      getAllRequests(),
    ]);
    if (user?.data === null) redirect("/sign-in");

    return (
      <div>
        <DataTable
          columns={columns}
          data={requestsList?.data?.length > 0 ? requestsList?.data : []}
          query1="requestOwner"
          showCreate={user?.data?.role === "admin"}
        />
      </div>
    );
  } catch (error) {
    console.error("Failed to load roleChange data:", error);
    return <div>Error loading data.</div>;
  }
};

export default RoleChangePage;
