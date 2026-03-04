import { IUser } from "@/module/auth/types";
import { REQUEST_STATUS } from "@/module/feed/types";
import { SUBSCRIPTION_PLANS } from "@/types";

export interface IConnectionRequests {
  _id: string;
  createdAt: string;
  status: REQUEST_STATUS;
  toUserId: string;
  fromUserId: IUser;
}
export interface IPaymentResponse {
  _id: string;
  orderId: string;
  amount: number;
  plan: SUBSCRIPTION_PLANS;
  name: string;
  email: string;
}
export interface IPaymentReq {
  plan: SUBSCRIPTION_PLANS;
}
export interface IGetStreamRoomIdReq {
  toUserId: string;
}
export interface IGetStreamRoomIdRes {
  roomId: string;
}

export interface IGetStreamCreateTokenRes {
  roomId: string;
}
