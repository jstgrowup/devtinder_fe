"use client";

import "stream-chat-react/dist/css/v2/index.css";
import { useAuth } from "@/store/authStore";
import { useChatRoomStore } from "@/store/chat-room-store";
import streamClient from "../utils/stream";
import React, { useEffect } from "react";
import { openErrorToast } from "../../../components/common/Toast";
import {
  Channel,
  ChannelHeader,
  MessageInput,
  MessageList,
  Thread,
  useChatContext,
  Window,
} from "stream-chat-react";
import { Button } from "@/components/ui/button";
import { LogOutIcon, VideoIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { routes } from "@/config/routes";

const ChatTemplate = () => {
  const { user } = useAuth((state) => state);
  const { channel, setActiveChannel } = useChatContext();
  const router = useRouter();
  const { token, roomId, toUserId } = useChatRoomStore((state) => state);
  const displayUserName = React.useMemo(() => {
    if (!channel || !user?._id) return "Chat";

    const members = Object.values(channel.state.members).filter(
      (m) => m.user?.id !== user._id,
    );

    if (members.length === 1) {
      return members[0].user?.name || members[0].user?.id || "Unknown User";
    }

    return "No members";
  }, [channel, user?._id]);
  const initializeChat = async () => {
    if (!user?._id || !toUserId || !roomId) return;

    try {
      const newChannel = streamClient.channel("messaging", roomId, {
        members: [user._id, toUserId],
      });
      await newChannel.watch();
      setActiveChannel(newChannel);
    } catch (error) {
      openErrorToast({ message: `Failed to start chat: ${error}` });
    }
  };

  useEffect(() => {
    if (channel) return;
    if (!user?._id || !token || !toUserId || !roomId) return;

    const tryInit = async () => {
      if (!streamClient.userID) return;
      await initializeChat();
    };

    tryInit();
  }, [user?._id, token, toUserId, roomId, setActiveChannel]);
  const handleCall = () => {
    if (!channel) return;
    router.push(routes.videoCall(channel.id ?? ""));
  };
  const handleLeaveChat = async () => {
    if (!channel || !user?._id) return;

    try {
      await channel.removeMembers([user._id]);

      setActiveChannel(undefined);

      router.push(routes.connections);
    } catch (error) {
      openErrorToast({ message: `Error leaving chat: ${error}` });
    }
  };
  return (
    <div className="flex flex-col w-full flex-1 h-full">
      {channel ? (
        <Channel>
          <Window>
            <div className="flex flex-col h-full w-full overflow-hidden">
              {/* Header - fixed height */}
              <div className="flex items-center justify-between shrink-0">
                {channel.data?.member_count === 1 ? (
                  <ChannelHeader title="everyone else left the chat" />
                ) : (
                  <ChannelHeader title={displayUserName} />
                )}
                <div className="flex items-center gap-2 pr-4">
                  <Button variant={"outline"} onClick={handleCall}>
                    <VideoIcon className="w-4 h-4" />
                    Video Call
                  </Button>
                  <Button
                    variant={"outline"}
                    onClick={handleLeaveChat}
                    className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                  >
                    <LogOutIcon className="w-4 h-4" />
                    Leave Chat
                  </Button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto min-h-0">
                <MessageList />
              </div>

              <div className="shrink-0">
                <MessageInput />
              </div>
            </div>
          </Window>
          <Thread />
        </Channel>
      ) : (
        <>
          <div className="flex flex-col items-center justify-center h-full">
            <h2 className="text-2xl font-semibold text-muted-foreground mb-4">
              No chat selected
            </h2>
            <p className="text-muted-foreground">
              Select a chat from the sidebar or start a new conversation
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatTemplate;
