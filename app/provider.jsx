"use client"
import React, { useState, useEffect } from 'react'
import { ThemeProvider as NextThemesProvider } from "next-themes"
import Header from '@/components/custom/Header'
import { MessagesContext } from './../context/MessageContext';
import { UserDetailContext } from './../context/UserDetailsContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { api } from "../convex/_generated/api";
import { useConvex } from 'convex/react';

function Provider ({children})
{
  const[messages,setMessages]=useState([]);
  const[userDetail, setUserDetail]= useState();
  const convex = useConvex();

const IsAutheicated = async () => {
    if (typeof window !== "undefined") {
        const user = JSON.parse(localStorage.getItem("user") || "null");
        if (!user) return; // Exit if no user found

        try {
            // Fetch user data from Convex DB
            const result = await convex.query(api.users.GetUser, {
                email: user.email,
            });
            setUserDetail(result);
            console.log("User data from DB:", result);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    }
};

// Run on component mount
useEffect(() => {
    IsAutheicated();
}, []);


  return (
    <div>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID_KEY}>
      <UserDetailContext.Provider value={{userDetail, setUserDetail}}>
      <MessagesContext.Provider value={{messages, setMessages}}>
        <NextThemesProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
        >
          <Header/>
          {children}  
        </NextThemesProvider>
        </MessagesContext.Provider>
        </UserDetailContext.Provider>
        </GoogleOAuthProvider>;
    </div>
  )
}

export default Provider