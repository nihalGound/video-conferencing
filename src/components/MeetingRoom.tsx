'use client'

import { cn } from "@/lib/utils";
import {
    CallControls,
    CallParticipantsList,
    CallingState,
    PaginatedGridLayout,
    SpeakerLayout,
    useCallStateHooks,
} from '@stream-io/video-react-sdk';
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Users, LayoutList } from 'lucide-react';
import Loader from "./Loader";
import EndCallForEveryone from "@/components/EndCallForEveryone";


type callLayoutType = 'speaker-left' | 'speaker-right' | 'grid';

const MeetingRoom = () => {
    const router = useRouter();
    const [layout, setLayout] = useState<callLayoutType>('speaker-left');
    const [showParticipant, setShowParticipant] = useState(false);
    const searchParams = useSearchParams();
    const isPersonalMeeting = !!searchParams.get('personal');
    const {useCallCallingState} = useCallStateHooks();

    const callingState = useCallCallingState();
    if(callingState !== CallingState.JOINED) return <Loader />

    const CallLayout = () => {
        switch (layout) {
            case 'grid':
                return <PaginatedGridLayout />
            case 'speaker-right':
                return <SpeakerLayout participantsBarPosition={"left"} />
            default:
                return <SpeakerLayout participantsBarPosition={"right"} />
        }
    }
    return (
        <main className="relative h-screen w-full overflow-hidden pt-4 text-white">
            <div className="relative flex justify-center items-center size-full">
                <div className="flex size-full max-w-[1000px] items-center">
                    <CallLayout />
                </div>
                <div
                    className={cn('h-[calc(100vh-86px)] hidden ml-2', {
                        'show-block': showParticipant,
                    })}
                >
                    <CallParticipantsList onClose={() => setShowParticipant(false)} />
                </div>
            </div>

            <div className="flex w-full bottom-0 absolute items-center justify-center gap-5 flex-wrap">
                <CallControls onLeave={() => router.push('/')} />
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <LayoutList size={20} className="text-white" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="flex flex-col gap-y-2">
                        <DropdownMenuItem onClick={() => setLayout('grid')} className="cursor-pointer hover:bg-slate-300">Grid</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setLayout('speaker-left')} className="cursor-pointer hover:bg-slate-300">Speaker-left</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setLayout('speaker-right')} className="cursor-pointer hover:bg-slate-300">Speaker-right</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <button onClick={() => setShowParticipant(prev => !prev)}>
                    <div className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]  ">
                        <Users size={20} className="text-white" />
                    </div>
                </button>
                {!isPersonalMeeting && <EndCallForEveryone />}
            </div>



        </main>
    )
}

export default MeetingRoom