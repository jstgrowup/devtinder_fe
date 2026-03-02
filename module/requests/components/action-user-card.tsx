"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { REQUEST_STATUS } from "@/module/feed/types";
import { Lock, MessageCircle } from "lucide-react";
import { useState } from "react";
import { CommonTooltip } from "@/components/common/tooltip";
import SubscriptionModal from "./subscription";
import { useCreateOrder } from "../hooks/useRequests";
import { IPaymentReq } from "../types";

interface ActionUserCardProps {
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
  connectionRequestId,
  age,
  gender,
  name,
  about,
  photoUrl,
  handleReviewRequest,
  actionsAllowed = true,
}: ActionUserCardProps) {
  const [locked, setlocked] = useState(true);
  const [openEditModal, setOpenEditModal] = useState(false);
  const { mutate: createOrder, isPending } = useCreateOrder();
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
  return (
    <>
      <SubscriptionModal
        onCreateOrder={(updatedData) => {
          handleCreateOrder(updatedData);
        }}
        open={openEditModal}
        setOpen={setOpenEditModal}
        isLoading={isPending}
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
            (locked ? (
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
            ) : (
              <Button
                variant="default"
                size="lg"
                className="flex items-center gap-2 rounded-full px-5 font-medium transition-colors active:scale-95 cursor-pointer"
                onClick={() => console.log("chat")}
              >
                <MessageCircle className="h-4 w-4 " />
                <span className="leading-none">Message</span>
              </Button>
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
