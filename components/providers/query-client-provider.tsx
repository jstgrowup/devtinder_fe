"use client";
import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import { useProfile } from "@/module/auth/hooks/useAuth";
import { useAuth } from "@/store/authStore";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { data, isLoading } = useProfile();
  const { setUser, setUserLoading } = useAuth((state) => state);

  useEffect(() => {
    if (data?.data) {
      setUser(data.data);
    }
    setUserLoading(isLoading);
  }, [data, isLoading]);

  return <>{children}</>;
}
export default function Provider({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthWrapper>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <div className="grow bg-base-200">{children}</div>
          <Footer />
          <Toaster />
        </div>
      </AuthWrapper>
    </QueryClientProvider>
  );
}
