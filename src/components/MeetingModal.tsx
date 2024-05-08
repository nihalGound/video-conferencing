import React, { ReactNode } from 'react'
import Image from 'next/image';

import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import { Button } from './ui/button';


interface MeetingModalProps {
  title: string;
  classname: string;
  buttonText: string;
  handleClick: () => void;
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
  buttonIcon?: string;
  image?: string;
}


const MeetingModal = ({ title, classname, buttonText, handleClick, isOpen, onClose, children, buttonIcon, image }: MeetingModalProps) => {
  return (
    <main>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className={` flex flex-col  w-full text-white justify-between bg-dark-2 border-none outline-none`}>
          {image && (
            <div className="flex justify-center">
              <Image src={image} alt="checked" width={72} height={72} />
            </div>
          )}
          <h1 className='text-xl text-white font-normal text-center'>{title}</h1>
          {children}
          <Button
            className={
              "bg-blue-1 focus-visible:ring-0 focus-visible:ring-offset-0"
            }
            onClick={handleClick}
          >
            {buttonIcon && (
              <Image
                src={buttonIcon}
                alt="button icon"
                width={13}
                height={13}
              />
            )}{" "}
            &nbsp;
            {buttonText || "Schedule Meeting"}
          </Button>
        </DialogContent>
      </Dialog>

    </main>
  )
}

export default MeetingModal