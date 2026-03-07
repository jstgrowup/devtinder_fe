"use client";
import streamClient from "@/module/chat/utils/stream";
import { Chat } from "stream-chat-react";

import { AppSidebar } from "@/components/app-sidebar";

// import "stream-chat-react/dist/css/v2/index.css";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
