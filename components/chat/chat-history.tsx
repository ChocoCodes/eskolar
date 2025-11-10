'use client'

import Link from "next/link";
import { useChatHistory } from "@/hooks/useChat";
import { ChatHistoryTile } from "@/components/chat/chat-history-tile";
import {SquarePen} from "lucide-react";

export function ChatHistory() {
    const { chatHistory, loading, error } = useChatHistory();

    if (loading) return <p className="text-gray-500 w-full text-center">Loading chat history...</p>;
    if (error) return <p className="text-red-500">Error loading chat history: {error}</p>;

    return (
        <div className="flex flex-col justify-start gap-4 p-4">
            <Link
                href="/chat"
                className="flex justify-start items center gap-4 p-2 rounded-lg border border-gray-300 hover:bg-gold/20 hover:border-gold hover:border-l-4 transition:color duration-200 group"
            >
                <SquarePen className="text-gray-400 group-hover:text-gold" />
                New Chat
            </Link>
            <p className="text-gray-700">Recent</p>
            {chatHistory.length > 0
                ? (chatHistory.map((item) => (
                        <ChatHistoryTile key={item.id} chatItem={item} />
                    )
                ))
                : <p>No chat history available.</p>
            }
        </div>
    )
}