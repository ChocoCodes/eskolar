/**
 * Note: This is only a dummy implementation.
 * */

"use client";
import { useEffect, useState } from "react";
import { dummyScholarships } from "@/lib/dummy-data/applications";
import type { ScholarshipApplication } from "@/lib/dummy-data/applications";

type UseAppliedScholarshipProps = {
  searchTerm: string;
  statusFilter: string | null;
  page: number;
  limit?: number;
};

export function useAppliedScholarships({
  searchTerm,
  statusFilter,
  page,
  limit = 5,
}: UseAppliedScholarshipProps) {
  const [data, setData] = useState<ScholarshipApplication[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalResults, setTotalResults] = useState(0);

  /********** DUMMY IMPLEMENTATION **********/
  // TODO: Replace with actual API call
  useEffect(() => {
    setLoading(true);
    setError(null);

    const timer = setTimeout(() => {
      try {
        const filtered = dummyScholarships.filter((app) => {
          const matchesSearch =
            app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.provider.toLowerCase().includes(searchTerm.toLowerCase());
          const matchesStatus = statusFilter
            ? app.status === statusFilter
            : true;
          return matchesSearch && matchesStatus;
        });

        const total = filtered.length;
        setTotalResults(total);

        const startIndex = (page - 1) * limit;
        const endIndex = Math.min(startIndex + limit, total);
        const paginatedData = filtered.slice(startIndex, endIndex);

        setData(paginatedData);
      } catch (err) {
        setError("Failed to fetch scholarships.");
      } finally {
        setLoading(false);
      }
    }, 700); // Simulate delay

    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm, statusFilter, page, limit]);

  const totalPages = Math.ceil(totalResults / limit);

  return {
    data,
    loading,
    error,
    totalResults,
    totalPages,
  };
}
