"use client";
import Dialog, { DialogRoot, DialogTrigger } from "./Dialog";
import Button from "../atoms/Button";
import Icon from "../atoms/Icon";
import Image from "next/image";
import CardIcon from "./CardIcon";
import { useState } from "react";

export default function ShareProfile({
  trigger,
}: {
  trigger?: React.ReactNode;
}) {
  const [linkCopied, setLinkCopied] = useState(false);

  return (
    <DialogRoot>
      <DialogTrigger>
        <div>
          {trigger ?? (
            <Button className="flex gap-0.5 items-center">
              <p className="font-medium text-sm text-white">Share profile</p>
            </Button>
          )}
        </div>
      </DialogTrigger>
      <Dialog className="p-10 bg-[#d6d8dd]">
        <div className="w-full py-6 pb-16 bg-white rounded-lg border border-gray-200">
          <Image
            alt=""
            src={"/test-qr.svg"}
            width={208}
            height={208}
            className="mx-auto"
          />

          <div className="flex gap-3 items-center w-fit mx-auto mt-10">
            <CardIcon
              icon="instagram"
              className="bg-gray-50 border border-gray-200"
              width={18}
              height={18}
            />
            <CardIcon
              icon="snapchat"
              className="bg-gray-50 border border-gray-200"
              width={18}
              height={18}
            />
            <CardIcon
              icon="tiktok"
              className="bg-gray-50 border border-gray-200"
              width={18}
              height={18}
            />
            <CardIcon
              icon="x"
              className="bg-gray-50 border border-gray-200"
              fill="#4B5563"
              stroke="#4B5563"
              width={20}
              height={20}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <Button className="w-full mt-8">Download QR code</Button>
          <Button
            className="w-full flex items-center gap-2 justify-center transition-all duration-200"
            variant={linkCopied ? "success" : "gray"}
            onClick={() => {
              navigator.clipboard?.writeText("https://www.google.com");
              setLinkCopied(!linkCopied);
            }}
          >
            <p className="text-base font-medium">
              {linkCopied ? "Copied!" : "Copy link"}
            </p>

            {/* this only displayed if !linkCopied */}
            {!linkCopied && <Icon name={"copy"} className="w-4 h-4" />}
          </Button>
        </div>
      </Dialog>
    </DialogRoot>
  );
}
