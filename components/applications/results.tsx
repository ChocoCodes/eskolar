import React from "react";
import Container from "@/components/ui/container";
import type { ScholarshipApplication } from "@/lib/dummy-data/applications";
import StatusPill from "@/components/shared/status-pill";
import Pagination from "@/components/shared/pagination";
type ResultsProps = {
  data: ScholarshipApplication[];
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  itemsPerPage: number;
};
function Results({
  data,
  page,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
}: ResultsProps) {
  const resultVariant = (result?: string) => {
    const r = result?.toLowerCase();
    return r === "accepted"
      ? "green"
      : r === "rejected"
        ? "red"
        : r === "pending"
          ? "yellow"
          : "blue";
  };
  const start = (page - 1) * itemsPerPage + 1;
  const end = Math.min(page * itemsPerPage, totalItems);
  return (
    <Container className="mt-8">
      {/* Header */}
      <div className="grid grid-cols-4 font-semibold text-gray-700 py-3 px-4">
        <div className="text-left">Name</div>
        <div className="text-center">Provider</div>
        <div className="text-center">Status</div>
        <div className="text-right">Result</div>
      </div>
      {/* Rows */}
      <div className="flex flex-col gap-3 mt-3">
        {data.map((app, index) => (
          <Container
            key={index}
            className="grid grid-cols-4 items-center py-4 px-4 border rounded-xl hover:bg-gray-50 transition"
          >
            <div className="font-bold">{app.name}</div>
            <div className="text-center">{app.provider}</div>
            <div className="text-center">{app.status}</div>
            <div className="flex flex-col justify-center items-end">
              <StatusPill variant={resultVariant(app.result)}>
                {app.result}
              </StatusPill>
              <button
                onClick={() => alert("View Details Coming Soon!")}
                className="text-xs text-gray-500 hover:underline mt-2"
              >
                View Details &gt;
              </button>
            </div>
          </Container>
        ))}
      </div>
      {/* Empty state */}
      {data.length === 0 && (
        <p className="text-gray-500 text-center mt-6">No results found.</p>
      )}
      {/* Pagination + Showing "out of" applications */}
      {totalPages > 1 && (
        <div className="relative mt-6 flex items-center">
          <div className="text-sm text-muted-foreground">
            Showing {start}-{end} of {totalItems} applications
          </div>
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={onPageChange}
            className="md:absolute md:left-1/2 md:transform md:-translate-x-1/2 md:w-auto w-full"
          />
        </div>
      )}
    </Container>
  );
}
export default Results;
