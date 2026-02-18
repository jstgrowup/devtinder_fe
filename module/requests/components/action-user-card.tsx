import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { REQUEST_STATUS } from "@/module/feed/types";

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
  return (
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
  );
}
