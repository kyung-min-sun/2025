"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";

import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { cn } from "~/lib/utils";

export function DatePicker({
  value,
  onChange,
}: {
  value: Date;
  onChange: (date: Date) => void;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "text-left font-normal",
            !value && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="h-4 w-4 opacity-50" />
          {value.toLocaleDateString()}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={(date) => {
            if (date) {
              onChange(date);
            }
          }}
          disabled={(date) =>
            date > new Date() || date < new Date("2025-01-01")
          }
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
