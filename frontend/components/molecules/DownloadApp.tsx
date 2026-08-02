import { ComponentProps } from "react";
import Icon from "../atoms/Icon";
import { useTranslations } from "next-intl";

interface DownloadAppProps extends ComponentProps<"div"> {
  os: "android" | "ios";
  transparent?: boolean;
}

export default function DownloadApp({
  os,
  transparent,
  ...props
}: DownloadAppProps) {
  const t = useTranslations("downloads");
  return (
    <div
      {...props}
      className={`flex items-center gap-4 lg:px-10 px-5 lg:py-4 py-2 border ${
        transparent
          ? "bg-[#20202466] backdrop-blur-md"
          : "border-[#202024] bg-[#202024]"
      } rounded-full cursor-pointer min-w-[202.09px] ${props.className}`}
    >
      <Icon name={os == "android" ? "google-play" : "apple-store"} />
      <div>
        <p className="text-[#DBDBDB] font-medium text-[10px]">
          {os == "android" ? t("getItOn") : t("downloadOn")}
        </p>
        <h3 className="text-[#DBDBDB] font-bold text-sm">
          {os == "android" ? t("googlePlay") : t("appStore")}
        </h3>
      </div>
    </div>
  );
}
