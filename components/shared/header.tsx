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

export default function Header({ imageUrl }: HeaderProps ) {
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
                    <Button variant="ghost" className='w-16 h-16 rounded-full bg-red-300 hover:cursor-pointer'>
                        s
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