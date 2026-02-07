import Link from "next/link";
import Icon from "../atoms/Icon";

export default function Footer() {
  return (
    <div className="flex justify-between gap-10 page-padding">
      <div className="flex gap-[55px]">
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
      <div>
        <Icon name="linkedin" />
        <Icon name="instagram" />
        <Icon name="facebook" />
      </div>
    </div>
  );
}
