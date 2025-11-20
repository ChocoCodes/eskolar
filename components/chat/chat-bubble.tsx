"use client"

type ChatBubbleProps = {
    sender: 'skolar' | 'bot';
    message: string;
}

export function ChatBubble({sender, message}: ChatBubbleProps) {
    const isSkolar = sender === 'skolar';
    const bubbleStyles: string = isSkolar
        ? 'bg-gold rounded-tr-none text-white'
        : 'bg-white rounded-tl-none border border-gray-300';

    return (
        <div className={`w-full flex items-start gap-4 ${isSkolar ? 'justify-end' : 'justify-start'}`}>
            {!isSkolar && (
                <div className='h-10 w-10 rounded-full bg-linear-to-tr from-amber-500 to-yellow-300'></div>
            )}
            <div className={`max-w-5/6 rounded-xl px-4 py-2 ${bubbleStyles}`}>{message}</div>
        </div>
    )
}