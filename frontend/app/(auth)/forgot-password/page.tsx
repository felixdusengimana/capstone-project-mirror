"use client";
import Button from "@/components/atoms/Button";
import Headline from "@/components/atoms/Headline";
import Input from "@/components/atoms/Input";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  const router = useRouter();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        router.push("/reset");
      }}
      className="flex flex-col text-gray-700 justify-between h-full "
    >
      <div className="max-w-[562px] h-fit my-auto">
        <Headline className="text-gray-700 text-4xl mb-2">
          Reset password
        </Headline>
        <p className="text-gray-600 font-normal text-lg">
          Enter the email address with your account and we’ll send an email with
          instruction to reset your password
        </p>
        <Input
          label="Email"
          className="mb-4 mt-10"
          placeholder="Eg: fullname@email.com"
        />
        <Button className="w-full">Get instructions</Button>
      </div>
    </form>
  );
}
