"use client";
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { IoIosClose } from "react-icons/io";

export const BetaNotice = () => {
    const [visible, setVisible] = useState(false);

    
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
    
    if (!visible) return;

    return (
        <div className='flex items-center justify-center w-full bg-gold text-black text-sm py-2'>
            <div className='flex items-center justify-center w-4/5 mx-auto'>
                <p>
                    This is a prototype version of the app. Some features may be incomplete or behave unexpectedly.
                    <span><Button variant="ghost" className='underline -ml-3 hover:cursor-pointer hover:bg-transparent active:bg-transparent focus:outline-none' onClick={ handleDontShow }>Don't show again.</Button></span>
                </p>
                <Button variant="ghost" className='underline -ml-3 hover:cursor-pointer hover:bg-transparent active:bg-transparent focus:outline-none' onClick={ handleClose }>
                    <IoIosClose />
                </Button>
            </div>
        </div>
    )
}