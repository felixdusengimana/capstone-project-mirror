import { ComponentProps } from "react";
import Icon from "../atoms/Icon";

interface DownloadAppProps extends ComponentProps<"div"> {
  os: "android" | "ios";
}

export default function DownloadApp({ os, ...props }: DownloadAppProps) {
  return (
    <div {...props} className={`flex items-center gap-4 px-10 py-4 `}>
      <Icon name={os == "android" ? "google-play" : "apple-store"} />
      <div>
        <p className="text-[#DBDBDB] font-medium text-[10px]">
          {os == "android" ? "Get it On" : "Download on the"}
        </p>
        <h3 className="text-[#DBDBDB] font-bold text-sm">
          {os == "android" ? "Google Play" : "App Store"}
        </h3>
      </div>
    </div>
  );
}
