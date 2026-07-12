"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthProvider";

import {

LayoutDashboard,

CalendarPlus,

CalendarDays,

Ticket,

Users,

BarChart3,

} from "lucide-react";

export default function DashboardSidebar() {

const pathname = usePathname();

const { user } = useAuth();

const isActive = (path: string) => pathname === path;

return (

<aside className="min-h-screen w-72 border-r bg-white">

<div className="p-6">

<h3 className="text-xl font-bold">

Dashboard

</h3>

</div>

<nav className="space-y-2 px-4">

<Link
href="/dashboard"
className={`flex items-center gap-3 rounded-xl px-4 py-3 transition ${
isActive("/dashboard")
? "bg-violet-600 text-white"
: "hover:bg-violet-100"
}`}
>

<LayoutDashboard size={20} />

Overview

</Link>

{user?.role === "organizer" && (

<>

<Link
href="/dashboard/add-event"
className={`flex items-center gap-3 rounded-xl px-4 py-3 transition ${
isActive("/dashboard/add-event")
? "bg-violet-600 text-white"
: "hover:bg-violet-100"
}`}
>

<CalendarPlus size={20} />

Add Event

</Link>

<Link
href="/dashboard/my-events"
className={`flex items-center gap-3 rounded-xl px-4 py-3 transition ${
isActive("/dashboard/my-events")
? "bg-violet-600 text-white"
: "hover:bg-violet-100"
}`}
>

<CalendarDays size={20} />

My Events

</Link>

</>

)}

{user?.role === "user" && (

<Link
href="/dashboard/my-bookings"
className={`flex items-center gap-3 rounded-xl px-4 py-3 transition ${
isActive("/dashboard/my-bookings")
? "bg-violet-600 text-white"
: "hover:bg-violet-100"
}`}
>

<Ticket size={20} />

My Bookings

</Link>

)}

{user?.role === "admin" && (

<>

<Link
href="/dashboard/users"
className={`flex items-center gap-3 rounded-xl px-4 py-3 transition ${
isActive("/dashboard/users")
? "bg-violet-600 text-white"
: "hover:bg-violet-100"
}`}
>

<Users size={20} />

Users

</Link>

<Link
href="/dashboard/analytics"
className={`flex items-center gap-3 rounded-xl px-4 py-3 transition ${
isActive("/dashboard/analytics")
? "bg-violet-600 text-white"
: "hover:bg-violet-100"
}`}
>

<BarChart3 size={20} />

Analytics

</Link>

</>

)}

</nav>

</aside>

);

}