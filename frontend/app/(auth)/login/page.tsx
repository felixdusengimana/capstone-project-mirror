"use client";
import Button from "@/components/atoms/Button";

import Input from "@/components/atoms/Input";
import ThirdPartyLogin from "@/components/molecules/ThirdPartyLogin";
import { Login } from "@/services/auth";
import { IRegisterInputs, registerSchema } from "@/types/auth";
import { setCookie } from "@/utils/cookie";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    onSuccess(data) {
      toast.success("Logged in successful!", { id: "login" });
      const token = data?.data?.token;
      const expiresIn = data.data?.expiresIn;
      if (!token || !expiresIn) {
        return toast.error("Login failed!", { id: "login" });
      }
      setCookie("token", token, expiresIn);
      router.push("/resolve");
    },
    onError(error) {
      toast.error(`${error.message ?? "Login failed!"}`, {
        id: "login",
      });
    },
    mutationFn: Login,
  });

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IRegisterInputs>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: IRegisterInputs) => {
    toast.loading("Login...", { id: "login" });
    mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col text-gray-700 justify-between h-full p-8 lg:p-0"
    >
      <p className="text-right font-light text-lg text-gray-500">
        Don&apos;t have an account,{" "}
        <Link href={"/sign-up"} className="font-medium underline">
          Sign up
        </Link>
      </p>
      <div className="max-w-[562px]">
        <h1 className="text-gray-700 text-4xl font-mono mb-10">
          Login into your account{" "}
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
          onChange={(e) =>
            setValue("email", e.target.value, { shouldValidate: true })
          }
          error={errors.email?.message}
        />
        <Input
          label="Password"
          type="password"
          onChange={(e) =>
            setValue("password", e.target.value, { shouldValidate: true })
          }
          error={errors.password?.message}
        />
        <Link href={"/forgot-password"} className="text-right block">
          Forgot password?
        </Link>
        <Button className="w-full mt-10" isLoading={isPending}>
          {isPending ? "Login..." : "Login"}
        </Button>
      </div>
      <div></div>
    </form>
  );
}
