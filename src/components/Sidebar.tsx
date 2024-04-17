'use client'


import { sidebarInfo } from '@/data/sidebar'
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React from 'react'

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <main className='sticky top-0 left-0 min-h-screen w-fit justify-between p-2 pt-20
    bg-dark-1 max-sm:hidden'>
      {
        sidebarInfo.map((info)=>{
          const isActive = pathname===info.route || pathname.startsWith(`${info.route}/`);
          return (
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
              width={24}
              height={24}
              />
              <p className='text-sm font-light text-white'>{info.label}</p>
            </Link>
          )
        })
      }

    </main>
  )
}

export default Sidebar