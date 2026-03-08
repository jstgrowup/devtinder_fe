"use client";
import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { ChannelList } from "stream-chat-react";
import { ChannelSort } from "stream-chat";
import { useAuth } from "@/store/authStore";
import { useChatRoomStore } from "@/store/chat-room-store";
import streamClient from "@/module/chat/utils/stream";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth((state) => state);
  const { isStreamReady } = useChatRoomStore();
  const [connectionId, setConnectionId] = React.useState<string | null>(null);
  const filters = React.useMemo(() => {
    if (!user?._id) return null;
    return {
      type: "messaging",
      members: { $in: [user._id] },
    };
  }, [user?._id]);
  const options = { presence: true, state: true, watch: true, limit: 10 };
  const sort: ChannelSort = {
    last_message_at: -1,
  };
  React.useEffect(() => {
    const checkConnection = setInterval(() => {
      const wsConnection = streamClient.wsConnection;
      if (wsConnection?.isHealthy && wsConnection.connectionID) {
        setConnectionId(wsConnection.connectionID);
      } else {
        setConnectionId(null);
      }
    }, 1000);

    return () => clearInterval(checkConnection);
  }, []);
  const shouldRenderChannels =
    isStreamReady &&
    filters &&
    connectionId &&
    streamClient.wsConnection?.isHealthy;

  return (
    <Sidebar variant="floating" {...props}>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="gap-2">
            {!user?._id ? (
              <div className="p-4 text-sm text-muted-foreground">
                Please log in
              </div>
            ) : !shouldRenderChannels ? (
              <div className="p-4 text-sm text-muted-foreground">
                {!connectionId
                  ? "Establishing connection..."
                  : "Loading channels..."}
              </div>
            ) : (
              <ChannelList
                filters={filters}
                sort={sort}
                options={options}
                setActiveChannelOnMount={false}
              />
            )}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
