import { ComponentProps } from "react";
import Icon from "../atoms/Icon";

interface DownloadAppProps extends ComponentProps<"div"> {
  os: "android" | "ios";
}

export default function DownloadApp({ os, ...props }: DownloadAppProps) {
  return (
    <div>
      <Icon name={os == "android" ? "google-play" : "apple-store"} />
      <div>
        <p>{os == "android" ? "Get it On" : "Download on the"}</p>
        <h3>{os == "android" ? "Google Play" : "App Store"}</h3>
      </div>
    </div>
  );
}
