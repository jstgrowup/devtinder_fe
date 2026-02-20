"use client";
import { useAuth } from "@/store/authStore";
import Link from "next/link";
import { routes } from "@/config/routes";
import { useLogout } from "@/module/auth/hooks/useAuth";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { CommonLoader } from "@/components/common/Loader";

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
      <header className="border-b bg-background shadow-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-6">
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="h-5 w-5" />
            </Button>

            <Link
              href={routes.feed}
              className="text-xl font-bold tracking-tight"
            >
              Devtinder
            </Link>
          </div>

          <div>
            {userIsLoading ? (
              <CommonLoader />
            ) : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center gap-3 cursor-pointer">
                    <span className="hidden md:block font-medium">
                      Welcome, {user.firstName}
                    </span>
                    <Avatar className="h-9 w-9 ring-2 ring-primary/30">
                      <AvatarImage src={user.photoUrl} />
                      <AvatarFallback>{user.firstName?.[0]}</AvatarFallback>
                    </Avatar>
                  </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link href={routes.profile}>Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link href={routes.connections}>Connections</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link href={routes.requests}>Requests</Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-red-500 focus:text-red-500 cursor-pointer"
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : null}
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
