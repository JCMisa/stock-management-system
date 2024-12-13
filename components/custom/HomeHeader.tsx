/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { Menu } from "lucide-react";

const HomeHeader = ({ user }: { user: any }) => {
  return (
    <header className="bg-dark body-font shadow-xl">
      <div className="container mx-auto md:flex flex-wrap p-5 flex-col md:flex-row items-center hidden">
        <a className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
          <Image
            src={"/logo.svg"}
            alt="logo"
            width={1000}
            height={1000}
            className="w-10 h-10"
          />
          <span className="ml-3 text-xl font-bold">RHU</span>
        </a>
        <nav className="md:ml-auto md:mr-auto sm:flex flex-wrap items-center text-base justify-center hidden">
          <a className="mr-5 hover:text-white cursor-pointer">Home</a>
          <a className="mr-5 hover:text-white cursor-pointer">Guide</a>
          <a className="mr-5 hover:text-white cursor-pointer">About</a>
          <a className="mr-5 hover:text-white cursor-pointer">Contact</a>
        </nav>
        {user ? (
          <div className="sm:flex gap-1 hidden">
            <UserButton />
            <div className="lg:flex flex-col items-start hidden">
              <p className="tesm-sm">{user?.fullName}</p>
              <span className="text-xs text-gray-400">
                {user?.primaryEmailAddress?.emailAddress}
              </span>
            </div>
          </div>
        ) : (
          <Link href={"/sign-in"}>
            <Button className="min-w-32 max-w-32">Sign in</Button>
          </Link>
        )}
      </div>
      <div className="md:hidden flex items-center justify-between p-5">
        <a className="flex items-center">
          <Image
            src={"/logo.svg"}
            alt="logo"
            width={1000}
            height={1000}
            className="w-10 h-10"
          />
          <span className="ml-3 text-xl font-bold">RHU</span>
        </a>
        <Menu className="w-8 h-8 cursor-pointer" />
      </div>
    </header>
  );
};

export default HomeHeader;