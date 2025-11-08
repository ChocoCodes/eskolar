"use client";
import React, { useState, useMemo } from "react";
import Container from "@/components/ui/container";
import MetricCard from "@/components/shared/metric-card";
import { IoDocumentText } from "react-icons/io5";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import SearchBar from "@/components/applications/search-bar";
import { dummyScholarships } from "@/lib/dummy-data/applications";
import Results from "@/components/applications/results";

function Page() {
  // State for search and status filter
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

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

  // Compute filtered results (by search and/or status)
  const filteredScholarships = useMemo(() => {
    return dummyScholarships.filter((app) => {
      const matchesSearch =
        app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.provider.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter ? app.status === statusFilter : true;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

  return (
    <div className="px-12 mt-8">
      <Container>
        <h1 className="font-bold text-4xl">Scholarship Applications</h1>
        <p className="text-sm mt-1">View scholarship status</p>

        {/* Display stats */}
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

      {/* Search bar that controls filters */}
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
      />

      {/* Results table receives filtered data */}
      <Results data={filteredScholarships} />
    </div>
  );
}

export default Page;
