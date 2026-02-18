import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
type ActionVariant = "gradient" | "outline-dark" | "outline" | "default";

interface CommonActionButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: ActionVariant;
  className?: string;
  fullWidth?: boolean;
  disabled?: boolean;
}
const CommonButton = ({
  children,
  onClick,
  variant = "default",
  className,
  fullWidth,
  disabled,
}: CommonActionButtonProps) => {
  const variantStyles = {
    gradient:
      "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90",
    "outline-dark":
      "border-zinc-700 text-black hover:bg-zinc-800 hover:text-white",
    outline: "",
    default: "",
  };

  return (
    <Button
      variant={
        variant === "outline" || variant === "outline-dark"
          ? "outline"
          : "default"
      }
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "cursor-pointer",
        fullWidth && "flex-1",
        variantStyles[variant],
        className,
      )}
    >
      {children}
    </Button>
  );
};

export default CommonButton;
