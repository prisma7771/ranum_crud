import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import DashboardShell from "@/components/layouts/dashboard/dashboardLayout";
import { PaketsProvider } from "@/context/paketsContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard",
  description: "CRUD dashboard for pakets and gallery",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PaketsProvider>
          <DashboardShell>{children}</DashboardShell>
        </PaketsProvider>
      </body>
    </html>
  );
}
