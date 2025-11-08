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
    const [showcase, setShowcase] = useState<any>({
        achievements: [],
        credentials: [],
        extracurriculars: [],
        skills: [],
        awards: []
    });

    const fetchProfile = async () => {
        // No query will be performed if there is no user
        if (!user) {
            return;
        }

        setLoading(true);
        setError(null);

        const { data: eSkolarProfile, error: supabaseError } = await supabase  
            .from("profiles")
            .select("*")
            .eq("user_id", user.id)
            .single();

        if (authUserError) {
            setError(authUserError);
            setLoading(false);
            return;
        }

        if (supabaseError) {
            setError(supabaseError instanceof PostgrestError ? supabaseError.message : 'An unknown error occured.');
            setLoading(false);
            return;
        }
        
        setProfile(eSkolarProfile);
        
        const { data: eSkolarShowcase, error: showcaseError } = await supabase
            .from("profile_items")
            .select("title, category")
            .eq("profile_id", eSkolarProfile.id);
        
        console.log('showcase:', JSON.stringify(eSkolarShowcase, null, 2));
        if (showcaseError) {
            setError(showcaseError.message);
            setLoading(false);
            return;
        }
        
        const sorted = {
            achievements: eSkolarShowcase?.filter(item => item.category === "achievements") || [],
            credentials: eSkolarShowcase?.filter(item => item.category === "credentials") || [],
            extracurriculars: eSkolarShowcase?.filter(item => item.category === "extracurriculars") || [],
            skills: eSkolarShowcase?.filter(item => item.category === "skills_interests") || [],
            awards: eSkolarShowcase?.filter(item => item.category === "awards") || [],
        }

        console.log({ ...sorted })
        setShowcase(sorted);

        const { data: digitalLinks, error: digitalLinksError } = await supabase
            .from("profile_digital_links")
            .select("*")
            .eq("profile_id", eSkolarProfile.id)

        if (digitalLinksError) {
            setError(digitalLinksError.message);
            setLoading(false);
            return;
        }

        setProfile({
            ...eSkolarProfile,
            links: digitalLinks || []
        });
        setLoading(false);
    }

    useEffect(() => {
        if (!userLoading && user) {
            fetchProfile();
        } else if (!userLoading && !user) {
            setLoading(false);
        }
    }, [userLoading, user])

    return { profile, showcase, loading: userLoading || loading, error };
}