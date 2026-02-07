import { ComponentProps } from "react";
import Icon from "../atoms/Icon";

interface DownloadAppProps extends ComponentProps<"div"> {
  os: "android" | "ios";
}

export default function DownloadApp({ os, ...props }: DownloadAppProps) {
  return (
    <div>
      <Icon name={os == "android" ? "google-play" : "apple-store"} />
    </div>
  );
}
