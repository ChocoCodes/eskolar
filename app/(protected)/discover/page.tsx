"use client";

import { BetaNotice } from "@/components/shared/beta-notice";
import Header from "@/components/shared/header";
import { Loading } from "@/components/shared/loading";
import { useEskolar } from "@/hooks/useEskolar";
import { ScholarshipFilter } from "@/components/discover/scholarship-filter";

export default function DiscoverPage() {
    const { profile, loading, error } = useEskolar();
    if (loading) return <Loading />;
    return (
        <>
            <Header imageUrl={ profile.profile_url } imageDesc={ profile.full_name } />
            <BetaNotice />
            <section className="h-screen overflow-x-hidden py-2 flex items-center justify-center"> 
                <ScholarshipFilter />
            </section>
        </>
    )
}