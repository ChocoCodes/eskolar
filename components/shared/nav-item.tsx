import Link from 'next/link'
import { usePathname } from 'next/navigation';

interface NavItemProps {
    href: string;
    text: string;
}
export const NavItem = ({ href, text }: NavItemProps) => {
    const currentPage = usePathname();
    return (
        <li>
            <Link href={ href } className={`hover:text-gold-hover ${currentPage === href ? 'text-gold' : 'text-black'} transition-colors duration-150`}>{ text }</Link>
        </li>
    )
}