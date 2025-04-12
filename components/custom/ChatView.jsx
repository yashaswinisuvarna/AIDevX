"use client";

import React, { useContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useConvex, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { MessagesContext } from "@/context/MessageContext";
import { UserDetailContext } from "@/context/UserDetailsContext";
import Image from "next/image";
import axios from "axios";
import Colors from "@/data/Colors";
import { ArrowRight, Link, Loader2Icon } from "lucide-react";
import Lookup from "@/data/Lookup";
import ReactMarkdown from 'react-markdown'
import { Prompt } from '@/data/Prompt';
import { UpdateMessages } from './../../convex/workspace';


const ChatView = () => {
  const params = useParams();
  const convex = useConvex();
  const {userDetail,setUserDetail}=useContext(UserDetailContext);
  const { messages, setMessages } = useContext(MessagesContext);
  const [userInput,setUserInput]=useState();
  const [loading,setLoading]=useState(false);
  const [workspaceId, setWorkspaceId] = useState(null);
  const UpdateMessages=useMutation(api.workspace.UpdateMessages)

  const Prompt = {
    CHAT_PROMPT:
      "\nThe following is a conversation between a user and an AI assistant. Provide a relevant AI response to the last user message.",
  };

  useEffect(() => {
    if (params?.id) {
      GetWorkspaceData();
    }
  }, [params]);

  const GetWorkspaceData = async () => {
    const id = params.id;
    const workspaceId = Array.isArray(id) ? id[0] : id;

    if (!workspaceId) return;
    setWorkspaceId(workspaceId);

    const result = await convex.query(api.workspace.GetWorkspace, {
      workspaceId,
    });

    console.log("Workspace result:", result);
    setMessages(Array.isArray(result?.messages) ? result.messages : []);
  };
  useEffect(()=>{
    if(messages?.length>0)
    {
      const role=messages[messages?.length-1].role;
      if(role=='user'){
        GetAiResponse(workspaceId);
      }
    }
  }, [messages]);

  const GetAiResponse=async()=>{
    setLoading(true);
    const PROMPT=JSON.stringify(messages)+Prompt.CHAT_PROMPT;
    const result=await axios.post('/api/ai-chat',{
      prompt:PROMPT
    });
    console.log(result.data.result);
    const aiResp={
      role:'assistant',
      content:result.data.result
    }
    setMessages(prev=>[...prev,aiResp])
    await UpdateMessages({
      messages:[...messages,aiResp],
      workspaceId:workspaceId
  })
    setLoading(false);
  }
  const onGenerate = (value) => {
    setMessages((prev) => [...prev, { role: "user", content: value }]);
    setUserInput(""); // Fix: Clear input after sending
  };

  return(
    <div className='relative h-[85vh] flex flex-col'>
      <div className='flex-1 overflow-y-scroll'>
        {Array.isArray(messages) &&
          messages.map((msg, index)=>(
          <div key ={index}
          className='p-3 rounded-lg mb-2 flex gap-2 items-start leading-7'
          style={{
            backgroundColor:Colors.CHAT_BACKGROUND
          }}>
            {msg?.role==='user'&&
            <Image src={userDetail?.picture} alt='useImage'
            width={35} height={35} className='rounded-full'/>}

            <ReactMarkdown class>{msg.content}</ReactMarkdown>
          </div>
        ))}
        {loading&&<div className='p-3 rounded-lg mb-2 flex gap-2 items-start'
          style={{
            backgroundColor:Colors.CHAT_BACKGROUND
          }}>
              <Loader2Icon className='animate-spin'/>
              <h2>Generating response...</h2>
          </div>
          }
      </div>
      {/*Input Section*/ }
      <div className='p-5 border rounded-xl max-w-xl w-full mt-3'
        style={{
          backgroundColor:Colors.BACKGROUND
        }}>
        <div className='flex gap-2'>
          <textarea placeholder={Lookup.INPUT_PLACEHOLDER}
          value={userInput}
          onChange={(event)=>setUserInput(event.target.value)}
            className='outline-none bg-transparent w-full h-32 max-h-56 resize-none'
          />
          {userInput&&<ArrowRight 
          onClick={()=>onGenerate(userInput)}
          className='bg-blue-500 p-2 h-10 w-10 rounded-md cursor-pointer'/>}
        </div>
        <div>
            <Link className='h-5 w-5'/>
          </div>
    </div>
    </div>
  )
};

export default ChatView;

