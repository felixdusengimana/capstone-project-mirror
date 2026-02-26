import Button from "../atoms/Button";
import Link from "next/link";
import Logo from "../molecules/Logo";
import { useAuth } from "@/hooks/useAuth";
import { getCookie } from "@/utils/cookie";

export default function Navbar() {
  const { isLoggedIn } = useAuth();
  return (
    <div className="page-padding w-full flex justify-between items-center">
      <Logo />
      <div className="flex items-center gap-6">
        {isLoggedIn ? (
          <Link href={"/resolve"}>
            <Button variant="secondary" className="hidden md:block">
              Dashboard
            </Button>
          </Link>
        ) : (
          <>
            <Link href={"/login"}>
              <Button variant="secondary" className="hidden md:block">
                Login
              </Button>
            </Link>
            <Link href={"/sign-up"}>
              <Button variant="white" className="font-semibold">
                Sign up free
              </Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
