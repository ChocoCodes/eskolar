"use client";

import {useEffect, useState, useCallback} from "react";
import {useSupabaseAuthUser, useSupabaseClient} from "@/hooks/useSupabase";
import { PostgrestError } from '@supabase/supabase-js';

type ChatSession = {
    id: string;
    profile_id: string;
    title: string;
    created_at: string;
    updated_at: string;
}

export const useChatHistory = () => {
    const { user, loading: userLoading, error: authUserError } = useSupabaseAuthUser();
    const { supabase } = useSupabaseClient();
    const [chatHistory, setChatHistory] = useState<ChatSession[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchChatHistory = useCallback(async () => {
        if (!user) return;

        setLoading(true);
        setError(null);

        const { data, error: supabaseError } = await supabase
            .from("chat_sessions")
            .select("*")
            .eq("profile_id", user.id)
            .order("updated_at", { ascending: false });

        if (authUserError) {
            setError(authUserError);
        } else if (supabaseError) {
            setError(supabaseError instanceof PostgrestError ? supabaseError.message : 'An unknown error occurred.');
        } else {
            setChatHistory(data || []);
            console.log(user.id)
            console.log(data);
        }

        setLoading(false);
    }, [user, supabase, authUserError]);

    useEffect(() => {
        if (user) {
            fetchChatHistory();
        }
    }, [user, fetchChatHistory]);

    return { chatHistory, loading: userLoading || loading, error };
}