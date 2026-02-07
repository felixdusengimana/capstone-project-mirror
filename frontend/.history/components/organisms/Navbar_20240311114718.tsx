import Image from "next/image";
import Button from "../atoms/Button";

export default function Navbar() {
  return (
    <div className="page-padding">
      <div className="flex  items-center gap-2">
        <Image
          src="/logo-white.png"
          alt="PESATONElogo"
          width={40}
          height={40}
        />
        <p className="text-sm">ESATONE</p>
      </div>
      <div>
        <Button>Sign In</Button>
        <Button>Sign up free</Button>
      </div>
    </div>
  );
}
