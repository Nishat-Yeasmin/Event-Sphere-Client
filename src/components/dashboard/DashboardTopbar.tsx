"use client";

import { useAuth } from "@/context/AuthProvider";

export default function DashboardTopbar() {

  const { user } = useAuth();

  return (

    <header className="sticky top-0 z-40 border-b bg-white">

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        <h2 className="text-2xl font-bold text-violet-600">

          EventSphere Dashboard

        </h2>

        <div className="text-right">

          <p className="font-semibold">

            {user?.name}

          </p>

          <p className="text-sm text-gray-500 capitalize">

            {user?.role}

          </p>

        </div>

      </div>

    </header>

  );

}