import React from "react";
import DashboardSidebar from "./_components/DashboardSidebar";
import DashboardMobileNavigation from "./_components/DashboardMobileNavigation";
import DashboardHeader from "./_components/DashboardHeader";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/actions/user";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getCurrentUser();
  if (user?.data === null) redirect("/sign-in");

  return (
    <main className="flex h-screen">
      <DashboardSidebar />
      <section className="flex h-full flex-1 flex-col overflow-auto card-scroll">
        <DashboardMobileNavigation />
        <DashboardHeader user={user?.data} />
        <div className="p-5 md:ml-32 lg:ml-64">{children}</div>
      </section>
    </main>
  );
};

export default DashboardLayout;
