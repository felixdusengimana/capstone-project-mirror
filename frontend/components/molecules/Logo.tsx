import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href={"/"} className="flex  items-center gap-2">
      <Image src="/logo-white.png" alt="PESATONElogo" width={40} height={40} />
      <p className="text-sm">ESATONE</p>
    </Link>
  );
}
