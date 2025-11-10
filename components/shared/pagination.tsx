import React, { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
type PaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
};
export default function Pagination({
  page,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) {
  const pageButtons = useMemo(() => {
    const pages: React.ReactNode[] = [];
    for (let i = 1; i <= totalPages; i++) {
      const isActive = i === page;
      pages.push(
        <Button
          key={i}
          size="sm"
          variant="outline"
          className={cn(
            isActive
              ? "bg-gold !text-white border-gold hover:bg-gold hover:text-white"
              : "",
            "text-muted-foreground",
          )}
          onClick={() => onPageChange(i)}
        >
          {i}
        </Button>,
      );
    }
    return pages;
  }, [page, totalPages, onPageChange]);
  return (
    <div className={cn("flex justify-center items-center gap-2", className)}>
      <Button
        size="sm"
        variant="outline"
        onClick={() => onPageChange(Math.max(page - 1, 1))}
        disabled={page === 1}
        className="text-muted-foreground"
      >
        &lt;
      </Button>
      {/*Render buttons*/}
      {pageButtons}
      <Button
        size="sm"
        variant="outline"
        onClick={() => onPageChange(Math.min(page + 1, totalPages))}
        disabled={page === totalPages}
        className="text-muted-foreground"
      >
        &gt;
      </Button>
    </div>
  );
}
