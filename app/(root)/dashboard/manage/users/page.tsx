import { getUser } from "@/app/(auth)/GetUser";
import { DataTable } from "@/components/dataTable/data-table";
import { columns } from "@/components/dataTable/user-columns";
import { getAllUser, getUserByEmail } from "@/lib/actions/user";
import { redirect } from "next/navigation";
import React from "react";

const ManageUsersPage = async () => {
  const user = await getUser();
  if (user === null) return redirect("/");
  const userFromDb = await getUserByEmail(
    user?.primaryEmailAddress?.emailAddress as string
  );

  const userList = await getAllUser();

  return (
    <div className="p-6">
      <DataTable
        columns={columns}
        data={userList?.data}
        query1="userId"
        query2="email"
        showCreate={userFromDb?.data?.role === "admin"}
      />
    </div>
  );
};

export default ManageUsersPage;
