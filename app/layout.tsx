"use client"
import "./globals.css";
import { Inter } from "next/font/google";
import { NuqsAdapter } from 'nuqs/adapters/next/app';

import { ThemeProvider } from "@/providers/theme-provider";
import { QueryProvider } from "@/providers/query-provider";
import { SheetProvider } from "@/providers/sheet-provider";
import { Toaster } from "@/components/ui/sonner"
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import socketIO from "socket.io-client";
import { useQuery } from "@tanstack/react-query";
import { cookies } from "next/headers";
import axios from "axios";
import { useAuthMe } from "@/features/users/api/use-auth-me";
import { useUserStore } from "@/features/users/hooks/use-user-store";
import NextTopLoader from 'nextjs-toploader';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" 
    suppressHydrationWarning={true}>
      <body className={`${inter.className} `}>  {/* overflow-hidden */}
      <NextTopLoader showSpinner={false} />
      <NuqsAdapter>
        <QueryProvider>
          <SheetProvider />
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Toaster />
            <Custom>
              {children}
            </Custom>
          </ThemeProvider>
          <SheetProvider />
        </QueryProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}


// const socketId = socketIO(process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "", { transports: ["websocket"] });

type Props = {
  children: React.ReactNode
}
const Custom = ({ children }: Props) => {
  const { user, setUser } = useUserStore();
  const { data: authUser, isLoading, isSuccess } = useAuthMe();
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    if (authUser && authUser !== user) {  // Ensure user is only set if it changes
      setUser(authUser);
    }
    setUpdate(prev => !prev);
  }, [user, setUser, authUser]);
  // useEffect(() => {
  //   socketId.on("connection", () => { });
  // }, []);
  return <><div>{children} </div></>;
  // return <>{
  //   isLoading ?
  //     <div className="flex items-center justify-center min-h-screen">
  //       <div className="relative flex items-center justify-center">
  //         {/* Grand spinner (sens horaire) */}
  //         <Loader2 className="animate-spin h-12 w-12 border-4 border-t-transparent border-green-500 rounded-full" />
  //       </div>

  //     </div>
  //     : <div>{children} </div>}</>;

};

