'use client'


import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useGetCallById } from '@/hooks/useCallGetById';
import { useUser } from '@clerk/nextjs';
import { useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';
import React from 'react'



const Table = ({title,description}:{title:string; description:string;})=>{
  return (
    <div className='flex w-fit gap-x-5'>
      <h1 className='text-[#C9DDFF] font-normal text-lg'>{title} :</h1>
      <p className='text-white font-bold text-lg'>{description}</p>
    </div>
  )
}

const PersonalRoom = () => {

  const {user} = useUser();
  const router = useRouter();
  const client = useStreamVideoClient();
  const {toast} = useToast();

  const meetingId = user?.id;

  const {call} = useGetCallById(meetingId!);

  const startRoom = async ()=>{
    if(!client || !user)return ;

    const newCall =   client.call('default',meetingId!);
    if(!call){
      await newCall.getOrCreate({
        data:{
          starts_at: new Date().toISOString()
        },
      });
    }

    router.push(`/meeting/${meetingId}?personal=true`);
  };

  const meetinLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingId}?personal=true}`;
  return (
    <main>
      <div className='text-3xl text-white mb-5'>Personal-room</div>
      <div className='flex flex-col items-start gap-8'>
        <Table
        title='Topic'
        description={`${user?.fullName}'s Personal Meeting Room`}
        />
        <Table 
        title='Meeting ID'
        description={meetingId!}
        />
        <Table 
        title='Invite Link'
        description={meetinLink}
        />
        <div>
          <Button className='bg-blue-1 text-white rounded-md text-center' onClick={startRoom}>
            Start Meeting
          </Button>

          <Button 
          onClick={()=>{
            navigator.clipboard.writeText(meetinLink)
            toast({title:"Meeting link copied"})
          }}
          >
            Copy Invitation
          </Button>
        </div>
      </div>
    </main>
  )
}

export default PersonalRoom