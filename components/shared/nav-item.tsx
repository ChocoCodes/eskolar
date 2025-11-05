import Link from 'next/link'

interface NavItemProps {
    href: string;
    text: string;
}
export const NavItem = ({ href, text }: NavItemProps) => {
    return (
        <li><Link href={ href } className='hover:text-gold-hover'>{ text }</Link></li>
    )
}