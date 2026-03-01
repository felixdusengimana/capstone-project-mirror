import Image from "next/image";
import Link from "next/link";

export default function Logo({ type = "light" }: { type?: "light" | "dark" }) {
  return (
    <Link href={"/"} className="flex items-center gap-2">
      <Image
        src={type === "light" ? "/logo.svg" : "/logo-black.svg"}
        alt="PESATONElogo"
        width={152}
        height={40}
      />
    </Link>
  );
}
