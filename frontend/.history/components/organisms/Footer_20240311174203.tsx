import Link from "next/link";

export default function Footer() {
  return (
    <div className="flex justify-between gap-10">
      <div>
        <p className="font-normal text-lg text-gray-600">
          @ {new Date().getFullYear()} Pesatone
        </p>
        <Link href={"/"} className="font-normal text-lg text-gray-600">
          Terms of Use
        </Link>
        <Link href={"/"} className="font-normal text-lg text-gray-600">
          Privacy Policy
        </Link>
      </div>
      <div></div>
    </div>
  );
}
