"use client"

import { Message } from "@/lib/utils";
import { ChatBubble } from "@/components/chat/chat-bubble";

export function ChatMessagesDisplay({ messages }: { messages: Message[] }) {

    return (
        <div className="w-full h-full flex flex-col gap-4 overflow-y-auto">
            {messages.map((message, index) => (
                <ChatBubble key={ index } sender={ message.sender } message={ message.message } />
            ))}
        </div>
    )
}