import Image from 'next/image'

interface ProfileHeaderProps {
    coverUrl: string;
    profileUrl: string;
    profileName: string;
}

export const ProfileHeader = ({ coverUrl, profileUrl, profileName }: ProfileHeaderProps) => {
    return (
        <div className="relative overflow-hidden w-full h-2/5">
            <div className="relative h-48 w-full inset-x-0 rounded-t-xl overflow-hidden">
              <Image src={ coverUrl } alt={`Cover of ${ profileName }`} fill className='object-cover'/>
            </div>
          <div className="absolute inset-x-0 left-12 top-24">
            <div className="relative w-40 h-40 rounded-full border-4 border-white overflow-hidden">
              <Image src={ profileUrl } alt={`Profile of ${ profileName }`} fill className='object-cover' />
            </div>
          </div>
        </div>
    )
}