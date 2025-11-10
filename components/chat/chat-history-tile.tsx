'use client'

import Link from "next/link";
import { timeSinceUpdate } from "@/lib/utils";
import {useSearchParams} from "next/navigation";

type ChatHistoryTileProps = {
    chatItem: {
        id: string;
        title: string;
        updated_at: string;
    };
}

export function ChatHistoryTile({chatItem}: ChatHistoryTileProps) {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get('sessionId');

    return (
        <Link
            href={`?sessionId=${chatItem.id}`}
            className={
                `border rounded-md p-4 
                ${sessionId == chatItem.id 
                    ? ' bg-gold/20 border-l-4 border-gold' 
                    : ' border-gray-300 hover:border-l-4 hover:border-gold hover:bg-gold/20 transition:color duration-200'}`
            }
        >
            <div className="flex justify-between items-center">
                <h1 className="font-semibold truncate">{chatItem.title}</h1>
                <p className="font-light text-sm shrink-0 hidden lg:block">{timeSinceUpdate(chatItem.updated_at)}</p>
            </div>
        </Link>
    )
}