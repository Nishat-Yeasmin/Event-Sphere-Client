"use client";

import AdminDashboard from "@/components/dashboard/AdminDashbaord";
import OrganizerDashboard from "@/components/dashboard/OrganizerDashboard";
import UserDashboard from "@/components/dashboard/UserDashboard";
import { useAuth } from "@/context/AuthProvider";

export default function DashboardPage() {

  const { user } = useAuth();

  if (!user) {

    return (
      <div className="py-20 text-center">
        Loading...
      </div>
    );

  }

  if (user.role === "admin") {

    return <AdminDashboard/>;

  }

  if (user.role === "organizer") {

    return <OrganizerDashboard/>;

  }

  return <UserDashboard />;

}