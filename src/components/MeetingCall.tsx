import React from 'react'
import { useToast } from './ui/use-toast';
import Image from 'next/image';
import { avatars } from '@/data/avatar';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

interface MeetingCall {
    icon: string;
    title: string;
    date: string;
    isPreviousMeeting?: boolean;
    buttonIcon?: string;
    buttonText?: string;
    handleClick: () => void;
    link?: string;
}


const MeetingCall = ({ icon, title, date, isPreviousMeeting, buttonIcon, buttonText, link, handleClick }: MeetingCall) => {
    console.log(date)
    const { toast } = useToast();

    return (
        <section className='bg-[#1C1F2E] py-8 px-6 flex flex-col gap-9 items-start justify-center rounded-md'>
            <div>
                <Image
                    src={icon}
                    alt={icon}
                    width={30}
                    height={30}
                />
            </div>

            <div>
                <h3 className='font-bold text-2xl text-[#F5FCFF]'>{title}</h3>
                <p className='font-normal text-lg text-[#ECF0FF]'>{date}</p>
            </div>

            <div className='flex relative justify-between w-full'>
                <div className='flex items-center relative w-fit max-sm:hidden'>
                    {avatars.map((img, index) => (
                        <Image
                            src={img}
                            alt='participants'
                            key={index}
                            width={40}
                            height={40}
                            className={cn("rounded-full", { "absolute": index > 0 })}
                            style={{ top: 0, left: index * 28 }}
                        />
                    ))}
                    <div className='rounded-full bg-[#252A41] text-white text-center grid place-items-center font-semibold text-sm'>
                        +9
                    </div>
                </div>

                {!isPreviousMeeting && (
                    <div className='flex gap-2 items-center'>
                        <Button onClick={handleClick}>
                            {buttonIcon && (
                                <Image src={buttonIcon} alt='feature' width={20} height={20} />
                            )}
                            &nbsp;
                            {buttonText}
                        </Button>

                        <Button
                            onClick={() => {
                                navigator.clipboard.writeText(link || '');
                                toast({ title: "Link copied successfully" })
                            }}
                            className='bg-[#252A41] text-[#C9DDFF] font-semibold text-sm rounded-sm py-2 px-5'
                        >
                            <Image
                                src="/icons/copy.svg"
                                alt='copy icon'
                                width={10}
                                height={10}
                            />
                            &nbsp; Copy Invitation
                        </Button>

                    </div>
                )}

            </div>
        </section>
    )
}

export default MeetingCall