import { createClient } from "@supabase/supabase-js"
import { redirect } from 'next/navigation'
import { PiSignOutFill } from "react-icons/pi"
import { Button } from "@/components/ui/button";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const SignOutButton = () => {
    const handleSignOut = async () => {
        const { error } = await supabase.auth.signOut();
        if(error) {
            console.error("Failed to sign out.");
        } else {
            redirect('/auth/login');
        }
    }
    return (
        <Button variant="ghost" onClick={ handleSignOut }>
            <PiSignOutFill />
            Sign Out
        </Button>
    )
}

