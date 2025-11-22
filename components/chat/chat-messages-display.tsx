"use client"

import { Message } from "@/lib/utils";
import { ChatBubble, TypingIndicatorBubble } from "@/components/chat/chat-bubble";

interface ChatMessageDisplayProps {
    messages: Message[];
    isBotTyping: boolean;
    botError: string | null;
    ref: React.RefObject<HTMLDivElement | null>;
}

export function ChatMessagesDisplay({ messages, isBotTyping, botError, ref }: ChatMessageDisplayProps) {

    return (
        <div className="w-full h-full flex flex-col gap-4 overflow-y-auto">
            {messages.map((message, index) => (
                <ChatBubble key={ index } sender={ message.sender } message={ message.message } />
            ))}
            {isBotTyping && (
               <TypingIndicatorBubble />
            )}
            {botError && (
                <ChatBubble sender="bot" message={ botError ? botError : 'eSBot encountered an unknown error.'} />
            )}
            <div ref={ ref } className="h-0"></div>
        </div>
    )
}