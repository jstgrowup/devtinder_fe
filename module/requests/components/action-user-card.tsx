"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { REQUEST_STATUS } from "@/module/feed/types";
import { Lock, MessageCircle } from "lucide-react";
import { useState } from "react";
import { CommonTooltip } from "@/components/common/Tooltip";
import SubscriptionModal from "./subscription";
import {
  useCreateOrder,
  useCreateGetStreamRoomId,
  useCreateGetStreamToken,
} from "../hooks/useRequests";
import { IPaymentReq } from "../types";
import { useAuth } from "@/store/authStore";
import { useChatRoomStore } from "@/store/chat-room-store";
import { useRouter } from "next/navigation";
import { routes } from "@/config/routes";
import streamClient from "@/module/chat/utils/stream";
import { openErrorToast } from "@/components/common/Toast";

interface ActionUserCardProps {
  toUserId: string;
  name: string;
  about: string;
  connectionRequestId: string;
  photoUrl: string;
  age: number;
  gender: string;
  handleReviewRequest?: ({
    status,
    requestId,
  }: {
    status: REQUEST_STATUS;
    requestId: string;
  }) => void;
  actionsAllowed?: boolean;
}

export function ActionUserCard({
  toUserId,
  connectionRequestId,
  age,
  gender,
  name,
  about,
  photoUrl,
  handleReviewRequest,
  actionsAllowed = true,
}: ActionUserCardProps) {
  const { user } = useAuth((state) => state);
  const router = useRouter();
  const { setToken, setRoomId, setUserName, setToUserId, resetChatRoom } =
    useChatRoomStore((state) => state);
  const [openEditModal, setOpenEditModal] = useState(false);
  const { mutate: createOrder } = useCreateOrder();
  const { mutate: createGetStreamRoom } = useCreateGetStreamRoomId();
  const { mutate: createGetStreamToken } = useCreateGetStreamToken();

  const handleCreateOrder = (body: IPaymentReq) => {
    createOrder(body, {
      onSuccess: (response) => {
        const razorpay = new (window as any).Razorpay({
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: response?.amount,
          currency: "INR",
          name: "Dev Tinder",
          description: "For Dev Community",
          order_id: response?.orderId,
          prefill: {
            name: response?.name,
            email: response?.email,
          },
          theme: {
            color: "#F37254",
          },
        });
        razorpay.open();
      },
    });
  };
  const connectGetStreamUser = async (token: string) => {
    if (streamClient.userID) {
      await streamClient.disconnectUser();
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    try {
      await streamClient.connectUser(
        {
          id: user?._id ?? "",
          name: user?.firstName,
          image: user?.photoUrl,
        },
        token,
      );
    } catch (error) {
      openErrorToast({ message: `Failed to connect user ${error}` });
    }
  };
  const handleChatRedirect = async (toUserId: string) => {
    resetChatRoom();
    createGetStreamToken(
      { toUserId },
      {
        onSuccess: async (response) => {
          setToken(response ?? "");
          await connectGetStreamUser(response ?? "");
          const roomId = [user?._id, toUserId].sort().join("_");
          let channel = streamClient.channel("messaging", roomId);
          try {
            await channel.watch();

            const members = Object.keys(channel.state.members);

            if (members.length === 0) {
              await channel.addMembers([user?._id ?? "", toUserId]);
              await channel.watch();
            }
          } catch (error) {
            channel = streamClient.channel("messaging", roomId, {
              members: [user?._id ?? "", toUserId],
              created_by_id: user?._id,
            });

            await channel.create();
            await channel.watch();
          }

          setRoomId(roomId ?? "");
          setToUserId(toUserId);
          setUserName(name);
          router.push(routes.chat);
        },
      },
    );
  };

  return (
    <>
      <SubscriptionModal
        onCreateOrder={(updatedData) => {
          handleCreateOrder(updatedData);
        }}
        open={openEditModal}
        setOpen={setOpenEditModal}
      />

      <Card className="text-black shadow-lg">
        <CardContent className="flex items-center justify-between p-5">
          <div className="flex items-center gap-4">
            <Avatar className="h-14 w-14">
              <AvatarImage src={photoUrl} />
              <AvatarFallback className="bg-zinc-800 text-white">
                {name?.[0]}
              </AvatarFallback>
            </Avatar>

            <div>
              <h3 className="font-semibold text-lg">{name}</h3>
              <p className="text-sm text-zinc-400">{`${age} ${gender}`}</p>

              <p className="text-sm text-zinc-400">{about}</p>
            </div>
          </div>
          {!actionsAllowed &&
            (user?.isPremiumUser ? (
              <Button
                variant="default"
                size="lg"
                className="flex items-center gap-2 rounded-full px-5 font-medium transition-colors active:scale-95 cursor-pointer"
                onClick={() => handleChatRedirect(toUserId)}
              >
                <MessageCircle className="h-4 w-4 " />
                <span className="leading-none">Message</span>
              </Button>
            ) : (
              <CommonTooltip
                content="Subscribe to unlock this feature"
                side="left"
              >
                <Button
                  variant="default"
                  size="lg"
                  className="flex items-center gap-2 rounded-full px-5 font-medium opacity-80 cursor-pointer"
                  onClick={() => setOpenEditModal(true)}
                >
                  <Lock className="h-4 w-4 " />
                  <span className="leading-none">Message</span>
                </Button>
              </CommonTooltip>
            ))}
          {actionsAllowed && (
            <div className="flex gap-3">
              <Button
                onClick={() =>
                  handleReviewRequest?.({
                    status: REQUEST_STATUS.REJECTED,
                    requestId: connectionRequestId,
                  })
                }
                variant={"secondary"}
                className=" cursor-pointer"
              >
                Reject
              </Button>

              <Button
                onClick={() =>
                  handleReviewRequest?.({
                    status: REQUEST_STATUS.ACCEPTED,
                    requestId: connectionRequestId,
                  })
                }
                className="cursor-pointer"
              >
                Accept
              </Button>
            </div>
          )}{" "}
        </CardContent>
      </Card>
    </>
  );
}
