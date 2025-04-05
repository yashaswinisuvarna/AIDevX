 "use client";
 import { ConvexProvider, ConvexReactClient } from 'convex/react';
import React from 'react';

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

if (!convexUrl) {
  throw new Error("NEXT_PUBLIC_CONVEX_URL is not defined in .env.local");
}

const convex = new ConvexReactClient(convexUrl);

const ConvexClientProvider = ({ children }) => {
  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
};

export default ConvexClientProvider;
