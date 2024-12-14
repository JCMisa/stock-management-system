import React from "react";
import DashboardSidebar from "./_components/DashboardSidebar";
import DashboardMobileNavigation from "./_components/DashboardMobileNavigation";
import DashboardHeader from "./_components/DashboardHeader";
import { getUser } from "@/app/(auth)/GetUser";
import { redirect } from "next/navigation";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const currentUser = await getUser();
  if (!currentUser) return redirect("/sign-in");

  return (
    <main className="flex h-screen">
      <DashboardSidebar />
      <section className="flex h-full flex-1 flex-col">
        <DashboardMobileNavigation />
        <DashboardHeader user={currentUser} />
        <div className="p-5 md:ml-32 lg:ml-64">{children}</div>
      </section>
    </main>
  );
};

export default DashboardLayout;
