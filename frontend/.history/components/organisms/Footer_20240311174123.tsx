import Link from "next/link";

export default function Footer() {
  return (
    <div className="flex justify-between gap-10">
      <div>
        <p className="flex  items-center gap-2">
          @ {new Date().getFullYear()} Pesatone
        </p>
        <Link href={"/"} className="flex  items-center gap-2">
          Terms of Use
        </Link>
        <Link href={"/"} className="flex  items-center gap-2">
          Privacy Policy
        </Link>
      </div>
      <div></div>
    </div>
  );
}
