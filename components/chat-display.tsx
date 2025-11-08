'use client'

import { useSearchParams } from 'next/navigation';

export function ChatDisplay() {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get('sessionId');

    return (
        <div className="w-1/2 mx-auto bg-red-500">
            { sessionId ? (<p>Chat Session ID: { sessionId }</p>) : (<p>No Chat Session Selected</p>) }
        </div>
    )
}