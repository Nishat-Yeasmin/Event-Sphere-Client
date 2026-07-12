"use client";

import DashboardStatCard from "./DashboardStatCard";

import {

CalendarPlus,

CalendarDays,

Users,

BarChart3,

} from "lucide-react";

import Link from "next/link";

export default function OrganizerDashboard() {

return (

<div>

<div className="mb-10 flex items-center justify-between">

<h1 className="text-4xl font-bold">

Organizer Dashboard

</h1>

<Link
href="/dashboard/add-event"
className="rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-700"
>

Add Event

</Link>

</div>

<div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

<DashboardStatCard
title="My Events"
value={0}
icon={CalendarDays}
/>

<DashboardStatCard
title="Participants"
value={0}
icon={Users}
/>

<DashboardStatCard
title="Published"
value={0}
icon={CalendarPlus}
/>

<DashboardStatCard
title="Analytics"
value={0}
icon={BarChart3}
/>

</div>

</div>

);

}