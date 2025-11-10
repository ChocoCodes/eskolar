"use client";

import React, { useState } from "react";
import Container from "@/components/ui/container";
import MetricCard from "@/components/shared/metric-card";
import { IoDocumentText } from "react-icons/io5";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import SearchBar from "@/components/applications/search-bar";
import Results from "@/components/applications/results";
import { dummyScholarships } from "@/lib/dummy-data/applications";
import { useAppliedScholarships } from "@/hooks/useAppliedScholarships";

function Page() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const { data, loading, error, totalPages, totalResults } =
    useAppliedScholarships({
      searchTerm,
      statusFilter,
      page,
      limit: pageSize,
    });

  // Compute metrics
  const metrics = [
    {
      title: "Submitted Applications",
      value: dummyScholarships.length,
      icon: IoDocumentText,
      variant: "blue",
    },
    {
      title: "Under Review",
      value: dummyScholarships.filter((s) => s.status === "Under Review")
        .length,
      icon: MdOutlineAccessTimeFilled,
      variant: "yellow",
    },
    {
      title: "Completed",
      value: dummyScholarships.filter((s) => s.status === "Completed").length,
      icon: FaCheckCircle,
      variant: "green",
    },
  ];

  return (
    <div className="px-12 mt-8 mb-3">
      <Container>
        {/* Page Header */}
        <h1 className="font-bold text-4xl">Scholarship Applications</h1>
        <p className="text-sm mt-1">View scholarship status</p>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {metrics.map((metric) => (
            <MetricCard
              key={metric.title}
              variant={metric.variant as "blue" | "green" | "yellow" | "red"}
              icon={metric.icon}
              title={metric.title}
              value={metric.value}
            />
          ))}
        </div>
      </Container>

      {/* Search Bar */}
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={(value) => {
          setSearchTerm(value);
          setPage(1);
        }}
        statusFilter={statusFilter}
        onStatusChange={(value) => {
          setStatusFilter(value);
          setPage(1);
        }}
      />

      {/* Results Section */}
      {loading ? (
        <p className="text-center text-gray-500 mt-8">
          Fetching scholarships...
        </p>
      ) : error ? (
        <p className="text-center text-red-500 mt-8">{error}</p>
      ) : (
        <Results
          data={data}
          page={page}
          totalPages={totalPages}
          onPageChange={(p) => setPage(p)}
          totalItems={totalResults}
          itemsPerPage={pageSize}
        />
      )}
    </div>
  );
}

export default Page;
