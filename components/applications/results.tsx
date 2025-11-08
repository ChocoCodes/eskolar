// `components/applications/results.tsx`
import React from "react";
import Container from "@/components/ui/container";
import type { ScholarshipApplication } from "@/lib/dummy-data/applications";
import StatusPill from "@/components/shared/status-pill";

type ResultsProps = {
  data: ScholarshipApplication[];
};

function Results({ data }: ResultsProps) {
  return (
    <Container className="mt-8">
      <table className="w-full">
        <thead>
          <tr className="grid grid-cols-4 font-semibold text-gray-700 py-3 px-10">
            <th className={"text-left"}>Name</th>
            <th>Provider</th>
            <th>Status</th>
            <th className={"text-right"}>Result</th>
          </tr>
        </thead>
        <tbody className="flex flex-col gap-3 mt-3">
          {data.map((app, index) => {
            const r = app.result?.toLowerCase();
            const resultVariant =
              r === "accepted"
                ? "green"
                : r === "rejected"
                  ? "red"
                  : r === "pending"
                    ? "yellow"
                    : "blue";
            return (
              <Container
                key={index}
                className="grid grid-cols-4 items-center py-4 px-4 border rounded-xl hover:bg-gray-50 transition"
              >
                <td className="font-bold ">{app.name}</td>
                <td className="text-center">{app.provider}</td>
                <td className="text-center">{app.status}</td>
                <td>
                  <div className="flex flex-col justify-center items-end">
                    <div className="flex flex-col items-center">
                      <StatusPill variant={resultVariant}>
                        {app.result}
                      </StatusPill>
                      <button
                        onClick={() => alert("View Details Coming Soon!")}
                        className="text-xs flex text-gray-500 hover:underline mt-2"
                      >
                        View Details &gt;
                      </button>
                    </div>
                  </div>
                </td>
              </Container>
            );
          })}
        </tbody>
      </table>
      {data.length === 0 && (
        <p className="text-gray-500 text-center mt-6">No results found.</p>
      )}
    </Container>
  );
}

export default Results;
