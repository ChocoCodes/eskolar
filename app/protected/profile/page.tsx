"use client";

import Header from '@/components/shared/header';
import { SummarySection } from '@/components/shared/summary-section';
import { BetaNotice } from '@/components/shared/beta-notice';
import { useEskolar } from '@/hooks/useEskolar';
import { ProfileHeader, ProfileInfo } from '@/components/profile/_components';

const sampleData = [
  {
    title: "Achievements",
    listItems: ["A", "B", "C"]
  },
  {
    title: "Credentials",
    listItems: ["A", "B", "C"]
  },
  {
    title: "Extracurriculars",
    listItems: ["A", "B", "C"]
  },
  {
    title: "Skills & Interests",
    listItems: ["A", "B", "C"]
  },
];

export default function ProfilePage() {
  const { profile, showcase, loading, error } = useEskolar();
  const profileSummary = [
    { title: "Achievements", listItems: showcase.achievements.map((item: { title: string }) => item.title) },
    { title: "Credentials", listItems: showcase.credentials.map((item: { title: string }) => item.title) },
    { title: "Extracurriculars", listItems: showcase.extracurriculars.map((item: { title: string }) => item.title) },
    { title: "Skills & Interests", listItems: showcase.skills.map((item: { title: string }) => item.title) },
  ]

  if (loading) return <p>Loading</p>;
  if (error) return <p className="text-red">An error occured.</p>;
  console.log(profile);
  return (
    <>
      <Header imageUrl={ profile.profile_url } imageDesc={ profile.full_name }/>
      <BetaNotice /> 
      {/* ====== CONTAINER PROFILE DISPLAY ====== */}
      <section className="grid grid-cols-5 h-screen overflow-x-hidden">
        {/* ====== CONTAINER PROFILE SUMMARY ====== */}
        <div className='col-span-2 flex justify-center items-center'>
          <div className="w-4/5 h-9/10 rounded-xl border-2 border-gray-outline flex flex-col gap-2">
            <div className="flex items-center justify-center h-1/10 my-4">
              <p className="font-medium text-3xl">Profile Summary</p>
            </div>
            <div className="flex flex-col gap-6 w-4/5 mx-auto mt-5">
              {profileSummary.map(({title, listItems}, i) => (
                <SummarySection key={ i } title={ title } listItems={ listItems }/>
              ))}
            </div>
          </div>
        </div>
        {/* ====== CONTAINER PROFILE MAIN ====== */}
        <div className='col-span-3 flex justify-center items-center'>
          <div className="relative overflow-hidden flex flex-col gap-4 w-9/10 h-9/10 rounded-xl border-2 border-gray-outline">
            <ProfileHeader coverUrl={ profile.cover_url } profileUrl={ profile.profile_url } profileName={ profile.full_name } /> 
            <ProfileInfo profile={ profile } awards={ showcase.awards } />  
            {/* ====== ACADEMIC STATS ====== */}
            <div className="flex flex-col px-12 gap-2 py-4">
                <p className='-mt-2 text-xl font-semibold'>My Academic Stats</p>
                <div className="flex w-full gap-10">
                    <div className="flex flex-col">
                        <p className='font-semibold text-4xl'>{ profile.gwa }</p>
                        <p>General Weighted Average</p>
                    </div>
                    <div className="flex flex-col">
                        <p className='font-semibold text-4xl'>{ profile.ncae_gsa_score }</p>
                        <p>NCAE GSA</p>
                    </div>
                    <div className="flex flex-col">
                        <p className='font-semibold text-4xl'>{ profile.ncae_tvl_score }</p>
                        <p>NCAE TVL</p>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
