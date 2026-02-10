import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Body = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="grow bg-base-200">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Body;
