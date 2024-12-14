/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserButton } from "@clerk/nextjs";
import { Search } from "lucide-react";
import React from "react";

const DashboardHeader = ({ user }: { user: any }) => {
  return (
    <header className="bg-dark hidden md:block shadow-xl">
      <div className="flex flex-row items-center justify-between p-3 px-5">
        <div className="relative">
          <input
            className="appearance-none border-2 pl-10 border-dark-100 hover:border-gray-400 transition-colors rounded-md w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-[#0D0F10] focus:border-[#0D0F10] focus:shadow-outline bg-dark-100"
            id="username"
            type="text"
            placeholder="Search..."
          />

          <div className="absolute left-0 inset-y-0 flex items-center">
            <Search className="w-5 h-5 ml-3" />
          </div>
        </div>

        <div className="relative flex flex-col">
          <div className="sm:flex gap-1 hidden">
            <UserButton />
            <div className="lg:flex flex-col items-start hidden">
              <p className="tesm-sm">{user?.fullName}</p>
              <span className="text-xs text-gray-400">
                {user?.primaryEmailAddress?.emailAddress}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
