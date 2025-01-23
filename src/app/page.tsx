"use client";

import { Button } from "~/components/ui/button";
import { Calendar } from "lucide-react";
import { DatePicker } from "./date-picker";
import Link from "next/link";
import { ResolutionCard } from "./resolution-card";
import { api } from "~/trpc/react";
import { useState } from "react";

export default function Home() {
  const [date, setDate] = useState(new Date());

  const { data: resolutions } = api.resolution.getResolutions.useQuery({
    date,
  });

  const todayResolutions = resolutions?.filter((resolution) => {
    return resolution.createdAt.toDateString() === new Date().toDateString();
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      {/* TODO: changing date & filling out resolutions does not work */}
      {todayResolutions && (
        <ResolutionCard
          todaysResolutions={todayResolutions}
          picker={<DatePicker value={date} onChange={setDate} />}
        />
      )}
      <Button asChild variant="outline">
        <Link href="/calendar">
          <Calendar className="size-4" />
          Progress
        </Link>
      </Button>
    </main>
  );
}
