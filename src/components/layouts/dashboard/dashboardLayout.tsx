"use client";
import Sidebar from "./itemSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col p-6 ">
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden mb-4"
        >
          ☰ Open Menu
        </label>
        {children} {/* This shows the page content */}
      </div>

      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          className="drawer-overlay"
          aria-label="close sidebar"
        />
        <Sidebar />
      </div>
    </div>
  );
}
