import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  type?: "light" | "dark";
  logoType?: "full" | "icon";
  disabled?: boolean;
}

export default function Logo({ type = "light", disabled }: LogoProps) {
  if (disabled) {
    return (
      <div className="flex items-center gap-2">
        <LogoImage type={type} logoType="full" />
      </div>
    );
  }
  return (
    <Link href={"/"} className="flex items-center gap-2">
        <LogoImage type={type} logoType="full" />
    </Link>
  );
}

function LogoImage({ type, logoType }: { type: "light" | "dark", logoType: "full" | "icon" }) {
  return (
    <Image
      src={type === "light" ? "/logo.svg" : "/logo-black.svg"}
      alt="PESATONElogo"
      width={152}
      height={40}
    />
  );
}
