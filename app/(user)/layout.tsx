"use client";
import { useProfile } from "@/module/auth/hooks/useAuth";
import { useAuth } from "@/store/authStore";
import { useEffect } from "react";
import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
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
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AuthWrapper>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <div className="grow bg-base-200">{children}</div>
          <Footer />
        </div>
      </AuthWrapper>
    </>
  );
}
