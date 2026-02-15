"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

export default function Provider({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex justify-center items-center">
        <div className="grow bg-base-200">{children}</div>
        <Toaster />
      </div>
    </QueryClientProvider>
  );
}
