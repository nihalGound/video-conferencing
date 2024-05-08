'use client'

import { useGetCalls } from '@/hooks/useGetCalls';
import Loader from './Loader';
import MeetingCall from './MeetingCall';

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { Call, CallRecording } from '@stream-io/video-react-sdk';

const CallList = ({ type }: { type: 'previous' | 'upcoming' | 'recordings' }) => {
    const router = useRouter();
    const { endedCalls, upcomingCalls, callRecordings, isLoading } = useGetCalls();
    console.log(endedCalls, upcomingCalls, callRecordings)
    const [recordings, setRecordings] = useState<CallRecording[]>([])

    const getCalls = () => {
        switch (type) {
            case 'previous':
                return endedCalls;
            case 'upcoming':
                return upcomingCalls;
            case 'recordings':
                return recordings;
            default:
                return [];
        }
    };

    const getNoCallMessage = () => {
        switch (type) {
            case 'previous':
                return 'No previous meetings';
            case 'upcoming':
                return 'No upcoming meetings';
            case 'recordings':
                return 'No recordings';
            default:
                return '';
        }
    };

    useEffect(() => {
        const fetchRecordings = async () => {
            const callData = await Promise.all(
                callRecordings?.map(meeting => meeting.queryRecordings()) ?? []
            );

            const recordings = callData
                .filter((call) => call.recordings.length > 0)
                .flatMap(call => call.recordings);

            setRecordings(recordings);
        }

        if (type === 'recordings') {
            fetchRecordings();
        }
    }, [type, callRecordings])

    if (isLoading) return <Loader />;

    const calls = getCalls();
    const noCallsMesssage = getNoCallMessage();

    if(isLoading)return <Loader />

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
            {calls && calls.length > 0 ? (
                calls.map((meeting: Call | CallRecording) => (
                    <MeetingCall
                        key={(meeting as Call).id}
                        icon={
                            type === 'previous'
                                ? '/icons/previous.svg'
                                : type === 'upcoming'
                                    ? '/icons/upcoming.svg'
                                    : '/icons/recordings.svg'
                        }
                        title={
                            (meeting as Call).state?.custom?.description ||
                            (meeting as CallRecording).filename?.substring(0, 20) ||
                            'No Description'
                        }
                        date={
                            (meeting as Call).state?.startsAt?.toLocaleString()||
                            new Date((meeting as CallRecording).start_time).toLocaleString()
                        }
                        isPreviousMeeting={type === 'previous'}
                        link={
                            type === 'recordings'
                                ? (meeting as CallRecording).url
                                : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${(meeting as Call).id}`
                        }
                        buttonIcon={type === 'recordings' ? '/icons/play.svg' : undefined}
                        buttonText={type === 'recordings' ? 'Play' : 'Start'}
                        handleClick={
                            type === 'recordings'
                                ? () => router.push(`${(meeting as CallRecording).url}`)
                                : () => router.push(`/meeting/${(meeting as Call).id}`)
                        }
                    />
                ))
            ) : (
                <h1 className='text-2xl font-bold text-white'>{noCallsMesssage}</h1>
            )}
        </div>
    )
}

export default CallList