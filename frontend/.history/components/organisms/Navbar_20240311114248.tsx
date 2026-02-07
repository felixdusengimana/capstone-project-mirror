import Image from "next/image";

export default function Navbar() {
  return (
    <div className="page-padding">
      <Image src="/logo-white.png" alt="logo" width={100} height={100} />
    </div>
  );
}
