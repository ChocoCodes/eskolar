import React from "react";
import { cn } from "@/lib/utils";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

function Container({ children, className = "" }: ContainerProps) {
  return (
    <div
      className={cn(
        className,
        "border-2 border-gray-outline w-full rounded-xl p-6",
      )}
    >
      {children}
    </div>
  );
}

export default Container;
