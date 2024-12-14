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

export const menuItems = [
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
        visible: ["admin", "doctor", "receptionist", "pharmacist", "guest"],
      },
      {
        icon: Cross,
        label: "Patients",
        href: "/dashboard/manage/patients",
        visible: ["admin", "doctor", "receptionist", "pharmacist", "guest"],
      },
      {
        icon: Pill,
        label: "Medicines",
        href: "/dashboard/manage/medicines",
        visible: ["admin", "doctor", "receptionist", "pharmacist", "guest"],
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
        visible: ["admin", "doctor", "receptionist", "pharmacist", "guest"],
      },
      {
        icon: SquareActivity,
        label: "Manage",
        href: "/inventory/manage",
        visible: ["admin", "pharmacist", "guest"],
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
        visible: ["admin", "doctor", "receptionist", "pharmacist", "guest"],
      },
    ],
  },
  {
    title: "PROFILE MANAGEMENT",
    items: [
      {
        icon: UserCircle,
        label: "Profile",
        href: "/dashboard/profile",
        visible: ["admin", "doctor", "receptionist", "pharmacist", "guest"],
      },
    ],
  },
];
