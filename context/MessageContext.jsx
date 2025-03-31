"use client"; 
import { createContext, useState } from "react";

export const MessagesContext = createContext(null); 

export const MessagesProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  return (
    <MessagesContext.Provider value={{ messages, setMessages }}>
      {children}
    </MessagesContext.Provider>
  );
};
