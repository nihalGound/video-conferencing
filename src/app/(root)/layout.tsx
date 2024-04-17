import StreamVideoProvider from '@/Providers/StreamProvider'
import React, { ReactNode } from 'react'

function layout({children}:{children:ReactNode}) {
  return (
    <main>
        <StreamVideoProvider>
          {children}
        </StreamVideoProvider>
    </main>
  )
}

export default layout