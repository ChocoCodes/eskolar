"use client";

import Header from '@/components/shared/header';
import { SummarySection } from '@/components/shared/summary-section';
import { BetaNotice } from '@/components/shared/beta-notice';
import { useEskolar } from '@/hooks/useEskolar';
import Image from 'next/image'

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
  const { profile, loading, error } = useEskolar();
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
            <div className="flex items-center justify-center h-1/10 py-3">
              <p className="font-medium text-3xl">Profile Summary</p>
            </div>
            <div className="flex flex-col gap-4 w-4/5 mx-auto mt-5">
              {sampleData.map(({title, listItems}, index) => (
                <SummarySection key={ index } title={ title } listItems={ listItems }/>
              ))}
            </div>
          </div>
        </div>
        {/* ====== CONTAINER PROFILE MAIN ====== */}
        <div className='col-span-3 flex justify-center items-center'>
          <div className="relative overflow-hidden w-4/5 h-9/10 rounded-xl border-2 border-gray-outline">
              <div className="relative h-48 w-full inset-x-0 rounded-t-xl overflow-hidden">
                <Image src={ profile.cover_url } alt={`Cover of ${ profile.full_name }`} fill className='object-cover'/>
              </div>
          </div>
          <div className="absolute left-8 -bottom-16">
            <div className="relative w-32 h-32 rounded-full border-2 border-white overflow-hidden">
              
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
