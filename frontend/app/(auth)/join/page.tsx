"use client";
import Avatar from "@/components/atoms/Avatar";
import Button from "@/components/atoms/Button";
import Headline from "@/components/atoms/Headline";
import Icon from "@/components/atoms/Icon";
import Input from "@/components/atoms/Input";
import Progress from "@/components/atoms/Progress";
import TextArea from "@/components/atoms/TextArea";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

export default function Join() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const step = searchParams.get("step");

  if (
    !step ||
    String(parseInt(step)) != step ||
    parseInt(step) <= 1 ||
    parseInt(step) > 4
  ) {
    return router.back();
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (step === "4") {
          return router.replace("/dashboard");
        }
        router.replace(`/join?step=${parseInt(step) + 1}`);
      }}
      className="flex flex-col text-gray-700 justify-between h-full"
    >
      <p className="text-right font-light text-lg text-gray-500">
        Already have an account,{" "}
        <Link href={"/login"} className="font-medium underline">
          Login
        </Link>
      </p>
      {step === "2" ? (
        <div className="w-full">
          <Progress percentage={50} />
          <Headline className="text-[#374151] text-4xl mt-[30px]">
            Fill in your profile
          </Headline>
          <p className="text-[#8A8A8B] mt-2">
            Choose your account type depending on your interest
          </p>
          <div className="flex justify-between gap-10 items-center mt-10">
            <div className="max-w-[307px]">
              <label htmlFor="upload-profile-photo">
                <Avatar src="" size="2xl" />
                <div className="mt-6 text-xlfont-normal rounded-full border border-gray-200 flex gap-1 px-4 py-3">
                  <Icon name="camera" />
                  <p>Upload Profile</p>
                </div>
              </label>

              <input
                type="file"
                accept=".png;.jpg;.jpeg"
                hidden
                id="upload-profile-photo"
              />
            </div>
            <div className="flex flex-col gap-4 flex-grow max-w-[438px]">
              <Input label="Your name" />
              <TextArea label="Bio" />
              <Input label="Industry" />
            </div>
          </div>
        </div>
      ) : step === "3" ? (
        <div className="w-full">
          <Progress percentage={75} />
          <Headline className="text-[#374151] text-4xl mt-[30px]">
            Create your account
          </Headline>
          <p className="text-[#8A8A8B] mt-2">Setup Pesatag for your page</p>
          <Input
            label="PesaTag"
            className="mt-10"
            placeholder="username"
            left={
              <div className="flex items-center gap-0.5">
                <Icon name="alt" />
                <p className="text-[#475569]">Pesatone.com/</p>
              </div>
            }
          />
        </div>
      ) : step === "4" ? (
        <div className="w-full">
          <Progress percentage={100} />
          <Headline className="text-[#374151] text-4xl mt-[30px]">
            Creator links{" "}
          </Headline>
          <p className="text-[#8A8A8B] mt-2">Add your social links</p>
          <Input
            label="Instagram"
            className="mt-10"
            value={"https://www.instagram.com/theBen007/"}
            left={
              <Icon width={20} height={20} name="instagram" className="mr-2" />
            }
          />
          <Button
            className="flex mt-4 items-center gap-2"
            outline={true}
            type="button"
          >
            <Icon name="add" /> <p>Add new link</p>
          </Button>
        </div>
      ) : null}

      <div className="flex items-center flex-wrap justify-between pt-6 border-t border-gray-200">
        <Button
          type="button"
          outline={true}
          onClick={() => {
            if (step === "1") {
              router.back();
            } else {
              router.replace(`/join?step=${parseInt(step) - 1}`);
            }
          }}
        >
          Back
        </Button>
        <Button className="px-[72px]">Next</Button>
      </div>
    </form>
  );
}
