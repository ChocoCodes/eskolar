import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Header from '@/components/shared/header'
import { SummarySection } from '@/components/shared/summary-section'

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

export default async function ProtectedPage() {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getClaims()
  if (error || !data?.claims) {
    redirect('/auth/login')
  }

  return (
    <>
      <Header imageUrl="default.jpg"/>
      <section className="grid grid-cols-5 h-screen overflow-x-hidden">
        <div className='col-span-2 flex justify-center items-center'>
          <div className="w-4/5 h-9/10 rounded-xl border-2 border-gray-outline flex flex-col gap-2 items-center justify-center">
            <p className="font-medium text-5xl">Profile Summary</p>
            <div className="flex flex-col gap-4 w-4/5 mx-auto mt-5">
              { sampleData.map(({title, listItems}, index) => (
                <SummarySection key={ index } title={ title } listItems={ listItems }/>
              ))}
            </div>
          </div>
        </div>
        <div className='col-span-3 flex justify-center items-center'>
          <div className="w-4/5 h-9/10 rounded-xl border-2 border-gray-outline"></div>
        </div>
      </section>
    </>
  )
}
