"use client";
import Button from "@/components/atoms/Button";
import Headline from "@/components/atoms/Headline";
import Input from "@/components/atoms/Input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function Login() {
  const router = useRouter();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        router.push("/login");
      }}
      className="flex flex-col text-gray-700 justify-between h-full"
    >
      <div></div>
      <div className="max-w-[562px]">
        <Headline className="text-gray-700 text-4xl mb-4">
          Reset password
        </Headline>
        <p className="text-gray-600 font-normal text-lg">
          This password should be different from the previous password
        </p>
        <Input
          label="Password"
          className="mb-4 mt-10"
          type="password"
          placeholder="● ● ● ● ● ● ●"
        />
        <Input
          label="Retype password"
          type="password"
          placeholder="● ● ● ● ● ● ●"
        />
        <Button className="w-full mt-10">Reset password</Button>
      </div>
      <div></div>
    </form>
  );
}
