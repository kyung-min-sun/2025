"use client";

import { Button } from "~/components/ui/button";
import { Calendar } from "lucide-react";
import Link from "next/link";
import { ResolutionCard } from "./resolution-card";
import { api } from "~/trpc/react";

export default function Home() {
  const { data: resolutions } = api.resolution.getResolutions.useQuery();

  const todayResolutions = resolutions?.filter((resolution) => {
    return resolution.createdAt.toDateString() === new Date().toDateString();
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      {todayResolutions && (
        <ResolutionCard todaysResolutions={todayResolutions} />
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
