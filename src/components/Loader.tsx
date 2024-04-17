import Image from 'next/image'
import React from 'react'

const Loader = () => {
  return (
    <main className='w-full h-screen flex justify-center items-center'>
        <Image
        src="./icons/loading-circle.svg"
        height={50}
        width={50}
        alt='loading'
        />
    </main>
  )
}

export default Loader