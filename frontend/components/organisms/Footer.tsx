import Link from "next/link";
import Icon from "../atoms/Icon";

export default function Footer() {
  return (
    <div className="flex justify-between gap-10 flex-wrap page-padding">
      <div className="flex flex-wrap gap-[55px]">
        <p className="font-normal text-lg text-[#8A8A8B]">
          @ {new Date().getFullYear()} Pesatone
        </p>
        <Link href={"/"} className="font-normal text-lg text-[#8A8A8B]">
          Terms of Use
        </Link>
        <Link href={"/"} className="font-normal text-lg text-[#8A8A8B]">
          Privacy Policy
        </Link>
      </div>
      <div className="flex  gap-6 items-center">
        <a href="" target="_blank">
          <Icon name="linkedin" />
        </a>
        <a href="" target="_blank">
          <Icon name="instagram" />
        </a>
        <a href="" target="_blank">
          <Icon name="facebook" />
        </a>
      </div>
    </div>
  );
}
