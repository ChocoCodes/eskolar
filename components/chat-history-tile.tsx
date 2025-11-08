'use client'

import Link from "next/link";
import { timeSinceUpdate } from "@/lib/utils";
import {useSearchParams} from "next/navigation";

export function ChatHistoryTile({chatItem}: {chatItem: {id: string, title: string, updated_at: string}}) {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get('sessionId');

    return (
        <Link
            href={`?sessionId=${chatItem.id}`}
            className={
                `border border-gray-300 rounded-md p-4 
                ${sessionId == chatItem.id 
                    ? ' bg-gold/20 border-l-4 border-l-gold' 
                    : ' hover:border-l-4 hover:border-l-gold hover:bg-gold/20 transition:color duration-200'}`
            }
        >
            <div className="flex justify-between items-center">
                <h1 className="font-semibold truncate">{chatItem.title}</h1>
                <p className="font-light text-sm shrink-0 hidden lg:block">{timeSinceUpdate(chatItem.updated_at)}</p>
            </div>
        </Link>
    )
}