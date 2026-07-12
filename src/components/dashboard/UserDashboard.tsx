"use client";

import DashboardStatCard from "./DashboardStatCard";

import {

Ticket,

CalendarDays,

Clock3,

CircleCheck,

} from "lucide-react";

export default function UserDashboard() {

return (

<div>

<h1 className="mb-10 text-4xl font-bold">

Welcome User 👋

</h1>

<div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

<DashboardStatCard
title="My Bookings"
value={0}
icon={Ticket}
/>

<DashboardStatCard
title="Upcoming Events"
value={0}
icon={CalendarDays}
/>

<DashboardStatCard
title="Pending"
value={0}
icon={Clock3}
/>

<DashboardStatCard
title="Completed"
value={0}
icon={CircleCheck}
/>

</div>

</div>

);

}