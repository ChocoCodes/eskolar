import React from "react";
import { cva } from "class-variance-authority";

type MetricCardProps = {
  title: string;
  icon: React.ElementType;
  value: number;
  variant?: "blue" | "yellow" | "green" | "red";
};

const cardVariants = cva(
  "flex justify-between items-center p-6 rounded-2xl border border-2 transition-colors",
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

const iconBgVariants = cva("rounded-full p-5", {
  variants: {
    variant: {
      blue: "bg-[#DBE9FE]",
      yellow: "bg-[#FEF9C3]",
      green: "bg-[#DCFCE6]",
      red: "bg-[#FDE2E1]",
    },
  },
  defaultVariants: {
    variant: "blue",
  },
});

function MetricCard({ title, icon: Icon, value, variant }: MetricCardProps) {
  return (
    <div className={cardVariants({ variant })}>
      <div>
        <h2 className="text-xl font-medium">{title}</h2>
        <p className="text-6xl font-bold mt-2">{value}</p>
      </div>
      <div className={iconBgVariants({ variant })}>
        <Icon className="w-10 h-10" />
      </div>
    </div>
  );
}

export default MetricCard;
