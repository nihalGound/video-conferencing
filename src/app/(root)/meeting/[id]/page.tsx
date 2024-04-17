'use client'

import MeetingRoom from '@/components/MeetingRoom';
import MeetingSetup from '@/components/MeetingSetup';
import { useUser } from '@clerk/nextjs'
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
import React, { useState } from 'react'
import {useGetCallById}  from '@/hooks/useCallGetById';
import Loader from '@/components/Loader';
import { Alert } from "@/components/ui/alert"


function page({ params : {id} }: { params: { id: string } }) {
  const {user,isLoaded} = useUser();
  const [isSetupCompleted,setIsSetupCompleted] = useState<boolean>(false);
  const {call,isCallLoading} = useGetCallById(id);

  if (!call) return (
    <p className="text-center text-3xl font-bold text-white">
      Call Not Found
    </p>
  );

  const notAllowed = call.type === 'invited' && (!user || !call.state.members.find((m) => m.user.id === user.id));

  if (notAllowed) return <Alert title="You are not allowed to join this meeting" />;

  if(!isLoaded || isCallLoading) return <Loader />

  return (
    <main>
        <StreamCall call={call}>
          <StreamTheme>
            {!isSetupCompleted ? (
              <MeetingSetup setIsSetupCompleted={setIsSetupCompleted} />
            ):(
              <MeetingRoom />
            )

            }
          </StreamTheme>
        </StreamCall>
    </main>
  )
}

export default page