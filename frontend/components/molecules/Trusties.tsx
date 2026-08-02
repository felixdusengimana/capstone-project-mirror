import { ComponentProps } from "react";
import { useTranslations } from "next-intl";

interface TrustiesProps extends ComponentProps<"p"> {}

export default function Trusties({ className, ...props }: TrustiesProps) {
  const t = useTranslations("components");

  return (
    <p {...props} className={`text-[#8A8A8B] mt-24 text-base ${className}`}>
      {t("trustedUsers")} <br />
      {t("customerRating")}
    </p>
  );
}
