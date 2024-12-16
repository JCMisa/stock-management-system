/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import {
  ChartBarIncreasing,
  Cross,
  LayoutGrid,
  Newspaper,
  Pill,
  SquareActivity,
  User,
  UserCircle,
} from "lucide-react";
import { getUserByEmail } from "@/lib/actions/user";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const DashboardSidebar = () => {
  const { user } = useUser();
  const path = usePathname();

  const [loggedInUser, setLoggedInUser] = useState<{
    id: number;
    userId: string;
    email: string;
    firstname: string;
    lastname: string;
    imageUrl: string;
    role: string;
    createdAt: string;
  }>();

  const getLoggedInUserByEmail = async () => {
    try {
      const result = await getUserByEmail(
        user?.primaryEmailAddress?.emailAddress as string
      );
      if (result?.data !== null) {
        setLoggedInUser(result?.data);
      }
    } catch {
      toast(
        <p className="font-bold text-sm text-red-500">
          Internal error occured while fetching the user
        </p>
      );
    }
  };

  useEffect(() => {
    user && getLoggedInUserByEmail();
  }, [user]);

  const menuItems = [
    {
      title: "MENU",
      items: [
        {
          icon: LayoutGrid,
          label: "Dashboard",
          href: `/dashboard`,
          visible: ["admin", "doctor", "receptionist", "pharmacist", "guest"],
        },
      ],
    },
    {
      title: "MANAGE",
      items: [
        {
          icon: User,
          label: "Users",
          href: `/dashboard/manage/users`,
          visible: ["admin", "doctor", "receptionist", "pharmacist"],
        },
        {
          icon: Cross,
          label: "Patients",
          href: "/dashboard/manage/patients",
          visible: ["admin", "doctor", "receptionist", "pharmacist"],
        },
        {
          icon: Pill,
          label: "Medicines",
          href: "/dashboard/manage/medicines",
          visible: ["admin", "doctor", "receptionist", "pharmacist"],
        },
      ],
    },
    {
      title: "INVENTORY",
      items: [
        {
          icon: ChartBarIncreasing,
          label: "Status",
          href: "/inventory/status",
          visible: ["admin", "doctor", "receptionist", "pharmacist"],
        },
        {
          icon: SquareActivity,
          label: "Manage",
          href: "/inventory/manage",
          visible: ["admin", "pharmacist"],
        },
      ],
    },
    {
      title: "INFORMATION MANAGEMENT",
      items: [
        {
          icon: Newspaper,
          label: "Reports",
          href: "/reports",
          visible: ["admin", "doctor", "receptionist", "pharmacist"],
        },
      ],
    },
    {
      title: "PROFILE MANAGEMENT",
      items: [
        {
          icon: UserCircle,
          label: "Profile",
          href: `/dashboard/profile/${loggedInUser?.userId}`,
          visible: ["admin", "doctor", "receptionist", "pharmacist", "guest"],
        },
      ],
    },
  ];

  return (
    <aside className="hidden fixed top-0 left-0 md:w-32 lg:w-64 bg-dark-100 md:block h-screen overflow-auto sidenav-scroll z-30">
      <div className="mt-3 text-2xl uppercase text-center tracking-widest">
        <Link href="/" className="text-white flex items-center px-3">
          <Image
            src={"/logo.svg"}
            alt="logo"
            width={1000}
            height={1000}
            className="w-8 h-8"
          />
          <span className="ml-3 text-xl font-bold">RHU</span>
        </Link>
      </div>
      <nav className="text-sm px-3">
        {menuItems.map((item, index) => (
          <div key={item.title || index} className="flex flex-col gap-2">
            <p className="hidden lg:block text-light-100 font-light my-4">
              {item.title}
            </p>
            {item.items.map(
              (item, index) =>
                item.visible.includes(loggedInUser?.role as string) && (
                  <Link
                    href={item.href}
                    key={index}
                    className={`flex items-center mt-4 lg:-mt-2 justify-center lg:justify-start gap-4 text-gray-400 py-2 border border-dark-100  hover:text-light transition-all ease-in-out md:px-2 ${
                      path == item.href &&
                      "text-light border border-l-primary bg-dark-200"
                    }`}
                  >
                    <span>{<item.icon />}</span>
                    <span className="hidden lg:block">{item.label}</span>
                  </Link>
                )
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default DashboardSidebar;