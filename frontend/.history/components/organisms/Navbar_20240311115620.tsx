import Image from "next/image";
import Button from "../atoms/Button";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="page-padding flex justify-between items-center">
      <Link href={"/"} className="flex  items-center gap-2">
        <Image
          src="/logo-white.png"
          alt="PESATONElogo"
          width={40}
          height={40}
        />
        <p className="text-sm">ESATONE</p>
      </Link>
      <div className="flex items-center gap-6">
        <Link href={"/login"}>
          <Button variant="secondary" className="px-12">
            Login
          </Button>
        </Link>
        <Link href={"/join"}>
          <Button variant="white" className="font-semibold">
            Sign up free
          </Button>
        </Link>
      </div>
    </div>
  );
}
