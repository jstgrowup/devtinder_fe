import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

const Body = () => {
  const queryClient = new QueryClient();
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="grow bg-base-200">
          <QueryClientProvider client={queryClient}>
            <Outlet />
          </QueryClientProvider>
        </div>
        <Footer />
        <Toaster />
      </div>
    </>
  );
};

export default Body;
