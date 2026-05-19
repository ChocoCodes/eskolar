"use client";

import { useState, useEffect } from 'react'
import { BetaNotice } from "@/components/shared/beta-notice";
import Header from "@/components/shared/header";
import { Loading } from "@/components/shared/loading";
import { useEskolar } from "@/hooks/useEskolar";
import { ScholarshipFilter } from "@/components/discover/scholarship-filter";
import { scholarshipDataSample } from "@/lib/dummy-data/discover";
import { ScholarshipCard } from "@/components/discover/scholarship-card";
import { SearchBar } from '@/components/discover/search-bar';
import { useScholarships, Scholarship } from '@/hooks/useScholarships';

export default function DiscoverPage() {
    const { profile, loading: profileLoading, error: profileError } = useEskolar();
    const { scholarships, loading: scholarshipLoading, error: scholarshipError } = useScholarships();

    const [filtered, setFiltered] = useState<Scholarship[]>([]);
    
    useEffect(() => {
        if (scholarships) {
            setFiltered(scholarships);
        }
    }, [scholarships]);

    if (profileLoading || scholarshipLoading) return <Loading />;
    if (profileError || scholarshipError) return <p>{ profileError || scholarshipError }</p>;
    
    return (
        <>
            <Header imageUrl={ profile.profile_url } imageDesc={ profile.full_name } />
            <BetaNotice />
            <section className="h-screen overflow-x-hidden py-2 flex gap-12 items-center justify-center px-12"> 
                <ScholarshipFilter />
                <div className="flex flex-col gap-10 h-9/10 w-3/4 overflow-auto">
                    <SearchBar scholarships={ scholarships } onSearch={ results => setFiltered(results) } />
                    <div className="flex flex-wrap h-4/5 gap-3 justify-center">
                        {filtered.map(scholarship => (
                            <ScholarshipCard key={ scholarship.id } scholarship={ scholarship } />
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}