"use client";

import { useEskolar } from "@/hooks/useEskolar";
import Header from "@/components/shared/header";
import { BetaNotice } from "@/components/shared/beta-notice";
import { ChatHistory } from "@/components/chat-history";
import { ChatDisplay } from "@/components/chat-display";

export default function ChatPage() {

    const { profile, loading, error } = useEskolar();
    if (loading) return <p>Loading</p>;
    if (error) return <p className="text-red">An error occurred.</p>;

    return (
        <>
            <Header imageUrl={ profile.profile_url } imageDesc={ profile.full_name }/>
            <BetaNotice />
            <section className="h-screen grid grid-cols-5">
                <div className="col-span-1 bg-white border-r border-gray-300">
                    <ChatHistory />
                </div>
                <div className="col-span-4 bg-slate-100">
                    <ChatDisplay />
                </div>
            </section>
        </>
    )
}