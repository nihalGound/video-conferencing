import React, { ReactNode } from 'react'

import {
    Dialog,
    DialogContent,
  } from "@/components/ui/dialog"
  

interface MeetingModalProps{
    title:string;
    classname:string;
    buttonText:string;
    handleClick:()=>void;
    isOpen:boolean;
    onClose:()=>void;
    children?:ReactNode;
}


const MeetingModal = ({title,classname,buttonText,handleClick,isOpen,onClose,children}:MeetingModalProps) => {
  return (
    <main>
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className={`${classname} flex flex-col items-center text-white justify-between bg-dark-2 border-none outline-none`}>
                <h1 className='text-xl text-white font-normal'>{title}</h1>
                {children}
                <button onClick={handleClick} className='bg-blue-1 text-white w-full text-center p-3 rounded-md
                border-none outline-none hover:bg-blue-500  duration-75 transition-all'>{buttonText}</button>
            </DialogContent>
        </Dialog>

    </main>
  )
}

export default MeetingModal