/*"use client"
import { MessagesContext } from '@/context/MessagesContext';
import { UserDetailContext } from '@/context/UserDetailContext';
import Colors from '@/data/Colors';
import Lookup from '@/data/Lookup'
import { ArrowRight, Link } from 'lucide-react'
import React, { useContext, useState } from 'react'
import SignInDialog from './SignInDialog';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useRouter } from 'next/navigation';

function Hero() {
    const [userInput, setUserInput] = useState();
    const { messages, setMessages } = useContext(MessagesContext);
    const { userDetail, setUserDetail } = useContext(UserDetailContext);
    const [openDialog, setOpenDialog] = useState(false);
    const CreateWorkspace = useMutation(api.workspace.CreateWorkspace)
    const router = useRouter();
    const onGenerate = async (input) => {
        if (!userDetail?.name) {
            setOpenDialog(true);
            return;
        }
        if (userDetail?.token < 10) {
            toast('You dont have enough token!');
            return;
        }
        const msg = {
            role: 'user',
            content: input
        }
        setMessages(msg);

        const workspaceId = await CreateWorkspace({
            user: userDetail._id,
            messages: [msg]
        });
        console.log(workspaceId);
        router.push('/workspace/' + workspaceId);
    }

    return (
        <div className='flex flex-col items-center mt-28 justify-center gap-2 p-10'>
            <h2 className='font-bold text-4xl'>{Lookup.HERO_HEADING}</h2>
            <p className='text-gray-400 font-medium'>{Lookup.HERO_DESC}</p>
            <div className='p-5 border rounded-xl max-w-xl w-full mt-3 '
                style={{
                    backgroundColor: Colors.BACKGROUND
                }}>
                <div className='flex gap-2 '>
                    <textarea placeholder={Lookup.INPUT_PLACEHOLDER}
                        onChange={(event) => setUserInput(event.target.value)}
                        className='outline-none bg-transparent w-full h-32 max-h-56 resize-none'
                    />
                    {userInput?.length > 0 && <ArrowRight
                        onClick={() => onGenerate(userInput)}
                        className='bg-blue-500 p-2 h-10 w-10 rounded-md cursor-pointer' />}
                </div>
                {/*
                    <div>
                   <Link className='h-5 w-5' />
                </div>
                *}
                
            </div>

            <div className='flex mt-8 flex-wrap max-w-2xl items-center justify-center gap-3'>
                {Lookup?.SUGGSTIONS.map((suggestion, index) => (
                    <h2 key={index}
                        onClick={() => onGenerate(suggestion)}
                        className='p-1 px-2 border rounded-full text-sm
                     text-gray-400 hover:text-white cursor-pointer'
                    >{suggestion}</h2>
                ))}
            </div>
            <SignInDialog openDialog={openDialog}
                closeDialog={(v) => setOpenDialog(v)} />
        </div>
    )
}

export default Hero*/

"use client"
import { MessagesContext } from '@/context/MessagesContext';
import { UserDetailContext } from '@/context/UserDetailContext';
import Colors from '@/data/Colors';
import Lookup from '@/data/Lookup';
import { ArrowRight, Mic } from 'lucide-react'; // ✅ [CHANGED] - Removed Link, added Mic
import React, { useContext, useState } from 'react';
import SignInDialog from './SignInDialog';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useRouter } from 'next/navigation';

function Hero() {
    const [userInput, setUserInput] = useState();
    const { messages, setMessages } = useContext(MessagesContext);
    const { userDetail, setUserDetail } = useContext(UserDetailContext);
    const [openDialog, setOpenDialog] = useState(false);
    const [listening, setListening] = useState(false); // ✅ [ADDED] - Tracks if mic is listening
    const CreateWorkspace = useMutation(api.workspace.CreateWorkspace);
    const router = useRouter();

    // ✅ [UPDATED] - Voice input with auto generate
    const startListening = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert("Speech Recognition not supported in this browser.");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        setListening(true);

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setUserInput(transcript);
            onGenerate(transcript); // ✅ Automatically call generate
            setListening(false);
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            setListening(false);
        };

        recognition.onend = () => {
            setListening(false);
        };

        recognition.start();
    };

    const onGenerate = async (input) => {
        if (!userDetail?.name) {
            setOpenDialog(true);
            return;
        }
        if (userDetail?.token < 10) {
            toast('You dont have enough token!');
            return;
        }
        const msg = {
            role: 'user',
            content: input
        };
        setMessages(msg);

        const workspaceId = await CreateWorkspace({
            user: userDetail._id,
            messages: [msg]
        });
        console.log(workspaceId);
        router.push('/workspace/' + workspaceId);
    };

    return (
        <div className='flex flex-col items-center mt-28 justify-center gap-2 p-10'>
            <h2 className='font-bold text-4xl'>{Lookup.HERO_HEADING}</h2>
            <p className='text-gray-400 font-medium'>{Lookup.HERO_DESC}</p>

            <div className='p-5 border rounded-xl max-w-xl w-full mt-3'
                style={{ backgroundColor: Colors.BACKGROUND }}>
                <div className='flex gap-2'>
                    <textarea
                        placeholder={Lookup.INPUT_PLACEHOLDER}
                        onChange={(event) => setUserInput(event.target.value)}
                        value={userInput}
                        className='outline-none bg-transparent w-full h-32 max-h-56 resize-none'
                    />
                    {userInput?.length > 0 && (
                        <ArrowRight
                            onClick={() => onGenerate(userInput)}
                            className='bg-blue-500 p-2 h-10 w-10 rounded-md cursor-pointer'
                        />
                    )}
                </div>

                {/* ✅ [CHANGED] - Mic icon instead of old link/pin */}
                <div className='mt-2 flex justify-end'>
                    <Mic
                        onClick={startListening}
                        className={`h-5 w-5 cursor-pointer transition-colors duration-200 
                            ${listening ? 'text-red-500 animate-pulse' : 'text-gray-400 hover:text-white'}`}
                        title="Click to speak"
                    />
                </div>
            </div>

            <div className='flex mt-8 flex-wrap max-w-2xl items-center justify-center gap-3'>
                {Lookup?.SUGGSTIONS.map((suggestion, index) => (
                    <h2
                        key={index}
                        onClick={() => onGenerate(suggestion)}
                        className='p-1 px-2 border rounded-full text-sm text-gray-400 hover:text-white cursor-pointer'
                    >
                        {suggestion}
                    </h2>
                ))}
            </div>

            <SignInDialog openDialog={openDialog}
                closeDialog={(v) => setOpenDialog(v)} />
        </div>
    );
}

export default Hero;
