import React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils"; // adjust import path based on your project setup

type StatusPillProps = {
  variant: "blue" | "yellow" | "green" | "red";
  children: React.ReactNode;
};

const statusVariants = cva(
  "flex justify-center items-center rounded-sm border-2 px-4 py-1 text-sm font-medium text-center transition-colors",
  {
    variants: {
      variant: {
        blue: "bg-[#EEF6FF] border-[#AAD2FE] text-[#1C4ED8]",
        yellow: "bg-[#FEFCE8] border-[#EBE49C] text-[#CA8A03]",
        green: "bg-[#EFFDF4] border-[#84F4AC] text-[#16803C]",
        red: "bg-[#FEF1F2] border-[#F5B1B6] text-[#B91C1B]",
      },
    },
    defaultVariants: {
      variant: "blue",
    },
  },
);

function StatusPill({ variant, children }: StatusPillProps) {
  return (
    <div
      className={cn(
        statusVariants({ variant }),
        "w-24 sm:w-28 md:w-32 lg:w-36",
      )}
    >
      {children}
    </div>
  );
}

export default StatusPill;
