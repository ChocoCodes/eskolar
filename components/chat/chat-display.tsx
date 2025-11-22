'use client'

import { useSearchParams } from 'next/navigation';
import { useChatMessages, useCreateChatSession, useSendMessage } from '@/hooks/useChat';
import { ChatInput } from "@/components/chat/chat-input";
import { ChatMessagesDisplay } from "@/components/chat/chat-messages-display";
import { useRouter } from 'next/navigation';
import { Message } from '@/lib/utils';
import { useEffect, useRef } from 'react';

export function ChatDisplay({ name }: { name: string }) {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get('sessionId');
    const { createChatSession, error } = useCreateChatSession();
    const { messages, setMessages, loading } = useChatMessages(sessionId || "");
    const { sendMessage, loading: isBotTyping, error: botError } = useSendMessage();
    const router = useRouter();
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!loading) {
            bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, loading]);
    
    if (loading) return <p className="text-gray-500 w-full text-center">Loading messages...</p>;
    if (error) return <p className="text-red-500">An error occurred: {error}</p>;
    
    const handleInitialSubmit = async (message: string) => {
        //if messaging from no session, create a new session
        const newSessionId = await createChatSession(message);

        if (newSessionId) {
            router.push(`?sessionId=${newSessionId}`);
        }
    }

    const handleSubmit = async (message: string) => {
        if (!sessionId) return;
        // Update the user message for the UI first
        setMessages(prev => [
            ...prev,
            {
                id: crypto.randomUUID(), // temporary only for tracking
                session_id: sessionId,
                sender: 'skolar',
                message: message,
                sent_at: new Date().toISOString()
            }
        ])

        const botResponse: Message = await sendMessage(sessionId, message);
        if (botResponse) {
            setMessages(prev => [...prev, botResponse]);
        }
        console.log(message);
    }

    return (
        <div className="h-full flex flex-col">
            {!sessionId
                ?
                <div className="flex-1 flex flex-col justify-center items-center gap-6 w-1/2 mx-auto pb-24">
                    <h1 className="text-4xl font-semibold text-gold">Hello, { name }</h1>
                    <ChatInput onSubmit={ handleInitialSubmit }/>
                </div>
                :
                <div className="h-full flex flex-col w-1/2 mx-auto pt-4 pb-8">
                    <div className="flex-1 min-h-0 mb-4">
                        { messages.length === 0 && (
                            <p className="text-gray-500 w-full text-center mt-4">
                                No messages yet. Start the conversation!
                            </p>
                        )}
                        <ChatMessagesDisplay messages={ messages } isBotTyping={ isBotTyping } botError={ botError } ref={bottomRef}/>
                    </div>
                    <div className="shrink-0">
                        <ChatInput onSubmit={ handleSubmit }/>
                    </div>
                </div>
            }
        </div>
    )
}