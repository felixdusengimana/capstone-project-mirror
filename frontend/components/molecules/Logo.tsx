import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href={"/"} className="flex  items-center gap-2">
      <Image src="/logo.svg" alt="PESATONElogo" width={152} height={40} />
    </Link>
  );
}
