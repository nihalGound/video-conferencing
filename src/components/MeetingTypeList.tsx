'use client'

import { useRouter } from "next/navigation";
import MeetingType from "./MeetingType"
import { useState } from "react"
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useToast } from "@/components/ui/use-toast"
import { Textarea } from "@/components/ui/textarea"
import DatePicker from "react-datepicker";
import { Input } from "./ui/input";


const initalValues = {
  dateTime: new Date(),
  description: '',
  link: ''
}


const MeetingTypeList = () => {
  const router = useRouter();
  const [meetingState, setMeetingState] = useState<'isCreateMeeting' | 'isJoinMeeting' | 'isScheduleMeeting' | undefined>();
  const [callDetails, setCallDetails] = useState<Call>()
  const [values, setValues] = useState(initalValues);
  const { user } = useUser();
  const client = useStreamVideoClient();
  const { toast } = useToast()

  const createMeeting = async () => {
    if (!client || !user) return;

    try {
      if (!values.dateTime) {
        toast({ title: 'Please select a date and time' });
        return;
      }
      const callId = crypto.randomUUID();
      const call = client.call('default', callId);
      if (!call) throw new Error("failed to create a meeting");
      const startAt = meetingState==="isCreateMeeting" ? new Date(Date.now()).toISOString() : values.dateTime.toISOString();
      const description = values.description || 'Instant meeting';
      await call.getOrCreate({
        data: {
          starts_at: startAt,
          custom: {
            description
          }
        }
      });
      setCallDetails(call);
      toast({ title: 'Meeting created successfully' });
      if(startAt > new Date(Date.now()).toISOString())return ;

      if (!values.description || values.description.length==0) {
        router.push(`/meeting/${call.id}`);
      }

    } catch (error) {
      console.log(error)
      toast({ title: "failed to create meeting" });
    }
  }

  const meetinLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`;
  return (
    <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-2 place-items-center w-full gap-y-4">

      <MeetingType
        icon="./icons/add-meeting.svg"
        title="New Meeting"
        subtitle="Set up a new recording"
        classname="bg-[#FF742E] hover:bg-[#ff742ee8]"
        onclick={() => setMeetingState("isCreateMeeting")}
      />
      <MeetingType
        icon="./icons/join-meeting.svg"
        title="Join Meeting"
        subtitle="via invitation link"
        classname="bg-[#0E78F9] hover:bg-[#0e78f9eb]"
        onclick={() => setMeetingState("isJoinMeeting")}
      />
      <MeetingType
        icon="./icons/schedule.svg"
        title="Schedule Meeting"
        subtitle="Plan your meeting"
        classname="bg-[#830EF9] hover:bg-[#830ef9eb]"
        onclick={() => setMeetingState("isScheduleMeeting")}
      />
      <MeetingType
        icon="./icons/recordings.svg"
        title="View Recordings"
        subtitle="Meeting recordings"
        classname="bg-[#F9A90E] hover:bg-[#f9ab0ee7]"
        onclick={() => router.push('/Recordings')}
      />

      {!callDetails ? (
        <MeetingModal
          title="Create Meeting"
          classname="text-center"
          buttonText="Create meeting"
          handleClick={createMeeting}
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setMeetingState(undefined)}
        >
          <div className="flex flex-col gap-2.5">
            <label className="text-base font-normal leading-[22.4px] text-sky-2">
              Add a description
            </label>
            <Textarea
              className="border-none bg-[#252A41] focus-visible:ring-0 focus-visible:ring-offset-0"
              onChange={(e) =>
                setValues({ ...values, description: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col w-full gap-2.5">
            <label className="text-[#ECF0FF] text-sm">
              Select date and time
            </label>
            <DatePicker
              selected={values.dateTime}
              onChange={(date) => setValues({ ...values, dateTime: date! })}
              showTimeSelect
              timeIntervals={15}
              timeFormat="HH:mm"
              timeCaption="Time"
              dateFormat="MMMM d, yyyy h:mm aa"
              className="outline-none focus:outline-none bg-[#252A41] focus:border-none rounded-md cursor-pointer"
            />
          </div>

        </MeetingModal>
      ) : (
        <MeetingModal
          title="Meeting Created"
          classname="text-center"
          buttonText="Copy"
          handleClick={() => {
            navigator.clipboard.writeText(meetinLink);
            toast({ title: 'Link copied' })
          }
          }
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => {
            setMeetingState(undefined)
            setCallDetails(undefined);
          }}
          image={'/icons/checked.svg'}
          buttonIcon="/icons/copy.svg"
        >

        </MeetingModal>
      )}

      <MeetingModal
        isOpen={meetingState === 'isJoinMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Type the link here"
        classname="text-center"
        buttonText="Join Meeting"
        handleClick={() =>{
          router.push(values.link)
        }}
      >
        <Input
          placeholder="Meeting link"
          onChange={(e) => setValues({ ...values, link: e.target.value })}
          className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0 text-black"
        />
      </MeetingModal>

      <MeetingModal
        title="Start an instant Meeting"
        classname="text-center"
        buttonText="Start meeting"
        handleClick={createMeeting}
        isOpen={meetingState === "isCreateMeeting"}
        onClose={() => setMeetingState(undefined)}
      />

    </main>
  )
}

export default MeetingTypeList