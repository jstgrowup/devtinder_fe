import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface ActionUserCardProps {
  name: string;
  about: string;
  photoUrl?: string;
  onAccept: () => void;
  onReject: () => void;
}

export function ActionUserCard({
  name,
  about,
  photoUrl,
  onAccept,
  onReject,
}: ActionUserCardProps) {
  return (
    <Card className="bg-zinc-900 text-white border-zinc-800 shadow-lg">
      <CardContent className="flex items-center justify-between p-5">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <Avatar className="h-14 w-14">
            <AvatarImage src={photoUrl} />
            <AvatarFallback className="bg-zinc-800 text-white">
              {name?.[0]}
            </AvatarFallback>
          </Avatar>

          <div>
            <h3 className="font-semibold text-lg">{name}</h3>
            <p className="text-sm text-zinc-400">{about}</p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={onReject}
            className="border-zinc-700 text-white hover:bg-zinc-800"
          >
            Reject
          </Button>

          <Button
            onClick={onAccept}
            className="bg-linear-to-r from-purple-500 to-pink-500 text-white hover:opacity-90"
          >
            Accept
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
