import { Calendar, Check } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

import { Button } from "~/components/ui/button";
import Link from "next/link";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Daily Resolutions</CardTitle>
          <CardDescription>Mark your resolutions as completed.</CardDescription>
        </CardHeader>
        <CardContent className="w-[800px] text-sm">
          <div className="flex flex-col gap-2">
            <div className="bg-muted flex flex-row items-center justify-between rounded-md p-4">
              <p>Cold Shower</p>
              <Button size="icon">
                <Check />
              </Button>
            </div>
            <div className="bg-muted flex flex-row items-center justify-between rounded-md p-4">
              <p>Quiet Time</p>
              <Button size="icon">
                <Check />
              </Button>
            </div>
            <div className="bg-muted flex flex-row items-center justify-between rounded-md p-4">
              <p>Code</p>
              <Button size="icon">
                <Check />
              </Button>
            </div>
            <div className="bg-muted flex flex-row items-center justify-between rounded-md p-4">
              <p>Cold Outreach</p>
              <Button size="icon">
                <Check />
              </Button>
            </div>
            <div className="bg-muted flex flex-row items-center justify-between rounded-md p-4">
              <p>Compound Lift</p>
              <Button size="icon">
                <Check />
              </Button>
            </div>
          </div>
          <div className="flex flex-row gap-2 pt-8">
            <Calendar className="size-4" />
            <div className="text-muted-foreground text-xs">
              {new Date().toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </div>
          </div>
        </CardContent>
      </Card>
      <Button asChild variant="outline">
        <Link href="/calendar">
          <Calendar className="size-4" />
          Progress
        </Link>
      </Button>
    </main>
  );
}
