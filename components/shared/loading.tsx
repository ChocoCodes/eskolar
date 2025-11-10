import Image from 'next/image'

export const Loading = () => {
    return (
        <div className="flex h-screen items-center justify-center">
            <div className="relative w-28 h-28">
                <div className="absolute inset-0 rounded-full border-4 border-white border-t-gold animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <Image 
                        src="/eskolar-vertical.png"
                        alt="eSkolar Logo Vertical"
                        width={72}
                        height={72}
                        className='object-contain'
                        priority
                    />
                </div>
            </div>
        </div>
    )
}