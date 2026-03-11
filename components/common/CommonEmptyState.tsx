import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";

interface CommonEmptyStateProps {
  emptyMessage: string;
  description?: string;
}

const EmptyStateComp = ({
  emptyMessage,
  description = "Don’t worry, hang tight — you’ll get one soon.",
}: CommonEmptyStateProps) => {
  return (
    <div className="flex items-center justify-center py-12 px-4">
      <Card className="border-none shadow-none bg-transparent">
        <CardContent className="flex flex-col items-center text-center space-y-4">
          <div className="relative h-30 w-30">
            <Image
              src="/nothing-here.jpg"
              alt="No data available"
              fill
              className="object-contain opacity-70"
            />
          </div>

          <h3 className="text-lg font-semibold text-foreground">
            {emptyMessage}
          </h3>

          <p className="text-sm text-muted-foreground max-w-75">
            {description}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export const CommonEmptyState = React.memo(EmptyStateComp);
