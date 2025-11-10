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

type Message = {
    id: string;
    session_id: string;
    sender: 'skolar' | 'bot';
    message: string;
    sent_at: string;
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

export const useChatMessages = (sessionId: string) => {
    const { user, loading: userLoading, error: authUserError } = useSupabaseAuthUser();
    const { supabase } = useSupabaseClient();
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchMessages = useCallback(async () => {
        if (!user) return;

        setLoading(true);
        setError(null);

        const { data, error: supabaseError } = await supabase
            .from("chat_messages")
            .select("*")
            .eq("session_id", sessionId)
            .order("sent_at", { ascending: true });

        if (authUserError) {
            setError(authUserError);
        } else if (supabaseError) {
            setError(supabaseError instanceof PostgrestError ? supabaseError.message : 'An unknown error occurred.');
        } else {
            setMessages(data || []);
            console.log(data);
        }

        setLoading(false);
    }, [user, supabase, sessionId, authUserError]);

    useEffect(() => {
        if (user) {
            fetchMessages();
        }
    }, [user, sessionId, fetchMessages]);

    return { messages, loading: userLoading || loading, error };
}

export const useCreateChatSession = () => {
    const { user, loading: userLoading, error: authUserError } = useSupabaseAuthUser();
    const { supabase } = useSupabaseClient();
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const createChatSession = useCallback(async (message: string) => {
        if (!user) return;

        setLoading(true);
        setError(null);

        const { data, error: sessionError } = await supabase
            .from('chat_sessions')
            .insert({
                profile_id: user.id ,
                title: message
            })
            .select('id')
            .single();

        const newSessionId = data?.id;

        const { error: messageError } = await supabase
            .from('chat_messages')
            .insert({
                session_id: newSessionId,
                sender: 'skolar',
                message: message,
            });

        if (authUserError) {
            setError(authUserError);
        } else if (sessionError) {
            setError(sessionError instanceof PostgrestError ? sessionError.message : 'An unknown error occurred.');
        } else if (messageError) {
            setError(messageError instanceof PostgrestError ? messageError.message : 'An unknown error occurred.');
        } else {
            setSessionId(newSessionId);
        }
        setLoading(false);

        return newSessionId;
    }, [user, supabase, authUserError]);

    return { createChatSession, sessionId, loading: userLoading || loading, error };
}