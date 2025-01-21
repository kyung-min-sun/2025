import { ArrowLeft, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Tooltip, TooltipTrigger } from "~/components/ui/tooltip";
import { TooltipContent, TooltipProvider } from "~/components/ui/tooltip";

import { Button } from "~/components/ui/button";
import Link from "next/link";

export default function CalendarPage() {
  const days = new Array(365)
    .fill(0)
    .map(
      (_, i) =>
        new Date(new Date(60 * 60 * 24 * 1000 * (i + 1)).setFullYear(2025)),
    );

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <Card className="max-w-[800px]">
        <CardHeader>
          <CardTitle>Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-row flex-wrap gap-[2px]">
            {days.map((day) => (
              <TooltipProvider
                key={day.toLocaleDateString()}
                delayDuration={10}
              >
                <Tooltip>
                  <TooltipTrigger>
                    <div className="bg-muted h-6 w-6 rounded-lg p-[2px]"></div>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p>{day.toLocaleDateString()}</p>
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
