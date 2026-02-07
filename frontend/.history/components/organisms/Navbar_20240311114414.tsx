import Image from "next/image";

export default function Navbar() {
  return (
    <div className="page-padding">
      <div>
        <Image
          src="/logo-white.png"
          alt="PESATONElogo"
          width={40}
          height={40}
        />
        <p>ESATONE</p>
      </div>
    </div>
  );
}
