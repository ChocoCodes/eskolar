import Link from 'next/link'
import { FaFacebook, FaLinkedin, FaGithub } from 'react-icons/fa'
import { SocialLink } from '@/lib/utils'

const iconMap: Record<string, React.ElementType> = {
  facebook: FaFacebook,
  linkedin: FaLinkedin,
  github: FaGithub,
}

export const SocialIcon = ({ url, platform }: SocialLink) => {
  const Icon = iconMap[platform.toLowerCase()];

  if (!Icon) return null;

  return (
    <Link
      href={ url }
      target="_blank"
      rel="noopener noreferrer"
      className="hover:opacity-75 transition"
    >
      <Icon className="w-7 h-7 text-gray-700" />
    </Link>
  )
}
