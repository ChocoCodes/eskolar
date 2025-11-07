import Image from 'next/image'
import { NavItem } from './nav-item'
import { Button } from '@/components/ui/button'
import { 
    DropdownMenu, 
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem
} from '@/components/ui/dropdown-menu'
import { SignOutButton } from './sign-out'

interface HeaderProps {
    imageUrl: string;
    imageDesc: string;
}

const navItemsData = [
    {
        href: "/profile",
        text: "Profile"
    },
    {
        href: "/discover",
        text: "Discover"
    },
    {
        href: "/apply",
        text: "Application"
    },
    {
        href: "/chat",
        text: "Chatbot"
    }
];

export default function Header({ imageUrl, imageDesc }: HeaderProps ) {
    return (
        <nav className="flex w-full px-12 py-3 border-b-2 border-b-gray-300 justify-between items-center overflow-x-hidden">
            <div className="flex gap-12 items-center justify-center">
                <Image src="/eskolar-logo.png" alt="eSkolar Logo" width={128} height={128} className="object-fit" />
                <ul className="flex gap-8">
                    { navItemsData.map((navItem, index) => (
                        <NavItem key={ index } href={ navItem.href } text={ navItem.text } /> 
                    ))}
                </ul>
            </div>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className='relative p-0 w-12 h-12 rounded-full overflow-hidden hover:cursor-pointer focus:ring-0 focus-visible:ring-0 hover:bg-transparent active:bg-transparent focus:outline-none'>
                        <Image src={ imageUrl } alt={`Picture of ${ imageDesc }`} fill className='object-cover rounded-full' />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>
                        <SignOutButton />
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

        </nav>
    )
}