import { NextResponse } from "next/server";
import { chatSession } from "../../../configs/AiModel";

export async function POST(req) { 
    try{
        const {prompt}=await req.json();
        const result=await chatSession.sendMessage(prompt);
        const AIResp=result.response.text();

        return NextResponse.json({result:AIResp})
    }catch(e)
    {
        return NextResponse.json({error:e})
    }
}