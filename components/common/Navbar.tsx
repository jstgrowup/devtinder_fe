"use client";
import { useAuth } from "@/store/authStore";
import CommonLoader from "./Loader";
import Link from "next/link";
import { routes } from "@/config/routes";
import { useLogout } from "@/module/auth/hooks/useAuth";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { user, userIsLoading, storeLogout } = useAuth((state) => state);
  const router = useRouter();
  const { mutate: logout } = useLogout();
  const handleLogout = () => {
    logout();
    router.push(routes.login);
    storeLogout();
  };
  return (
    <>
      <div className="navbar bg-base-100 shadow-lg">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul className="menu menu-sm dropdown-content mt-3 z-1 p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                <a>Home</a>
              </li>
              <li>
                <a>About</a>
              </li>
              <li>
                <a>Services</a>
              </li>
              <li>
                <a>Contact</a>
              </li>
            </ul>
          </div>
          <Link href={routes.feed} className="btn btn-ghost text-xl">
            Devtinder
          </Link>
        </div>

        <div className="navbar-end">
          <div className="dropdown dropdown-end">
            {userIsLoading ? (
              <CommonLoader />
            ) : !userIsLoading && user ? (
              <div
                tabIndex={0}
                role="button"
                className="flex items-center gap-4 cursor-pointer px-3 py-2 "
              >
                <span className="hidden md:inline-block font-medium">
                  Welcome, {user?.firstName}
                </span>
                <div className="avatar">
                  <div className="w-10 rounded-full ring-2 ring-primary ring-offset-2">
                    <img src={user?.photoUrl} alt="User profile" />
                  </div>
                </div>
              </div>
            ) : null}

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3  p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link href={routes.profile}>Profile</Link>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li className="border-t border-base-300 mt-2 pt-2">
                <div onClick={handleLogout} className="text-error">
                  Logout
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
