import Image from 'next/image';
import React, { ReactNode } from 'react'
import { Avatar, AvatarImage,AvatarFallback } from './ui/avatar';

interface MeetingInfo {
    icon: string;
    title: string;
    date: string;
    time: string;
    children?: ReactNode;
    persons?: string[]
}

const MeetingInfoCard = ({ icon, title, date, time, children, persons }: MeetingInfo) => {

    return (
        <main className='flex flex-col gap-3 px-8 py-6 rounded-md bg-[#1C1F2E] w-full'>
            <div>
                <Image
                    src={icon}
                    height={30}
                    width={30}
                    alt='upcoming-icon'
                />
                <div>
                    <h3 className='text-[#F5FCFF] text-2xl font-bold'>{title}</h3>
                    <div className='flex gap-1.5 text-[#ECF0FF] text-lg font-normal'>
                        <p>{date}</p>
                        <p>{time}</p>
                    </div>
                </div>
            </div>

            {/* <div className='flex justify-between items-center'>
                <div>
                    {persons && persons.length > 0 && persons.map(link=>{
                        <Avatar>
                            <AvatarImage src={link} />
                            <AvatarFallback>avatar</AvatarFallback>
                        </Avatar>

                    })

                    }
                </div>
                <div>
                    {children}
                </div>
            </div> */}
        </main>
    )
}

export default MeetingInfoCard