import Image from 'next/image'

interface ProfileHeaderProps {
    coverUrl: string;
    profileUrl: string;
    profileName: string;
}

export const ProfileHeader = ({ coverUrl, profileUrl, profileName }: ProfileHeaderProps) => {
    return (
      <div className="relative w-full">
          {/* Cover */}
          <div className="relative h-48 w-full rounded-t-xl overflow-hidden">
              <Image src={coverUrl} alt={`Cover of ${profileName}`} fill className="object-cover" />
          </div>
          {/* Avatar — sits half outside the cover */}
          <div className="absolute left-12 -bottom-8">
              <div className="relative w-32 h-32 rounded-full border-4 border-white overflow-hidden">
                  <Image src={profileUrl} alt={`Profile of ${profileName}`} fill className="object-cover" />
              </div>
          </div>
      </div>
    )
}