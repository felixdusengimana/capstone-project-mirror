import Image from "next/image";

export default function Navbar() {
  return (
    <div className="page-padding">
      <div className="flex gap-2">
        <Image
          src="/logo-white.png"
          alt="PESATONElogo"
          width={40}
          height={40}
        />
        <p className="text-sm">ESATONE</p>
      </div>
    </div>
  );
}
