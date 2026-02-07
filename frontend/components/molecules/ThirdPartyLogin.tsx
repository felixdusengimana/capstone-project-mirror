import { ComponentProps } from "react";
import Icon from "../atoms/Icon";

interface ThirdPartyLoginProps extends ComponentProps<"div"> {
  thirdParty: "google" | "facebook";
}
export default function ThirdPartyLogin({
  thirdParty,
  ...rest
}: ThirdPartyLoginProps) {
  return (
    <div
      {...rest}
      className={`border border-[#E5E9F0] bg-[#F7F9FB] rounded-lg flex items-center gap-0.5 py-[13px] justify-center w-full ${rest.className}`}
    >
      <Icon name={thirdParty} />
      <p className="text-gray-600 text-base leading-6">
        Continue with {thirdParty === "google" ? "Google" : "Facebook"}
      </p>
    </div>
  );
}
