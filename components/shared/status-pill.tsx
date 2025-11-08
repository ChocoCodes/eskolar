import React from "react";
import { cva } from "class-variance-authority";

type StatusPillProps = {
  variant: "blue" | "yellow" | "green" | "red";
  children: React.ReactNode;
};

function StatusPill({ variant, children }: StatusPillProps) {
  const statusVariants = cva(
    "flex justify-between items-center px-6 rounded-sm border border-2 transition-colors",
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
  return <div className={statusVariants({ variant })}>{children}</div>;
}

export default StatusPill;
