"use client";
import React from "react";
import Header from "@/components/shared/header";
import { useEskolar } from "@/hooks/useEskolar";

function Layout({ children }: { children: React.ReactNode }) {
  const { profile, loading, error } = useEskolar();
  if (loading) return <p>Loading</p>;
  if (error) return <p className="text-red">An error occured.</p>;
  console.log(profile);
  return (
    <main>
      <Header imageUrl={profile.profile_url} imageDesc={profile.full_name} />
      {children}
    </main>
  );
}

export default Layout;
