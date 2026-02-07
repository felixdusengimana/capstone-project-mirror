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
      <div className="flex  gap-6 items-center">
        <a href="">
          <Icon name="linkedin" />
        </a>
        <a href="">
          <Icon name="instagram" />
        </a>
        <a href="">
          <Icon name="facebook" />
        </a>
      </div>
    </div>
  );
}
