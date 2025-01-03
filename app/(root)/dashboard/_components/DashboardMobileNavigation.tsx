/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import {
  ChartBarIncreasing,
  CoinsIcon,
  Cross,
  FileHeart,
  LayoutGrid,
  Newspaper,
  Pill,
  User,
  UserCircle,
} from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { getUserByEmail } from "@/lib/actions/user";
import { toast } from "sonner";
import { Menu } from "lucide-react";

const DashboardMobileNavigation = () => {
  const { user } = useUser();
  const path = usePathname();

  const [open, setOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<UserType>();

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
        {
          icon: FileHeart,
          label: "Appointments",
          href: "/dashboard/manage/appointments",
          visible: ["admin", "doctor"],
        },
      ],
    },
    {
      title: "INVENTORY",
      items: [
        {
          icon: ChartBarIncreasing,
          label: "Status",
          href: "/dashboard/inventory/status",
          visible: ["admin", "doctor", "receptionist", "pharmacist"],
        },
        {
          icon: CoinsIcon,
          label: "Transactions",
          href: "/dashboard/inventory/transactions",
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
    <header className="flex items-center h-[60px] justify-between px-5 md:hidden">
      <Image
        src={"/logo.svg"}
        alt="logo"
        width={1000}
        height={1000}
        className="w-10 h-10"
      />
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger>
          <Menu className="w-10 h-10 cursor-pointer" />
        </SheetTrigger>
        <SheetContent className="shad-sheet h-screen px-3">
          <SheetTitle>
            <div className="flex items-center gap-1">
              {user ? (
                <Image
                  src={user?.imageUrl}
                  alt="avatar"
                  width={44}
                  height={44}
                  className="rounded-full"
                />
              ) : (
                <Image
                  src={"/empty-img.png"}
                  alt="avatar"
                  width={44}
                  height={44}
                  className="rounded-full"
                />
              )}
              <div className="hidden overflow-hidden sm:flex flex-col">
                <p className="text-md">{user?.fullName}</p>
                <p className="text-sm text-gray-400">
                  {user?.primaryEmailAddress?.emailAddress}
                </p>
              </div>
            </div>
            <Separator className="my-4 bg-primary" />
          </SheetTitle>
          <nav className="p-4">
            <ul className="flex flex-col gap-1">
              {menuItems.map((item, index) => (
                <div key={item.title || index} className="flex flex-col gap-2">
                  {item.items.map(
                    (item, index) =>
                      item.visible.includes(loggedInUser?.role as string) && (
                        <Link
                          href={item.href}
                          key={index}
                          className={`flex items-center mt-4 lg:mt-0 justify-center lg:justify-start gap-4 text-gray-400 py-2 border border-dark-100  hover:text-light transition-all ease-in-out md:px-2 ${
                            path == item.href &&
                            "text-light border border-l-primary bg-dark-200"
                          }`}
                        >
                          <span>{<item.icon />}</span>
                          <span className="">{item.label}</span>
                        </Link>
                      )
                  )}
                </div>
              ))}
            </ul>
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default DashboardMobileNavigation;
