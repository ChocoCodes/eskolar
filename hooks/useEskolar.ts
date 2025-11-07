"use client"
import { useState, useEffect } from 'react'
import { useSupabaseAuthUser, useSupabaseClient } from './useSupabase';
import { PostgrestError } from '@supabase/supabase-js';

export const useEskolar = () => {
    const { user, loading: userLoading, error: authUserError } = useSupabaseAuthUser();
    const { supabase } = useSupabaseClient();
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProfile = async () => {
        if (!user) {
            return;
        }
        setLoading(true);
        // No query will be performed if there is no user

        setLoading(true);
        setError(null);

        const { data: eSkolarProfile, error: supabaseError } = await supabase  
            .from("profiles")
            .select("*")
            .eq("user_id", user.id)
            .single();

        if (authUserError) {
            setError(authUserError);
        } else if (supabaseError) {
            setError(supabaseError instanceof PostgrestError ? supabaseError.message : 'An unknown error occured.');
        } else {
            setProfile(eSkolarProfile);
        }

        setLoading(false);
    }

    useEffect(() => {
        if (!userLoading && user) {
            fetchProfile();
        } else if (!userLoading && !user) {
            setLoading(false);
        }
    }, [userLoading, user])

    return { profile, loading: userLoading || loading, error };
}