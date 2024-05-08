import CallList from '@/components/CallList'
import React from 'react'

const Recordings = () => {
  return (
    <main>
        <div className='text-3xl text-white'>Recordings</div>
        <CallList type='recordings' />
    </main>
  )
}

export default Recordings