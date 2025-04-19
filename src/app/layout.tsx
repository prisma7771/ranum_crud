import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import DashboardShell from "@/components/layouts/dashboard/dashboardLayout";
import { AppDataProvider } from "@/context/AppContext";

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
        <AppDataProvider>
          <DashboardShell>{children}</DashboardShell>
        </AppDataProvider>
      </body>
    </html>
  );
}
