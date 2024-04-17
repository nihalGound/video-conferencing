'use client'

import { tokenProvider } from '@/actions/stream.actions';
import Loader from '@/components/Loader';
import { useUser } from '@clerk/nextjs';
import {
  StreamVideo,
  StreamVideoClient,
} from '@stream-io/video-react-sdk';
import { ReactNode, useEffect, useState } from 'react';

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;

const StreamVideoProvider = ({ children }: { children: ReactNode }) => {

  const [videoClient, setVideoClient] = useState<StreamVideoClient>(); //to store stream client infromation

  const { user, isLoaded } = useUser(); //this will store logged in user info from clerk, user which is currently loggged in

  useEffect(() => {
    if (!user || !isLoaded) return;
    if (!apiKey) throw new Error("Stream Api key is not avilable")

    const client = new StreamVideoClient({
      apiKey,
      user: {
        name: user.fullName || user.id,
        id: user.id,
        image: user.imageUrl
      },
      tokenProvider
    });
    setVideoClient(client);
  }, [user, isLoaded])


  if (!videoClient) return <Loader />
  return (
    <StreamVideo client={videoClient}>
      {children}
    </StreamVideo>
  );
};

export default StreamVideoProvider; 