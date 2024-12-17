import { DataTable } from "@/components/dataTable/data-table";
import { columns } from "@/components/dataTable/user-columns";
import { getAllUser, getCurrentUser } from "@/lib/actions/user";
import { redirect } from "next/navigation";
import React from "react";

const ManageUsersPage = async () => {
  const user = await getCurrentUser();
  if (user?.data === null) redirect("/sign-in");

  const userList = await getAllUser();

  return (
    <div>
      <DataTable
        columns={columns}
        data={userList?.data}
        query1="userId"
        query2="email"
        showCreate={user?.data?.role === "admin"}
      />
    </div>
  );
};

export default ManageUsersPage;
