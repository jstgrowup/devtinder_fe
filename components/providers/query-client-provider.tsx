"use client";
import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

export default function Provider({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="grow bg-base-200">
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </div>
      <Footer />
      <Toaster />
    </div>
  );
}
