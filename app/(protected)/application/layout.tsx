"use client";
import React from "react";
import Header from "@/components/shared/header";
import { Loading } from '@/components/shared/loading';
import { useEskolar } from "@/hooks/useEskolar";
import { BetaNotice } from "@/components/shared/beta-notice";

function Layout({ children }: { children: React.ReactNode }) {
  const { profile, loading, error } = useEskolar();
  if (loading) return <Loading />;
  if (error) return <p className="text-red">An error occured.</p>;
  console.log(profile);
  return (
    <main>
      <Header imageUrl={profile.profile_url} imageDesc={profile.full_name} />
      <BetaNotice />
      {children}
    </main>
  );
}

export default Layout;
