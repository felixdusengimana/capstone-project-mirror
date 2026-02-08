"use client";
import Button from "@/components/atoms/Button";
import Headline from "@/components/atoms/Headline";
import Input from "@/components/atoms/Input";
import ThirdPartyLogin from "@/components/molecules/ThirdPartyLogin";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function Login() {
  const router = useRouter();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        router.push("/join?step=2");
      }}
      className="flex flex-col text-gray-700 justify-between h-full"
    >
      <p className="text-right font-light text-lg text-gray-500">
        Don&apos;t have an account,{" "}
        <Link href={"/sign-up"} className="font-medium underline">
          Sign up
        </Link>
      </p>
      <div className="max-w-[562px]">
        <Headline className="text-gray-700 text-4xl mb-10">
          Login into your account{" "}
        </Headline>
        <ThirdPartyLogin thirdParty="google" />
        <div className="my-6 flex gap-5 justify-center items-center">
          <div className="bg-gray-400 h-[1px] w-[105.5px]" />
          <p className="text-gray-400 leading-6">OR</p>
          <div className="bg-gray-400 h-[1px] w-[105.5px]" />
        </div>
        <Input label="Email" className="mb-4" />
        <Input label="Password" type="password" />
        <Link href={"/forgot-password"} className="text-right block">
          Forgot password?
        </Link>
        <Button className="w-full mt-10">Login</Button>
      </div>
      <div></div>
    </form>
  );
}
