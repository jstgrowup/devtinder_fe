import { IUser } from "@/module/auth/types";
import { REQUEST_STATUS } from "@/module/feed/types";

export interface IConnectionRequests {
  _id: string;
  createdAt: string;
  status: REQUEST_STATUS;
  toUserId: string;
  fromUserId: IUser;
}
