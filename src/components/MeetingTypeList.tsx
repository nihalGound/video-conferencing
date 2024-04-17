'use client'

import { useRouter } from "next/navigation";
import MeetingType from "./MeetingType"
import { useState } from "react"
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useToast } from "@/components/ui/use-toast"


const initalValues = {
  dateTime:new Date(),
  description:'',
  link:''
}


const MeetingTypeList = () => {
  const router = useRouter();
  const [meetingState,setMeetingState] = useState<'isCreateMeeting'|'isJoinMeeting'|'isScheduleMeeting'|undefined>();
  const [callDetails,setCallDetails] = useState<Call>()
  const [values,setValues] = useState(initalValues);
  const {user} = useUser();
  const client = useStreamVideoClient();
  const { toast } = useToast()

    const createMeeting = async()=>{
        if(!user || !client)return ;

        try {
          const callId = crypto.randomUUID();
          const call = client.call('default',callId);
          if(!call)throw new Error("failed to create a meeting");
          const startAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();
          const description = values.description || 'Instant meeting';
          await call.getOrCreate({
            data:{
              starts_at:startAt,
              custom:{
                description
              }
            }
          });
          setCallDetails(call);

          if(!values.description){
            router.push(`/meeting/${call.id}`);
          }
          toast({title:'Meeting created successfully'});

        } catch (error) {
          console.log(error)
          toast({title:"failed to create meeting"});
        }
    }
  return (
    <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-2 place-items-center w-full gap-y-4">

        <MeetingType
        icon="./icons/add-meeting.svg"
        title="New Meeting"
        subtitle="Set up a new recording"
        classname="bg-[#FF742E] hover:bg-[#ff742ee8]"
        onclick={()=>setMeetingState("isCreateMeeting")}
        />
        <MeetingType 
        icon="./icons/join-meeting.svg"
        title="Join Meeting"
        subtitle="via invitation link"
        classname="bg-[#0E78F9] hover:bg-[#0e78f9eb]"
        onclick={()=>setMeetingState("isJoinMeeting")}
        />
        <MeetingType 
        icon="./icons/schedule.svg"
        title="Schedule Meeting"
        subtitle="Plan your meeting"
        classname="bg-[#830EF9] hover:bg-[#830ef9eb]"
        onclick={()=>setMeetingState("isScheduleMeeting")}
        />
        <MeetingType
        icon="./icons/recordings.svg"
        title="View Recordings"
        subtitle="Meeting recordings"
        classname="bg-[#F9A90E] hover:bg-[#f9ab0ee7]"
        onclick={()=>router.push('/Recordings')}
        />

        <MeetingModal
        title="Start an instant Meeting"
        classname="text-center"
        buttonText = "Start meeting"
        handleClick = {createMeeting}
        isOpen={meetingState==="isCreateMeeting"}
        onClose = {()=>setMeetingState(undefined)}
        />

    </main>
  )
}

export default MeetingTypeList