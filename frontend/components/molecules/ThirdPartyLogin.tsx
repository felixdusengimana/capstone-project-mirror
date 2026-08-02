import { ComponentProps } from "react";
import Icon from "../atoms/Icon";
import { useTranslations } from "next-intl";

interface ThirdPartyLoginProps extends ComponentProps<"div"> {
  thirdParty: "google" | "facebook";
}
export default function ThirdPartyLogin({
  thirdParty,
  ...rest
}: ThirdPartyLoginProps) {
  const t = useTranslations("components");
  return (
    <div
      {...rest}
      className={`border border-[#E5E9F0] bg-[#F7F9FB] rounded-lg flex items-center gap-0.5 py-[13px] justify-center w-full ${rest.className}`}
    >
      <Icon name={thirdParty} />
      <p className="text-gray-600 text-base leading-6">
        {thirdParty === "google" ? t("continueGoogle") : t("continueFacebook")}
      </p>
    </div>
  );
}
