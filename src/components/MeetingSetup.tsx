'use client'

import {
    DeviceSettings,
    VideoPreview,
    useCall,
    useCallStateHooks,
} from '@stream-io/video-react-sdk';
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useRouter } from 'next/navigation';



const MeetingSetup = ({ setIsSetupCompleted }: { setIsSetupCompleted: (value: boolean) => void }) => {
    const router = useRouter();
    const { useCallEndedAt, useCallStartsAt } = useCallStateHooks();
    const callStartAt = useCallStartsAt();
    const callEndedAt = useCallEndedAt();
    const callTimeNotArrived = callStartAt && new Date(callStartAt) > new Date();
    const callHasEnded = !!callEndedAt;


    const call = useCall();

    if (!call) {
        throw new Error('useStreamCall must be used within a StreamCall Component.')
    }

    const [isMicCamtoggled, setIsMicCamToggled] = useState(false); // true => mean cam and mic already on

    useEffect(() => {
        if (isMicCamtoggled) {
            call.camera.disable();
            call.microphone.disable();
        }
        else {
            call.camera.enable();
            call.microphone.enable();
        }
    }, [isMicCamtoggled, call.camera, call.microphone,callHasEnded]);

    if (callTimeNotArrived) return (
        <AlertDialog open={callTimeNotArrived} >
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Meeting is not started yet</AlertDialogTitle>
                    <AlertDialogDescription>
                        {`Meeting will start at ${callStartAt.toLocaleString()}`}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction onClick={()=>router.push('/')}>Go to Home Page</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    );

    if (callHasEnded)
        return (
            <AlertDialog open={callHasEnded} >
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Meeting is Ended by Host</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction onClick={()=>router.push('/')}>Go to Home Page</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
        );

    return (
        <main className='flex w-full h-screen flex-col items-center justify-center gap-3 text-white'>
            <h1 className='text-center text-2xl font-bold'>Setup</h1>
            <VideoPreview />
            <div className='flex h-16 items-center justify-center gap-3'>
                <label>
                    <input type="checkbox"
                        checked={isMicCamtoggled}
                        onChange={(e) => setIsMicCamToggled(e.target.checked)}
                    />
                    Join with camera and mic off
                </label>
                <DeviceSettings />
            </div>
            <Button
                className='rounded-md bg-green-400 px-4 py-2.5'
                onClick={() => {
                    call.join();
                    setIsSetupCompleted(true);
                }}>
                Join meeting
            </Button>
        </main>
    )
}

export default MeetingSetup