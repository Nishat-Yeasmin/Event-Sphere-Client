"use client";

import DashboardStatCard from "./DashboardStatCard";

import {

Users,

Shield,

CalendarDays,

Ticket,

} from "lucide-react";

export default function AdminDashboard() {

return (

<div>

<h1 className="mb-10 text-4xl font-bold">

Admin Dashboard

</h1>

<div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

<DashboardStatCard
title="Users"
value={0}
icon={Users}
/>

<DashboardStatCard
title="Organizers"
value={0}
icon={Shield}
/>

<DashboardStatCard
title="Events"
value={0}
icon={CalendarDays}
/>

<DashboardStatCard
title="Bookings"
value={0}
icon={Ticket}
/>

</div>

</div>

);

}