'use client'

import { useSearchParams } from 'next/navigation';
import { useCreateChatSession } from '@/hooks/useChat';
import { ChatInput } from "@/components/chat/chat-input";
import { ChatMessagesDisplay } from "@/components/chat/chat-messages-display";
import { useRouter } from 'next/navigation';

export function ChatDisplay({name}: { name: string }) {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get('sessionId');
    const { createChatSession, loading, error } = useCreateChatSession();
    const router = useRouter();

    const handleInitialSubmit = async (message: string) => {
        //if messaging from no session, create a new session
        const newSessionId = await createChatSession(message);

        if (newSessionId) {
            router.push(`?sessionId=${newSessionId}`);
        }
    }

    const handleSubmit = (message: string) => {
        // if messaging within an existing session
        // inyo nani guro idk
    }

    return (
        <div className="h-full flex flex-col">
            {!sessionId
                ?
                <div className="flex-1 flex flex-col justify-center items-center gap-6 w-1/2 mx-auto pb-24">
                    <h1 className="text-4xl font-semibold text-gold">Hello, {name}</h1>
                    <ChatInput onSubmit={handleInitialSubmit}/>
                </div>
                :
                <div className="h-full flex flex-col w-1/2 mx-auto pt-4 pb-8">
                    <div className="flex-1 min-h-0 mb-4">
                        <ChatMessagesDisplay sessionId={sessionId}/>
                    </div>
                    <div className="flex-shrink-0">
                        <ChatInput onSubmit={handleSubmit}/>
                    </div>
                </div>
            }
        </div>
    )
}