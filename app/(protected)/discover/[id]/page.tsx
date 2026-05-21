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
import { FaInfoCircle, FaThumbsUp } from "react-icons/fa";
import { ProgressBar } from '@/components/discover/progress-bar';
import { ScoreRing } from '@/components/discover/score-ring';
import { IoCashOutline } from "react-icons/io5";
import { BsCashCoin } from "react-icons/bs";
import { LuCalendarClock } from "react-icons/lu";
import { FaUserCheck } from "react-icons/fa6";

export default function ScholarshipPage() {
    const { scholarships, loading, error } = useScholarships();
    const { profile, loading: profileLoading, error: profileError } = useEskolar();

    const { id } = useParams()
    const scholarship = scholarships.find(s => s.id === Number(id));

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
                    <div className='flex items-center gap-4 -mt-6'>
                        <div className="relative w-32 h-32">
                            <Image fill src={ scholarship.program_img_url } alt={`Photo of Scholarship ${scholarship.program_name}`} className='object-contain'/>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p>{ scholarship.program_name }</p>
                            <p>{ scholarship.provider_name }</p>
                            <p className={`text-sm rounded-full w-fit px-3 py-1 text-white ${mapStatus[scholarship.status.toLowerCase()]}`}>{ scholarship.status.toUpperCase() }</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 gap-6">
                        <div className="flex flex-col gap-1 rounded-sm shadow-md border py-3 px-6">
                            <span className='inline-flex items-center gap-2 text-muted-foreground'><IoCashOutline /><p className='font-semibold'>Award Value</p></span>     
                            <p className='text-2xl font-medium'>₱{ scholarship.award_value }</p>
                        </div>
                        <div className="flex flex-col gap-1 rounded-sm border shadow-md py-3 px-6">
                            <span className="inline-flex items-center gap-2 text-muted-foreground"><BsCashCoin /><p className='font-semibold'>Grant Type</p></span>
                            <p className='text-2xl font-medium'>{ scholarship.grant_type }</p>
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
                    <div className="flex flex-col gap-5 -mt-3">
                        <p className='font-semibold'>Description</p>
                        <p>{ scholarship.description }</p>
                        <div className="flex gap-1">
                            {scholarship.tags.map((tag, i) => (
                                <p key={ i } className='p-1 border-2 text-xs border-blue-500 rounded-sm text-blue-500'>{ tag }</p>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2 px-4 py-5 w-1/4 shadow-md border border-gray-400 rounded-lg">
                    <div className="w-full flex gap-2 items-center">
                        <ScoreRing score={ scholarship.e_recommend ?? 0 } />
                        <div className="flex flex-col gap-2">
                            <p className='text-lg font-semibold'>eRecommend Score</p>
                            <div className={`w-fit flex gap-2 items-center border-2 py-1 px-2 rounded-sm text-sm ${ mapRecommendMatch[scholarship.match?.toLowerCase() || ""] || "bg-gray-300" }`}>
                                <FaThumbsUp />
                                { scholarship.match && <p>{ toTitleCase(scholarship.match) } Match</p> }
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className='font-semibold'>Score Breakdown</p>
                        <ProgressBar label="Eligibility" weight='80%' value={ scholarship.breakdown?.eligibility || 0 } max={ 80 }/>
                        <ProgressBar label="Profile" weight='20%' color='bg-gold' value={ scholarship.breakdown?.profile || 0 } max={ 20 }/>
                    </div>
                    <div className='flex flex-col gap-1 w-full bg-gold text-black p-3 rounded-sm text-[10px] mt-auto'>
                        <span className='inline-flex gap-2 items-center font-semibold'><FaInfoCircle />Disclaimer</span>
                        <p>eRecommend scores and analysis are AI-assisted and based on your provided profile. This analysis is for guidance only and does not guarantee scholarship award outcomes.</p>
                    </div>
                </div>
            </section>
        </>
    );
}