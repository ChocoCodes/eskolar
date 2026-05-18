"use client";

import Header from '@/components/shared/header';
import { SummarySection } from '@/components/shared/summary-section';
import { BetaNotice } from '@/components/shared/beta-notice';
import { Loading } from '@/components/shared/loading';
import { useEskolar } from '@/hooks/useEskolar';
import { ProfileHeader, ProfileInfo } from '@/components/profile/_components';
import { GoTrophy } from "react-icons/go";
import { PiCertificate } from "react-icons/pi";
import { LuUsersRound } from "react-icons/lu";
import { IoCodeSlash } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import { HiOutlineCpuChip } from "react-icons/hi2";

export default function ProfilePage() {
  const { profile, showcase, loading, error } = useEskolar();
  const profileSummary = [
    { title: "ACHIEVEMENTS", listItems: showcase.achievements.map((item: { title: string }) => item.title), icon: GoTrophy, listIcon: FaCheck },
    { title: "CREDENTIALS", listItems: showcase.credentials.map((item: { title: string }) => item.title), icon: PiCertificate, listIcon: FaCheck },
    { title: "EXTRACURRICULARS", listItems: showcase.extracurriculars.map((item: { title: string }) => item.title), icon: LuUsersRound, listIcon: FaCheck },
    { title: "SKILLS & INTERESTS", listItems: showcase.skills.map((item: { title: string }) => item.title), icon: IoCodeSlash, listIcon: HiOutlineCpuChip },
  ];

  if (loading) return <Loading />;
  if (error) return <p className="text-red">An error occured.</p>;

  return (
    <>
      <Header imageUrl={ profile.profile_url } imageDesc={ profile.full_name }/>
      <BetaNotice /> 
      {/* ====== CONTAINER PROFILE DISPLAY ====== */}
      <section className="w-9/10 mx-auto grid grid-cols-5 gap-10 h-screen overflow-x-hidden">
        {/* ====== CONTAINER PROFILE SUMMARY ====== */}
        <div className='w-full col-span-2 grid grid-rows-4 gap-3 h-9/10 my-auto'>
          { profileSummary.map((section, i) => (
            <SummarySection key={ i } { ...section }/>
          ))}
        </div>
        {/* ====== CONTAINER PROFILE MAIN ====== */}
        <div className='col-span-3 flex justify-center items-center'>
          <div className="relative overflow-hidden flex flex-col gap-4 w-full h-9/10 rounded-xl border-2 border-gray-outline">
            <ProfileHeader coverUrl={ profile.cover_url } profileUrl={ profile.profile_url } profileName={ profile.full_name } /> 
            <div className="pt-3 flex flex-col gap-2">
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
        </div>
      </section>
    </>
  )
}
