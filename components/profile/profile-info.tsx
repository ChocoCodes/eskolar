import Link from 'next/link';
import { AwardCard } from './award-card';
import { SocialIcon } from './social-icon';

export const ProfileInfo = ({ profile, awards }: { profile: any, awards: any }) => {
    const handlePronouns = (gender: string) => {
        const pronounsMap: Record<string, string> = {
            male: 'he/him',
            female: 'she/her',
            other: 'they/them',
        }

        return pronounsMap[gender?.toLowerCase()] || 'they/them'
    }

    return (
        <div className="flex flex-col gap-6 w-full justify-between px-12 -mt-6">
            {/* ====== INFORMATION ====== */}
            <div className="flex flex-col gap-1">
                <div className="flex items-center justify-left gap-4">
                    <h1 className='text-4xl font-medium'>{ profile.full_name }</h1>
                    <p className='text-lg text-gray-500'>{ handlePronouns(profile.gender) }</p>
                </div>
                <div className="flex flex-col text-lg">
                    <p>{ profile.highest_degree }</p>
                    <p>{ profile.bio }</p>
                </div>
                <div className="flex items-center gap-6 text-md">
                    <p className=' text-gray-500'>{`${ profile.city }, ${ profile.region }`}</p>
                    <p className='underline text-blue-500'>{ profile.email }</p>
                    <div className="flex gap-2">
                        { profile.links.map((link: any, i: number) => (
                            <SocialIcon key={ i } url={ link.url } platform={ link.platform } />
                        ))}
                    </div>
                </div>
                <Link 
                    href={'#'} 
                    className='underline text-gray-600'
                    onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                        e.preventDefault();
                        alert("Coming Soon!");
                }}>
                    View Scholarship Files
                </Link>
            </div>
            {/* ====== AWARDS ====== */}
            <div className="flex w-full gap-3">
                { awards.map((award: { title: string }, i: number) => (
                    <AwardCard key={ i } awardTitle={ award.title } />
                ))}
            </div>
            <div className="w-full h-1 rounded-full bg-gray-400"></div>
        </div>
    )
}