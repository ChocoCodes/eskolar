'use client';

import { Loading } from '@/components/shared/loading';
import { useScholarships } from '@/hooks/useScholarships';
import { useEskolar } from '@/hooks/useEskolar';
import { BetaNotice } from '@/components/shared/beta-notice';
import { useParams } from 'next/navigation';
import Header from '@/components/shared/header';
import Image from 'next/image';
import Link from 'next/link';
import { mapStatus, formatDeadlineWithLocale, toTitleCase, mapRecommendMatch } from '@/lib/utils';
import { FaThumbsUp } from "react-icons/fa";
import { ProgressBar } from '@/components/discover/progress-bar';
import { ScoreRing } from '@/components/discover/score-ring';
import { IoCashOutline } from "react-icons/io5";
import { BsCashCoin } from "react-icons/bs";
import { LuCalendarClock } from "react-icons/lu";
import { FaUserCheck } from "react-icons/fa6";
import { useState, useEffect } from 'react';
import { getStudentProfileQuery, StudentProfile } from '@/lib/supabase/query';
import { useSupabaseClient, useSupabaseAuthUser } from '@/hooks/useSupabase';
import { RiChatAiFill } from "react-icons/ri";

export default function ScholarshipPage() {
    const [studentData, setStudentData] = useState<StudentProfile | null>(null);
    const [analysis, setAnalysis] = useState<string | null>(null);
    const [analysisLoading, setAnalysisLoading] = useState<boolean>(false);
    const [analysisError, setAnalysisError] = useState<string | null>(null);

    const { scholarships, loading, error } = useScholarships();
    const { profile, loading: profileLoading, error: profileError } = useEskolar();
    const { supabase } = useSupabaseClient();
    const { user } = useSupabaseAuthUser();
    const { id } = useParams()

    const scholarship = scholarships.find(s => s.id === Number(id));

    useEffect(() => {
        if (!supabase || !user) return;
        
        const fetchStudentProfile = async () => {
            try { 
                const { data, error } = await getStudentProfileQuery(supabase, user.id);
                if (error) throw error;

                setStudentData(data as StudentProfile);
            } catch (err) {
                console.error("Failed to fetch profile data from LLM context: " + err);
            }
        }

        fetchStudentProfile();
    }, [supabase, user?.id]);

    useEffect(() => {
        if (!studentData || !scholarship || analysis || analysisLoading || !scholarship.breakdown) return;

        const generateAnalysis = async () => {
            try { 
                setAnalysisLoading(true);
                setAnalysisError(null);
                
                // Exclude destructured field/s
                const { full_name, city, region, ...studentPayload } = studentData as Record<string, any>;
                const { id, provider_name, award_value, program_img_url, slots, tags, breakdown, ...scholarshipPayload } = scholarship as Record<string, any>;
                const breakdownPayload = breakdown ? { ...breakdown } : null;

                const response = await fetch('/api/analysis', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        student: studentPayload,
                        scholarship: scholarshipPayload,
                        breakdown: breakdownPayload
                    })
                });

                if (!response.ok) throw new Error(`eSbot server responded with error ${response.status}`);
                
                const result = await response.json();
                setAnalysis(result.data);
                console.log('LLM result: ' + JSON.stringify(result));
            } catch (err) {
                setAnalysisError(err instanceof Error ? err.message : "Could not connect to the eSBot processing server.");
                console.error(err);
            } finally {
                setAnalysisLoading(false);
            }
        };

        generateAnalysis();
    }, [studentData, scholarship]);

    if (profileLoading || loading) return <Loading />;
    if (error || profileError) return <p className='text-red-400'>An error occured: { error || profileError }</p>;
    if (!scholarship) return <p className='text-red-400'>Scholarship not found.</p>;

    return (
        <>
            <Header imageUrl={ profile.profile_url } imageDesc={ profile.full_name } />
            <BetaNotice />
            <section className='flex gap-4 justify-center mt-4'>
                <div className='w-3/5 flex flex-col gap-6 p-7 shadow-md border border-gray-300 rounded-md'>
                    <Link href='/discover' className='w-fit hover:underline'>&larr; Back to Discover</Link>
                    <div className='flex items-center gap-8 -mt-6'>
                        <div className="relative w-32 h-32">
                            <Image fill src={ scholarship.program_img_url } alt={`Photo of ${scholarship.program_name} Scholarship`} className='object-contain'/>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className='font-bold text-4xl'>{ scholarship.program_name }</p>
                            <p className='font-semibold text-muted-foreground text-xl'>{ scholarship.provider_name }</p>
                            <p className={`text-sm rounded-sm font-medium w-fit px-3 py-1 text-white ${mapStatus[scholarship.status.toLowerCase()]}`}>{ scholarship.status.toUpperCase() }</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 gap-6">
                        <div className="flex flex-col gap-1 rounded-sm shadow-md border py-3 px-6">
                            <span className='inline-flex items-center gap-2 text-muted-foreground'><IoCashOutline /><p className='font-semibold'>Award Value</p></span>     
                            <p className='text-2xl font-medium'>₱{ scholarship.award_value }</p>
                        </div>
                        <div className="flex flex-col gap-1 rounded-sm border shadow-md py-3 px-6">
                            <span className="inline-flex items-center gap-2 text-muted-foreground"><BsCashCoin /><p className='font-semibold'>Grant Type</p></span>
                            <p className='text-2xl font-medium'>{ scholarship.grant_type.toUpperCase() }</p>
                        </div>
                        <div className="flex flex-col gap-1 rounded-sm border shadow-md py-3 px-6">
                            <span className="inline-flex items-center gap-2 text-muted-foreground"><LuCalendarClock /><p className='font-semibold'>Deadline</p></span>
                            <p className='text-2xl font-medium'>{ formatDeadlineWithLocale(scholarship.deadline) }</p>
                        </div>
                        <div className="flex flex-col gap-1 rounded-sm border shadow-md py-3 px-6">
                            <span className="inline-flex items-center gap-2 text-muted-foreground"><FaUserCheck/><p className='font-semibold'>Slots Available</p></span>
                            <p className='text-2xl font-medium'>{ scholarship.slots }</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 border-b-2 border-gray-300 pb-3">
                        <p className='font-semibold'>Eligibility</p>
                        <p>{ scholarship.eligibility }</p>
                    </div>
                    <div className="flex flex-col gap-3 -mt-3">
                        <p className='font-semibold'>Description</p>
                        <p>{ scholarship.description }</p>
                        <div className="flex gap-3">
                            {scholarship.tags.map((tag, i) => (
                                <p key={ i } className='px-2 py-1 border-2 text-xs border-blue-500 rounded-sm text-blue-500'>{ tag }</p>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-3 px-4 py-5 w-1/4 shadow-md border border-gray-400 rounded-lg">
                    <div className="w-full flex gap-2 items-center">
                        <ScoreRing score={ scholarship.e_recommend ?? 0 } />
                        <div className="flex flex-col gap-1">
                            <p className='text-lg font-semibold'>eRecommend Score</p>
                            <div className={`w-fit flex gap-2 items-center border-2 py-1 px-2 rounded-sm text-xs ${ mapRecommendMatch[scholarship.match?.toLowerCase() || ""] || "bg-gray-300" }`}>
                                <FaThumbsUp />
                                { scholarship.match && <p>{ toTitleCase(scholarship.match) } Match</p> }
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1 border border-gray-400 rounded-lg p-3 shadow-sm">
                        <p className='font-semibold text-base'>Score Breakdown</p>
                        <ProgressBar label="Eligibility" weight='60%' value={ scholarship.breakdown?.eligibility || 0 } max={ 60 }/>
                        <ProgressBar label="Profile" weight='40%' color='bg-gold' value={ scholarship.breakdown?.profile || 0 } max={ 40 }/>
                    </div>
                    <div className="flex flex-col gap-1 border border-blue-400 rounded-lg p-3 shadow-sm">
                        <span className="inline-flex items-center gap-1 text-blue-600"><RiChatAiFill /><p className='font-semibold'>eRecommend AI Insights</p></span>
                        { analysisLoading && <p className='text-muted-foreground text-sm text-center'>Loading Insights...</p> }
                        { analysisError && <p className="text-red-500">Analysis Failed: { analysisError }</p> }
                        { !analysisLoading && !analysisError && <p className='text-xs'>{ analysis }</p> }
                    </div>
                </div>
            </section>
        </>
    );
}