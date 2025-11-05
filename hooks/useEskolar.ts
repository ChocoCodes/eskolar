import { useState, useEffect } from 'react'
import { useSupabaseAuthUser, useSupabaseClient } from './useSupabase';

export const useEskolar = () => {
    const { supabase } = useSupabaseClient();
    const { user, error: authUserError } = useSupabaseAuthUser();
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProfile = async () => {
        // No query will be performed if there is no user
        if (!user) {
            setLoading(false)
            return
        }

        setLoading(true)
        setError(null)

        const { data: eSkolarProfile, error } = await supabase  
            .from("profiles")
            .select("*")
            .eq("user_id", user.id)
            .single()

        if (authUserError) {
            setError(authUserError)
        } else if (error) {
            setError(error instanceof Error ? error.message : 'An unknown error occured.')
        } else {
            setProfile(eSkolarProfile)
        }

        setLoading(false);
    }

    useEffect(() => {
        fetchProfile();
    }, [user])

    return { profile, loading, error };
}