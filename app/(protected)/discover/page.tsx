"use client";

import { useState, useEffect } from 'react'
import { BetaNotice } from "@/components/shared/beta-notice";
import Header from "@/components/shared/header";
import { Loading } from "@/components/shared/loading";
import { useEskolar } from "@/hooks/useEskolar";
import { ScholarshipFilter } from "@/components/discover/scholarship-filter";
import { scholarshipDataSample } from "@/lib/dummy-data/discover";
import { ScholarshipCard } from "@/components/discover/scholarship-card";
import { Scholarship } from '@/lib/utils';
import { SearchBar } from '@/components/discover/search-bar';

export default function DiscoverPage() {
    const { profile, loading, error } = useEskolar();
    const [scholarships] = useState<Scholarship[]>(scholarshipDataSample);
    const [filtered, setFiltered] = useState<Scholarship[]>(scholarships);
    
    if (loading) return <Loading />;
    if (error) return <p>{ error }</p>;
    
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
                            <ScholarshipCard key={ scholarship.programName } scholarship={ scholarship } />
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}