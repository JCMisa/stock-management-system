import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import AddUserToDb from "@/components/custom/AddUserToDb";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RHU",
  description: "Hospital Stock Management System for Santa Maria Laguna",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/logo.svg" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClerkProvider
          appearance={{
            baseTheme: dark,
            layout: {
              logoImageUrl: "/logo.svg",
              socialButtonsVariant: "iconButton",
            },
            variables: {
              colorText: "#E8E9E9",
              colorPrimary: "#24AE7C",
              colorBackground: "#131619",
              colorInputBackground: "#0D0F10",
              colorInputText: "#E8E9E9",
            },
          }}
        >
          <AddUserToDb />
          {children}
          <Toaster />
        </ClerkProvider>
      </body>
    </html>
  );
}
