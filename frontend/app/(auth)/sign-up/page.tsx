"use client";
import Button from "@/components/atoms/Button";

import Input from "@/components/atoms/Input";
import ThirdPartyLogin from "@/components/molecules/ThirdPartyLogin";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        router.push("/join?step=2");
      }}
      className="flex flex-col text-gray-700 justify-between h-full p-8 lg:p-0"
    >
      <p className="text-right font-light text-lg text-gray-500">
        Already have an account,{" "}
        <Link href={"/login"} className="font-medium underline">
          Login
        </Link>
      </p>
      <div className="max-w-[562px]">
        <h1 className="text-gray-700 text-4xl font-mono mb-10">
          Fund your creative work
        </h1>
        <ThirdPartyLogin thirdParty="google" />
        <div className="my-6 flex gap-5 justify-center items-center">
          <div className="bg-gray-400 h-[1px] w-[105.5px]" />
          <p className="text-gray-400 leading-6">OR</p>
          <div className="bg-gray-400 h-[1px] w-[105.5px]" />
        </div>
        <Input
          label="Email"
          className="mb-4"
          placeholder="Eg: fullname@email.com"
        />
        <Input label="Password" type="password" placeholder="● ● ● ● ● ● ●" />
      </div>

      <div className="flex items-center flex-wrap justify-between pt-6 border-t border-gray-200">
        <Button
          type="button"
          outline={true}
          onClick={() => {
            router.back();
          }}
        >
          Back
        </Button>
        <Button className="px-[72px]">Sign up</Button>
      </div>
    </form>
  );
}
