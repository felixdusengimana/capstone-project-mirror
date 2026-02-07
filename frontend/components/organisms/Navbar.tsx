import Button from "../atoms/Button";
import Link from "next/link";
import Logo from "../molecules/Logo";

export default function Navbar() {
  return (
    <div className="page-padding w-full flex justify-between items-center">
      <Logo />
      <div className="flex items-center gap-6">
        <Link href={"/login"}>
          <Button variant="secondary" className="lg:px-12">
            Login
          </Button>
        </Link>
        <Link href={"/sign-up"}>
          <Button variant="white" className="font-semibold">
            Sign up free
          </Button>
        </Link>
      </div>
    </div>
  );
}
