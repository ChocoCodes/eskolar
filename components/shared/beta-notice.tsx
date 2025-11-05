import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { IoIosClose } from "react-icons/io";

export const BetaNotice = () => {
    const [visible, setVisible] = useState(false);

    if (!visible) return;

    useEffect(() => {
        const dontShow = localStorage.getItem("dontShow")
        if (!dontShow) {
            setVisible(true)
        }
    }, []);

    const handleDontShow = () => {
        localStorage.setItem("dontShow", "true")
        handleClose()
    }

    const handleClose = () => {
        setVisible(false)
    }

    return (
        <div className='flex w-full bg-gold text-black'>
            <p>
                This is a prototype version of the app. Some features may be incomplete or behave unexpectedly.
                <span><Button className='underline' onClick={ handleDontShow }>Don't show again.</Button></span>
            </p>
            <Button onClick={ handleClose }>
                <IoIosClose />
            </Button>
        </div>
    )
}