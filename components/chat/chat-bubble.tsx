"use client"
import ReactMarkdown from 'react-markdown';

type ChatBubbleProps = {
    sender: 'skolar' | 'bot';
    message: string;
}

export const TypingIndicatorBubble = () => {
    return (
        <div className="w-full flex items-start gap-4 justify-start">
            <div className="w-[70px]">
                <div className="typing-indicator w-full flex mx-auto justify-between rounded-xl items-center px-4 py-3 bg-white rounded-tl-none border border-gray-300">
                    <div className="dot dot-1 w-2 h-2 bg-gray-500 rounded-full"></div>
                    <div className="dot dot-2 w-2 h-2 bg-gray-500 rounded-full"></div>
                    <div className="dot dot-3 w-2 h-2 bg-gray-500 rounded-full"></div>
                </div>
            </div>
        </div>
    )
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
            <div className={`prose prose-sm wrap-break-word max-w-5/6 rounded-xl px-4 py-2 ${bubbleStyles}`}>
                {isSkolar ? <p>{ message }</p> : (
                    <ReactMarkdown
                        components={{
                            ol: ({ node, ...props }) => <ol className="list-decimal pl-4 my-1 space-y-0.5" {...props} />,
                            ul: ({ node, ...props }) => <ul className="list-disc pl-4 my-1 space-y-0.5" {...props} />,
                            li: ({ node, ...props }) => <li className="m-0" {...props} />,
                            a: ({ node, ...props }) => <a className="text-blue-600 underline hover:text-blue-700" target="_blank" rel="noreferrer" {...props} />,
                        }}
                    >
                        { message }
                    </ReactMarkdown>
                    )
                }
            </div>
        </div>
    )
}