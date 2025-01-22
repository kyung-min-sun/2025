"use client";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Tooltip, TooltipTrigger } from "~/components/ui/tooltip";
import { TooltipContent, TooltipProvider } from "~/components/ui/tooltip";

import { Button } from "~/components/ui/button";
import { Check } from "lucide-react";
import Link from "next/link";
import { api } from "~/trpc/react";
import { cn } from "~/lib/utils";
import { myResolutions } from "../my-resolutions";

export default function CalendarPage() {
  const { data: resolutions } = api.resolution.getResolutions.useQuery({});

  const days = new Array(365)
    .fill(0)
    .map(
      (_, i) =>
        new Date(new Date(60 * 60 * 24 * 1000 * (i + 1)).setFullYear(2025)),
    );

  const completed = (day: Date) => {
    const todayResolutions = resolutions?.filter((resolution) => {
      return resolution.createdAt.toDateString() === day.toDateString();
    });

    return myResolutions.filter((resolution) => {
      return todayResolutions?.some((r) => r.name === resolution.name);
    }).length;
  };

  const percents = days.map((day) => ({
    day,
    completed: completed(day),
    percent: completed(day) / myResolutions.length,
  }));

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <Card className="max-w-[800px]">
        <CardHeader>
          <CardTitle>Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-row flex-wrap gap-[3px]">
            {percents.map(({ day, percent }) => (
              <TooltipProvider
                key={day.toLocaleDateString()}
                delayDuration={10}
              >
                <Tooltip>
                  <TooltipTrigger>
                    <div
                      className={cn(
                        "h-6 w-6 overflow-hidden rounded-md bg-muted",
                      )}
                    >
                      <div
                        className="h-full w-full bg-primary"
                        style={{ opacity: percent }}
                      ></div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p>
                      {percent * 100}% completed on{" "}
                      {day.toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                      })}
                      .
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </CardContent>
      </Card>
      <Button asChild variant="outline">
        <Link href="/">
          <Check className="size-4" />
          Resolution
        </Link>
      </Button>
    </main>
  );
}
