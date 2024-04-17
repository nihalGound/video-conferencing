'use client'

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import { sidebarInfo } from "@/data/sidebar"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"


import React from 'react'

const MobileNav = () => {
    const pathname = usePathname();
    return (
        <main className="sm:hidden">
            <Sheet>
                <SheetTrigger>
                    <Image
                        src="./icons/hamburger.svg"
                        alt="hamburger"
                        height={30}
                        width={30}
                        className="text-white text-center"
                    />
                </SheetTrigger>
                <SheetContent side={"left"} className="bg-dark-1 border-none">
                    <Link href="/">
                        <div className='flex  items-center'>
                            <Image
                                src="./icons/logo.svg"
                                alt='yoom-logo'
                                height={40}
                                width={40}
                            />
                            <p className='text-xl text-white font-bold'>Yoom</p>
                        </div>
                    </Link>

                    <div className="overflow-y-auto flex flex-col justify-between h-[calc(100vh-72px)]">
                        <SheetClose asChild>
                            <section className="flex flex-col h-full gap-6 pt-16 text-white">
                            {
                                sidebarInfo.map((info)=>{
                                const isActive = pathname===info.route || pathname.startsWith(`${info.route}/`);
                                return (
                                    <SheetClose asChild key={info.label}>
                                        <Link
                                            href={info.route}
                                            key={info.label}
                                            className={cn('flex items-center  text-white gap-4 rounded-lg p-4 justify-start',{
                                            'bg-blue-1':isActive,
                                            })}
                                            >
                                            <Image
                                            src={info.imageUrl}
                                            alt={info.label}
                                            width={20}
                                            height={20}
                                            />
                                            <p className='text-sm font-light text-white'>{info.label}</p>
                                        </Link>
                                    </SheetClose>
                                )
                                })
                            }
                            </section>


                        </SheetClose>


                    </div>

                </SheetContent>
            </Sheet>
        </main>
    )
}

export default MobileNav