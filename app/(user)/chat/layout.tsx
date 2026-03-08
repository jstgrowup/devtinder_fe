"use client";
import streamClient from "@/module/chat/utils/stream";
import { Chat } from "stream-chat-react";
import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useAuth } from "@/store/authStore";
import { useChatRoomStore } from "@/store/chat-room-store";
import { useEffect, useRef } from "react";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = useAuth((state) => state);
  const { token, setIsStreamReady } = useChatRoomStore((state) => state);
  const connectionAttempted = useRef(false);
  useEffect(() => {
    if (!user?._id || !token || connectionAttempted.current) return;

    let mounted = true;
    connectionAttempted.current = true;

    const connectUser = async () => {
      try {
        if (streamClient.userID) {
          await streamClient.disconnectUser();
        }

        await streamClient.connectUser(
          {
            id: user._id,
            name: user.firstName,
            image: user.photoUrl,
          },
          token,
        );

        setIsStreamReady(true);
      } catch (err) {
        if (mounted) {
          setIsStreamReady(false);
        }
        connectionAttempted.current = false;
      }
    };

    connectUser();

    return () => {
      mounted = false;
    };
  }, [user?._id, token, setIsStreamReady]);
  return (
    <Chat client={streamClient}>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "19rem",
          } as React.CSSProperties
        }
      >
        <AppSidebar />
        <SidebarInset className="h-screen overflow-hidden">
          <header className="flex h-16 shrink-0 items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0 overflow-hidden h-full">
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </Chat>
  );
}
