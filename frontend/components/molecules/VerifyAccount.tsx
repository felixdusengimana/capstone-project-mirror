"use client";
import Dialog, { DialogRoot, DialogTrigger } from "./Dialog";
import Button from "../atoms/Button";
import Icon from "../atoms/Icon";
import Input from "../atoms/Input";
import Headline from "../atoms/Headline";
import CardIcon from "./CardIcon";

export default function VerifyAccount({
  trigger,
}: {
  trigger?: React.ReactNode;
}) {
  return (
    <DialogRoot>
      <DialogTrigger>
        <div className="w-full">
          {trigger ?? (
            <button className="text-sm bg-gray-900 rounded-full font-normal py-[11px] w-[204px]">
              Get verified
            </button>
          )}
        </div>
      </DialogTrigger>
      <Dialog
        className="p-10"
        style={{
          background: "#F0F2F7",
        }}
      >
        <div className="w-full py-6 pb-16 bg-white rounded-lg border-gray-200">
          <div className="px-8 pb-6 mb-6">
            <Headline className="text-4xl font-sans font-bold text-[#1A1A1A]">
              Tips to help you
            </Headline>
          </div>

          <form action="" className="px-8 flex flex-col gap-4">
            <div className="flex gap-4">
              <CardIcon
                icon="camera-center-focus"
                className="bg-[#F9FAFB] border border-gray-200 max-w-[40px] min-w-[40px] h-[40px]"
              />
              <p
                className="text-[#475569] max-w-[258px] font-normal text-sm leading-6"
                style={{
                  fontSize: "14px",
                }}
              >
                Position your face in the center of your screen
              </p>
            </div>

            <div className="flex gap-4">
              <CardIcon
                icon="sun"
                className="bg-[#F9FAFB] border border-gray-200 max-w-[40px] min-w-[40px] h-[40px]"
              />
              <p
                className="text-[#475569] max-w-[258px] font-normal text-sm leading-6"
                style={{
                  fontSize: "14px",
                }}
              >
                Make sure you are in a good lighting environment
              </p>
            </div>
            <div className="flex gap-4">
              <CardIcon
                icon="glasses"
                className="bg-[#F9FAFB] border border-gray-200 max-w-[40px] min-w-[40px] h-[40px]"
              />
              <p
                className="text-[#475569] max-w-[361px] font-normal text-sm leading-6"
                style={{
                  fontSize: "14px",
                }}
              >
                Avoid wearing masks, hat or any other thing that might cover
                your face
              </p>
            </div>
          </form>
        </div>
        <div className="flex flex-col gap-4">
          <Button className="w-full mt-8">Verify account</Button>
          <Button
            className="w-full bg-gray-200 text-[#4B5563]"
            style={{
              color: "#4B5563",
            }}
          >
            Cancel
          </Button>
        </div>
      </Dialog>
    </DialogRoot>
  );
}
