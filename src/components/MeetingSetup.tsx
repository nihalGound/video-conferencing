import {
    DeviceSettings,
    VideoPreview,
    useCall,
    useCallStateHooks,
} from '@stream-io/video-react-sdk';
import { useEffect, useState } from 'react';
import { Alert } from './ui/alert';
import { Button } from "@/components/ui/button"


const MeetingSetup = ({setIsSetupCompleted}:{setIsSetupCompleted:(value:boolean)=>void}) => {
    const {useCallEndedAt,useCallStartedAt} = useCallStateHooks();
    const callStartAt = useCallStartedAt();
    const callEndedAt = useCallEndedAt();
    const callTimeNotArrived = callStartAt && new Date(callStartAt) > new Date();
    const callHasEnded = !!callEndedAt;

    const call = useCall();

    if(!call){
        throw new Error('useStreamCall must be used within a StreamCall Component.')
    }

    const [isMicCamtoggled, setIsMicCamToggled] = useState(false); // true => mean cam and mic already on

    useEffect(()=>{
        if(isMicCamtoggled){
            call.camera.disable();
            call.microphone.disable();
        }
        else{
            call.camera.enable();
            call.microphone.enable();
        }
    },[isMicCamtoggled,call.camera,call.microphone]);

    if(callTimeNotArrived)return (
        <Alert title={`Your meeting has not started yet. It is scheduled for ${callStartAt.toLocaleString()}`} />
    );

    if(callHasEnded)
        return (
            <Alert
            title='The call has been ended by host'
            // iconUrl = "/icons/call-ended.svg"
            />
    );

  return (
    <main className='flex w-full h-screen flex-col items-center justify-center gap-3 text-white'>
        <h1 className='text-center text-2xl font-bold'>Setup</h1>
        <VideoPreview />
        <div className='flex h-16 items-center justify-center gap-3'>
            <label>
                <input type="checkbox" 
                checked={isMicCamtoggled}
                onChange={(e)=>setIsMicCamToggled(e.target.checked)}
                />
                Join with camera and mic off
            </label>
            <DeviceSettings />
        </div>
        <Button
        className='rounded-md bg-green-400 px-4 py-2.5'
        onClick={()=>{
            call.join();
            setIsSetupCompleted(true);
        }}>
            Join meeting
        </Button>
    </main>
  )
}

export default MeetingSetup