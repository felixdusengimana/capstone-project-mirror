import { ComponentProps } from "react";

interface DownloadAppProps extends ComponentProps<"div"> {
  os: "android" | "ios";
}

export default function DownloadApp() {
  return <div>DownloadApp</div>;
}
