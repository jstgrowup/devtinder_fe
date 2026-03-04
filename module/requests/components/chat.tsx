"use client";
import { StreamChat } from "stream-chat";
import {
  Chat,
  Channel,
  Window,
  MessageList,
  MessageInput,
  LoadingIndicator,
} from "stream-chat-react";
import {
  StreamVideo,
  StreamVideoClient,
  StreamCall,
  RingingCall,
  MemberRequest,
} from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";
import "stream-chat-react/dist/css/v2/index.css";
import { useAuth } from "@/store/authStore";
import { openErrorToast } from "@/components/common/toast";
const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY!;
const ChatAndVc = ({
  token,
  roomID,
  toUserId,
  userName,
}: {
  token: string;
  roomID: string;
  toUserId: string;
  userName: string;
}) => {
  const { user } = useAuth((state) => state);
  const myUserId = user?._id ?? "";
  const [chatClient, setChatClient] = useState<StreamChat | null>(null);
  const [videoClient, setVideoClient] = useState<StreamVideoClient | null>(
    null,
  );
  const [channel, setChannel] = useState<any>(null);

  useEffect(() => {
    // 1. Strict Guard: Stop if any critical ID or token is missing
    if (!token || !toUserId || !myUserId) {
      console.log("Waiting for credentials...", {
        token: !!token,
        userID: toUserId,
        myUserId,
      });
      return;
    }

    // Create a flag to prevent setup on an unmounted component
    let isMounted = true;

    const setup = async () => {
      try {
        console.log(
          "Starting Stream Setup with token:",
          token.substring(0, 10) + "...",
        );

        const cClient = StreamChat.getInstance(apiKey);
        const vClient = new StreamVideoClient({
          apiKey,
          user: { id: toUserId, name: userName },
          token,
        });

        // 2. Await connection BEFORE trying to do anything else
        await cClient.connectUser({ id: toUserId, name: userName }, token);

        if (!isMounted) return;

        // 3. Create the channel only AFTER successful login
        const newChannel = cClient.channel("messaging", roomID, {
          members: [toUserId, myUserId],
        });

        await newChannel.watch();

        if (isMounted) {
          setChatClient(cClient);
          setVideoClient(vClient);
          setChannel(newChannel);
          console.log("Stream Setup Complete");
        }
      } catch (error) {
        console.error("Stream setup failed:", error);
        openErrorToast({
          message: "Chat connection failed. Please try again.",
        });
      }
    };

    setup();

    return () => {
      isMounted = false;
      // disconnect calls are async, but we can fire and forget here
      setChatClient(null);
      setVideoClient(null);
    };
  }, [toUserId, token, myUserId]);
  console.log("myUserId:", myUserId);
  console.log("userID:", toUserId);

  if (!chatClient || !videoClient || !channel) return <LoadingIndicator />;
  return (
    <StreamVideo client={videoClient}>
      <Chat client={chatClient}>
        <Channel channel={channel}>
          <Window>
            {/* Custom Header with Video Call Button */}
            <div className="flex justify-between items-center p-3 border-b bg-white">
              <span className="font-bold text-gray-800">{userName}</span>
              <VideoCallButton
                videoClient={videoClient}
                matchUserID={myUserId}
              />
            </div>
            <div className="h-112.5">
              <MessageList />
            </div>
            <MessageInput />
          </Window>
        </Channel>
      </Chat>

      <RingingCall />
    </StreamVideo>
  );
};
const VideoCallButton = ({ videoClient, matchUserID }: any) => {
  const startCall = async () => {
    const call = videoClient.call("default", crypto.randomUUID());
    await call.getOrCreate({
      ring: true,
      data: {
        members: [{ user_id: matchUserID }] as MemberRequest[],
      },
    });
  };

  return (
    <button
      onClick={startCall}
      className="bg-pink-500 hover:bg-pink-600 text-white p-2 rounded-full transition-colors"
      title="Start Video Call"
    >
      📹
    </button>
  );
};
export default ChatAndVc;
