import Image from 'next/image'
import React from 'react'
import MobileNav from './MobileNav'
import { UserButton } from '@clerk/nextjs'

const Navbar = () => {
  return (
    <main>
      <div className='flex justify-between items-center w-full bg-dark-1 fixed top-0 p-2 px-6 z-10'>
          <div className='flex justify-between items-center'>
          <Image
          src="./icons/logo.svg"
          alt='yoom-logo'
          height={40}
          width={40}
          />
          <p className='text-xl text-white font-bold max-sm:hidden'>Yoom</p>
          </div>
          
          <div className='flex justify-between items-center gap-x-4'>
          <div className='grid place-items-center bg-blue-2 border-2 border-blue-2'>
            <UserButton />
          </div>
          <MobileNav />
          </div>          
      </div>
    </main>
  )
}

export default Navbar