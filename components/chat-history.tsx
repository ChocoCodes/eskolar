'use client'

import { useChatHistory } from "@/hooks/useChatHistory";
import { ChatHistoryTile } from "@/components/chat-history-tile";

export function ChatHistory() {
    const { chatHistory, loading, error } = useChatHistory();

    if (loading) return <p>Loading chat history...</p>;
    if (error) return <p className="text-red-500">Error loading chat history: {error}</p>;

    return (
        <div className="flex flex-col justify-start gap-4 p-4">
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