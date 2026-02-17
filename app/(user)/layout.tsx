"use client";
import { useAuth } from "@/store/authStore";
import { useEffect } from "react";
import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import { useGetProfile } from "@/module/profile/hooks/useProfile";
function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { data, isLoading } = useGetProfile();

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
