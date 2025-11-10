"use client"

import { useChatMessages } from "@/hooks/useChat";
import { ChatBubble } from "@/components/chat/chat-bubble";

export function ChatMessagesDisplay({sessionId}: { sessionId: string }) {
    const { messages, loading, error } = useChatMessages(sessionId);

    if (loading) return <p className="text-gray-500 w-full text-center">Loading messages...</p>;
    if (error) return <p className="text-red-500">An error occurred: {error}</p>;
    if (messages.length < 1) return <p className="text-gray-500 w-full text-center">No messages yet. Start the conversation!</p>;

    return (
        <div className="w-full h-full flex flex-col gap-4 overflow-y-auto">
            {messages.map((message) => (
                <ChatBubble key={message.id} sender={message.sender} message={message.message} />
            ))}
        </div>
    )
}