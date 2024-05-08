'use client'

import CallList from '@/components/CallList';
import { useGetCalls } from '@/hooks/useGetCalls'
import { Loader } from 'lucide-react';
import React from 'react'

const Upcoming = () => {

  const {upcomingCalls,isLoading} = useGetCalls();

  if(isLoading)return <Loader />
  return (
    <main>
      <CallList type='upcoming' />
    </main>
  )
}

export default Upcoming