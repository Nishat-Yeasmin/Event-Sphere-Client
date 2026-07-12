"use client";

import { ReactNode } from "react";
import DashboardTopbar from "./DashboardTopbar";
import DashboardSidebar from "./DashboardSidebar";


export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100">

      <DashboardTopbar/>

      <div className="mx-auto flex max-w-7xl">

        <DashboardSidebar />

        <main className="flex-1 p-8">
          {children}
        </main>

      </div>

    </div>
  );
}