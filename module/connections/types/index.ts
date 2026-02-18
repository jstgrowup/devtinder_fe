import { IUser } from "@/module/auth/types";
import { REQUEST_STATUS } from "@/module/feed/types";

export interface IConnections {
  _id: string;
  createdAt: string;
  status: REQUEST_STATUS;
  toUserId: IUser;
  fromUserId: IUser;
}
