"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Check, X } from "lucide-react";

import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";
import { cn } from "~/lib/utils";
import { myResolutions } from "./my-resolutions";
import { useState } from "react";

export function ResolutionCard({
  todaysResolutions,
  picker,
}: {
  todaysResolutions: { name: string; id: number; createdAt: Date }[];
  picker: React.ReactNode;
}) {
  const [myResolutionsCompleted, setMyResolutionsCompleted] = useState(
    myResolutions.flatMap((resolution) => {
      const todayResolution = todaysResolutions.find(
        (r) => r.name === resolution.name,
      );
      if (!todayResolution) return { ...resolution, completed: false, id: -1 };
      return {
        ...resolution,
        completed: todayResolution,
        id: todayResolution.id,
      };
    }),
  );

  const { mutateAsync: createResolution } =
    api.resolution.createResolution.useMutation();
  const { mutateAsync: deleteResolution } =
    api.resolution.deleteResolution.useMutation();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Daily Resolutions</CardTitle>
        <CardDescription>Mark your resolutions as completed.</CardDescription>
      </CardHeader>
      <CardContent className="w-[800px] text-sm">
        <div className="flex flex-col gap-2">
          {myResolutionsCompleted?.map(({ name, completed, id }, i) => (
            <div
              key={name}
              className={cn(
                "flex flex-row items-center justify-between rounded-md p-4",
                completed ? "bg-muted opacity-40" : "bg-muted",
              )}
            >
              <p>{name}</p>
              <Button
                size="icon"
                onClick={async () => {
                  if (completed && id !== -1) {
                    await deleteResolution({ id });
                  } else {
                    await createResolution({ name });
                  }
                  setMyResolutionsCompleted((prev) => {
                    return prev.map((r) =>
                      r.name === name ? { ...r, completed: !completed } : r,
                    );
                  });
                }}
              >
                {!completed ? <Check /> : <X />}
              </Button>
            </div>
          ))}
        </div>
        <div className="pt-8">{picker}</div>
      </CardContent>
    </Card>
  );
}
