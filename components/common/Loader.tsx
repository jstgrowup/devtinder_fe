import { Loader2 } from "lucide-react";

export const CommonLoader = ({
  size = 32,
  fullScreen = false,
}: {
  size?: number;
  fullScreen?: boolean;
}) => {
  return (
    <div
      className={`flex items-center justify-center ${
        fullScreen ? "h-screen w-screen" : "h-full w-full"
      }`}
    >
      <Loader2 size={size} className={`animate-spin`} />
    </div>
  );
};
