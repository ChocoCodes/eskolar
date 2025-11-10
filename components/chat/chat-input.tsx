"use client"

import {Input} from "@/components/ui/input";
import {Send} from "lucide-react";
import {useState} from "react";

export function ChatInput({onSubmit}: { onSubmit: (message: string) => void }) {
    const [message, setMessage] = useState("");

    const handleSubmit = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (message.trim()) {
            onSubmit(message);
            setMessage('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex items-center flex-shrink-0 space-x-2 p-4 border border-input rounded-xl shadow-md bg-background w-full h-16 min-h-[4rem]">
            <Input
                type="text"
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask me anything about scholarships..."
                className="flex-grow text-base border-none focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none h-full p-0"
            />
            <button type='submit' className="p-2 cursor-pointer flex justify-cent items-center flex-shrink-0 rounded-full hover:bg-gray-100 transition:color duration-200">
                <Send className="h-5 w-5 text-gold transform fill-gold"/>
            </button>
        </form>
    )
}