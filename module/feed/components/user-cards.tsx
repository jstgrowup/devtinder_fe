"use client";
import React from "react";
import { IUser } from "@/module/auth/types";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { REQUEST_STATUS } from "../types";
import { Loader2 } from "lucide-react";
interface IUserCardProp extends IUser {
  handleAcceptOrReject: ({
    status,
    toUserId,
  }: {
    status: REQUEST_STATUS;
    toUserId: string;
  }) => void;
  actionLoading: REQUEST_STATUS | null;
}

const UserCard: React.FC<IUserCardProp> = ({
  firstName,
  lastName,
  photoUrl,
  about,
  age,
  gender,
  _id,
  handleAcceptOrReject,
  actionLoading,
}) => {
  return (
    <Card className="w-87.5 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300">
      <CardHeader className="flex flex-col items-center space-y-4 pb-4">
        <Avatar className="h-24 w-24">
          <AvatarImage src={photoUrl} />
          <AvatarFallback>
            {firstName}
            {lastName}
          </AvatarFallback>
        </Avatar>

        <div className="text-center">
          <h2 className="text-xl font-semibold">
            {firstName} {lastName}
          </h2>

          <div className="flex justify-center gap-2 mt-2">
            {age && <Badge variant="secondary">{age} yrs</Badge>}
            {gender && <Badge variant="outline">{gender}</Badge>}
          </div>
        </div>
      </CardHeader>

      <CardContent className="text-center text-sm text-muted-foreground px-6">
        {about || "No bio available"}
      </CardContent>

      <CardFooter className="flex gap-3">
        <Button
          variant="secondary"
          className="flex-1 cursor-pointer"
          disabled={actionLoading !== null}
          onClick={() =>
            handleAcceptOrReject({
              status: REQUEST_STATUS.IGNORE,
              toUserId: _id,
            })
          }
        >
          {actionLoading === REQUEST_STATUS.IGNORE && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          Ignore
        </Button>
        <Button
          className="flex-1 cursor-pointer"
          disabled={actionLoading !== null}
          onClick={() =>
            handleAcceptOrReject({
              status: REQUEST_STATUS.INTERESTED,
              toUserId: _id,
            })
          }
        >
          {actionLoading === REQUEST_STATUS.INTERESTED && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          Interested
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UserCard;
