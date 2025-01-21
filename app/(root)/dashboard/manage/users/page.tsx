import { DataTable } from "@/components/dataTable/users/user-data-table";
import { columns } from "@/components/dataTable/users/user-columns";
import { getAllUser, getCurrentUser } from "@/lib/actions/user";
import { redirect } from "next/navigation";
import React from "react";

const ManageUsersPage = async () => {
  try {
    const [user, userList] = await Promise.all([
      getCurrentUser(),
      getAllUser(),
    ]);
    if (user?.data === null) redirect("/sign-in");

    return (
      <div>
        <DataTable
          columns={columns}
          data={userList?.data}
          query1="email"
          showCreate={user?.data?.role === "admin"}
        />
      </div>
    );
  } catch (error) {
    console.error("Failed to load users data:", error);
    return <div>Error loading data.</div>;
  }
};

export default ManageUsersPage;
