import Link from "next/link";
import Icon from "../atoms/Icon";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("navigation");
  return (
    <div className="flex justify-between gap-10 flex-wrap page-padding">
      <div className="flex flex-wrap gap-[55px]">
        <p className="font-normal text-lg text-[#8A8A8B]">
          @ {new Date().getFullYear()} Pesatone
        </p>
        <Link href={"/terms-of-use"} className="font-normal text-lg text-[#8A8A8B]">
          {t("terms")}
        </Link>
        <Link href={"/privacy-policy"} className="font-normal text-lg text-[#8A8A8B]">
          {t("privacy")}
        </Link>
      </div>
      <div className="flex  gap-6 items-center">
        <a href="" target="_blank">
          <Icon name="linkedin" />
        </a>
        <a href="https://www.instagram.com/pesatone" target="_blank">
          <Icon name="instagram" />
        </a>
        <a href="" target="_blank">
          <Icon name="facebook" />
        </a>
      </div>
    </div>
  );
}
