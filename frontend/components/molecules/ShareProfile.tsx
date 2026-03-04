"use client";
import Dialog, { DialogRoot, DialogTrigger } from "./Dialog";
import Button from "../atoms/Button";
import Icon, { IconNames } from "../atoms/Icon";
import CardIcon from "./CardIcon";
import { useRef, useState } from "react";
import { IUser } from "@/types/user";
import QRCode from "react-qr-code";
import * as htmlToImage from "html-to-image";

export default function ShareProfile({
  trigger,
  profile,
}: {
  trigger?: React.ReactNode;
  profile?: IUser;
}) {
  const [linkCopied, setLinkCopied] = useState(false);
  const url = window.location.href;
  const urlObj = new URL(url);

  const baseUrl = `${urlObj.protocol}//${urlObj.hostname}${
    urlObj.port ? `:${urlObj.port}` : ""
  }`;
  const creatorLink = baseUrl + "/" + profile?.username;

  const qrCodeRef = useRef(null);
  const downloadQRCode = () => {
    if (!qrCodeRef.current) return;
    htmlToImage
      .toPng(qrCodeRef.current)
      .then(function (dataUrl) {
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = `@${profile?.username}-qr-code.png`;
        link.click();
      })
      .catch(function (error) {
        console.error("Error generating QR code:", error);
      });
  };

  return (
    <DialogRoot>
      <DialogTrigger>
        <div>
          {trigger ?? (
            <Button className="flex gap-0.5 px-2 py-0 items-center">
              <p className="font-medium text-xs md:text-sm text-white">
                Share profile
              </p>
            </Button>
          )}
        </div>
      </DialogTrigger>
      <Dialog className="p-10 bg-[#d6d8dd]">
        <div className="w-full py-6 pb-16 bg-white rounded-lg border border-gray-200">
          <div ref={qrCodeRef}>
            <QRCode
              value={creatorLink ?? ""}
              size={208}
              width={208}
              height={208}
              className="mx-auto"
            />
          </div>

          <div className="flex gap-3 items-center w-fit mx-auto mt-10">
            {profile?.socialLinks?.map((link, index) => (
              <CardIcon
                key={index}
                link={link.link}
                icon={(link.platform.toLocaleLowerCase() as IconNames) ?? "alt"}
                className="bg-gray-50 border border-gray-200"
                width={18}
                height={18}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <Button className="w-full mt-8" onClick={downloadQRCode}>
            Download QR code
          </Button>
          <Button
            className="w-full flex items-center gap-2 justify-center transition-all duration-200"
            variant={linkCopied ? "success" : "gray"}
            onClick={() => {
              navigator.clipboard?.writeText(creatorLink ?? "");
              setLinkCopied(true);

              // Reset linkCopied state after 1.5 seconds
              setTimeout(() => {
                setLinkCopied(false);
              }, 1500);
            }}
          >
            <p className="text-base font-medium">
              {linkCopied ? "Copied!" : "Copy link"}
            </p>
            {/* this only displayed if !linkCopied */}

            {/* this only displayed if !linkCopied */}
            {!linkCopied && <Icon name={"copy"} className="w-4 h-4" />}
          </Button>
        </div>
      </Dialog>
    </DialogRoot>
  );
}
