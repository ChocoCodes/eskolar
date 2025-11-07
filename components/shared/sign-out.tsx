"use client"
import { useSupabaseClient } from '@/hooks/useSupabase'
import { redirect } from 'next/navigation'
import { PiSignOutFill } from "react-icons/pi"
import { Button } from "@/components/ui/button";

export const SignOutButton = () => {
    const { supabase } = useSupabaseClient()
    
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

