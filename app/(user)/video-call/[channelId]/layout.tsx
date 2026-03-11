"use client";
import { CommonLoader } from "@/components/common/Loader";
import { StatusCard } from "@/components/common/Status-card";
import { openErrorToast } from "@/components/common/Toast";
import { useAuth } from "@/store/authStore";
import { useChatRoomStore } from "@/store/chat-room-store";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import {
  Call,
  CallingState,
  StreamCall,
  StreamTheme,
  StreamVideo,
  StreamVideoClient,
} from "@stream-io/video-react-sdk";
import { AlertTriangle, Video } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
function Layout({ children }: { children: React.ReactNode }) {
  const { channelId } = useParams();
  const { user } = useAuth((state) => state);
  const [call, setCall] = useState<Call | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [client, setclient] = useState<StreamVideoClient | null>(null);
  const { token } = useChatRoomStore((state) => state);
  const streamUser = useMemo(() => {
    if (!user?._id) return null;
    return {
      id: user._id,
      name: user.firstName || "Unknown User",
      image: user.photoUrl,
      type: "authenticated" as const,
    };
  }, [user]);
  useEffect(() => {
    if (!streamUser) {
      setclient(null);
      return;
    }
    console.log("Initializing video client for user:", streamUser.id);
    try {
      const newClient = new StreamVideoClient({
        apiKey: process.env.NEXT_PUBLIC_STREAM_API_KEY as string,
        user: streamUser,
        token: token ?? "",
      });
      setclient(newClient);
      return () => {
        newClient.disconnectUser().catch((error) => console.log(error));
      };
    } catch (error) {
      openErrorToast({ message: "Failed to initiate the video call" });
    }
  }, [streamUser, token]);

  useEffect(() => {
    if (!client || !channelId) return;
    setError(null);
    const streamCall = client.call("default", channelId as string);
    const joinCall = async () => {
      try {
        await streamCall.join({ create: true });
        setCall(streamCall);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Failed to join call",
        );
      }
    };
    joinCall();
    return () => {
      if (streamCall && streamCall.state.callingState === CallingState.JOINED) {
        streamCall.leave().catch((error) => console.log(error));
      }
    };
  }, [channelId, client]);
  if (error) {
    return (
      <StatusCard
        title="Call Error"
        description={error}
        className="min-h-screen bg-red-50"
        action={
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Retry
          </button>
        }
      >
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
          <AlertTriangle className="w-8 h-8 text-red-600" />
        </div>
      </StatusCard>
    );
  }
  if (!client) {
    return (
      <StatusCard
        title="Initializing client..."
        description="Setting up video call connection..."
        className="min-h-screen bg-blue-50"
      >
        <CommonLoader fullScreen={false} />
      </StatusCard>
    );
  }
  if (!call) {
    return (
      <StatusCard title="Joining call..." className="min-h-screen bg-green-50">
        <div className="animate-bounce h-16 w-16 mx-auto">
          <div className="w-16 h-16 bg-green-200 rounded-full flex items-center justify-center">
            <Video className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="text-green-600 font-mono text-sm bg-green-100 px-3 py-1 rounded-full inline-block">
          Call ID: {channelId}
        </div>
      </StatusCard>
    );
  }
  return (
    <StreamVideo client={client}>
      <StreamTheme className="text-white">
        <StreamCall call={call}>{children}</StreamCall>
      </StreamTheme>
    </StreamVideo>
  );
}
export default Layout;
