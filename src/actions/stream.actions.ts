"use server";

import { currentUser } from "@clerk/nextjs";
import { StreamClient } from '@stream-io/node-sdk';

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const secretKey = process.env.STREAM_SECRET_KEY;

export const tokenProvider = async ()=>{
    try {
        const user = await currentUser();
    
        if(!user)throw new Error("User is not authenticated");
        if(!apiKey)throw new Error("Stream Apie key is not avilable");
        if(!secretKey)throw new Error("Stream secret key is not avilable");
    
        const streamClient = new StreamClient(apiKey,secretKey);
    
        const exp = Math.round(new Date().getTime() / 1000) + 60 * 60;
        const issuedAt = Math.floor(Date.now() / 1000)-60;
    
        const token = streamClient.createToken(user.id,exp,issuedAt);
    
        return token;
    } catch (error) {
        throw new Error("cannot generate stream token");
    }
};