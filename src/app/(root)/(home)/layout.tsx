import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import React, { ReactNode } from 'react'

function layout({children}:{children:ReactNode}) {
  return (
    <main className='relative overflow-x-hidden'>
        <Navbar/>
        <div className='flex'>
            <Sidebar/>
            <section className='flex flex-col flex-1 min-h-screen px-6 pb-6 pt-20'>
                <div className='w-full'>
                    {children}
                </div>
            </section>
        </div>
    </main>
  )
}

export default layout